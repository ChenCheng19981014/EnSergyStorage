
import { myReq } from "../lib/axios";

// 注册
export const register = (params) => {
    return myReq.post({
        url: `route2`,
        data: params,
    });
}

// 上传图片 使用formDate表单 也可以 用base64的方法
export const uploadImage = (params) => {
    return myReq.request({
        url: "/user/uploadHeaderImage",
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        data: params,
    });
};

