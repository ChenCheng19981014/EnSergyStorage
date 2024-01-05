// 获取assets静态资源
const getAssetsFile = (url) => {
    return new URL(`./../../../public/assets/img/${url}.jpg`, import.meta.url)
        .href;
};