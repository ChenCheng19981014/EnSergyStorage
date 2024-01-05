// 鼠标 hover上去 
 const HoverPopupPlugin = {
    install(Vue) {
        // 在 Vue 的原型上添加一个全局方法 $hoverPopup
        Vue.prototype.$hoverPopup = function (dataArray) {
            // 创建一个全局的弹窗组件实例
            const popupComponent = new Vue({
                data() {
                    return {
                        popupDataArray: dataArray,
                        isVisible: false
                    }
                },
                directives: {
                    hoverPopup: {
                        bind(el, binding) {
                            el.addEventListener('mouseover', () => {
                                el.style.display = 'block';
                                el.innerHTML = binding.value;
                            });
                            el.addEventListener('mouseout', () => {
                                el.style.display = 'none';
                            });
                        }
                    }
                },
                template: `
            <div class="hover-popup" v-hover-popup>
              <p v-for="data in popupDataArray">{{ data }}</p>
            </div>
          `,
                mounted() {
                    // 在弹窗组件挂载后，将其添加到 body 元素中
                    document.body.appendChild(this.$el);
                }
            });

            // 监听鼠标移入事件，显示弹窗
            this.$el.addEventListener('mouseover', () => {
                popupComponent.isVisible = true;
            });

            // 监听鼠标移出事件，隐藏弹窗
            this.$el.addEventListener('mouseout', () => {
                popupComponent.isVisible = false;
            });
        }
    }
};

export default HoverPopupPlugin
