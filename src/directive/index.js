export const HoverPopup = {

    beforeMount(el, binding) {

        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.padding = '10px';
        popup.style.backgroundColor = 'white';
        popup.style.border = '1px solid black';
        popup.style.display = 'none';
        popup.innerText = binding.value;

        console.log('popup', popup);

        // 鼠标悬停时显示弹窗
        el.addEventListener('mouseenter', () => {
            popup.style.display = 'block';
            el.innerText = binding.value.name;
            console.log('进');
        });

        // 鼠标离开时隐藏弹窗
        el.addEventListener('mouseleave', () => {
            popup.style.display = 'none';
            el.innerText = '';
            console.log('出');
        });


        // 将弹窗元素添加到页面中
        document.body.appendChild(popup);
    },

};

