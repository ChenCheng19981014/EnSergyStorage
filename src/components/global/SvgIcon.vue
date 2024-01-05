<template lang="">
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const svgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className;
      } else {
        return "svg-icon";
      }
    });
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`;
    });
    return {
      svgClass,
      iconName,
    };
  },
});
</script>
<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  > use{
    width: 100%;
    height: 100%;
  }
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
