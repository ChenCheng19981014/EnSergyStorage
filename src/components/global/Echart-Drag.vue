<template>
  <div class="chart-drag" ref="chart_base"></div>
</template>
<script>
import * as ec from "echarts";
import "echarts-liquidfill";
export default {
  echarts: ec,
  data() {
    return {
      instance: null,
    };
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.refreshChart();
      },
    },

    tooltipCurrentIndex(v, oldV) {
      if (this.instance) {
        const total =
          this.options.series[0] &&
          this.options.series[0].data &&
          this.options.series[0].data.length;
        if (this.zoomLength < total && total > 1) {
          const step = 100 / total;
          const start = v + 1 - this.zoomLength;
          this.instance.dispatchAction({
            type: "dataZoom",
            start: step * (start < 0 ? 0 : start),
            end: step * (v < this.zoomLength ? this.zoomLength : v + 1),
          });
        }
        this.zoomTimer = setTimeout(() => {
          this.instance.dispatchAction({
            type: "downplay",
            seriesIndex: this.tooltipType.type === "series" ? oldV : 0,
            dataIndex: this.tooltipType.type === "data" ? oldV : 0,
          });
          this.instance.dispatchAction({
            type: "highlight",
            seriesIndex: this.tooltipType.type === "series" ? v : 0,
            dataIndex: this.tooltipType.type === "data" ? v : 0,
          });
          this.instance.dispatchAction({
            type: "showTip",
            seriesIndex: this.tooltipType.type === "series" ? v : 0,
            dataIndex: this.tooltipType.type === "data" ? v : 0,
          });
          clearTimeout(this.zoomTimer);
          this.zoomTimer = null;
        }, 500);
      }
    },

    active(v) {
      if (v) {
        this.resizeChart();
      }
    },

    loading(v) {
      if (v) {
        this.instance && this.instance.showLoading(this.loadingStyle);
      } else {
        this.instance && this.instance.hideLoading();
      }
    },
  },

  props: {
    loading: Boolean,
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  methods: {
    initChart() {
      const _this = this;
      window.addEventListener("resize", _this.resizeChart);
      if (this.$refs.chart_base) {
        this.instance = ec.init(
          this.$refs.chart_base,
          {
            theme: "macarons",
            ...(this.options || {}),
          },
          { devicePixelRatio: this.devicePixelRatio }
        );
      }
    },

    // 重置ecahrts
    resizeChart() {
      if (!this.active) return;
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.instance) {
            this.instance.resize();
          }
        }, 2000);
      });
    },

    // 刷新ecahrts
    refreshChart() {
      if (this.isWaiting) return;
      if (this.instance) this.instance.setOption(this.options);
    },

    // 改变提示框
    changeTooltip() {
      this.$nextTick(() => {
        if (this.instance) {
          let dataLen =
            this.tooltipType.type === "data"
              ? this.options.series[0] &&
              this.options.series[0].data &&
              this.options.series[0].data.length
              : this.options.series.length;
          if (!dataLen) {
            dataLen = 1;
          }
          this.tooltipCurrentIndex = (this.tooltipCurrentIndex + 1) % dataLen;
        }
      });
    },

    // 自动改变提示框
    autoTooltip() {
      if (this.tooltipType.type) {
        this.$eventBus.$on(
          this.tooltipType.eventName || "chart-tooltip",
          this.changeTooltip
        );
      }
    },
  },

  mounted() {
    // 初始化
    this.initChart();

    this.isWaiting = true;

    setTimeout(() => {

      this.isWaiting = false;

      this.refreshChart();

    }, this.delay);

    this.autoTooltip();
  },

  beforeDestroy() {
    const _this = this;
    if (this.tooltipTimer) {
      this.$eventBus.$off(this.tooltipType.eventName, this.changeTooltip);
      this.tooltipTimer = false;
    }
    if (this.zoomTimer) {
      clearTimeout(this.zoomTimer);
      this.zoomTimer = null;
    }

    window.removeEventListener("resize", _this.resizeChart);
    this.instance && this.instance.clear();
    this.instance && this.instance.dispose();
    this.instance = null;
  },

};
</script>

<style scoped>
.chart-drag {
  width: 100%;
  height: 100%;
}
</style>
