import axios from "axios";
// 封装Axios请求器
class MyRequest {
  instance;
  constructor(config) {
    this.instance = axios.create(config);

    // 请求成功
    this.instance.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = 'xxxTokenxxx'
        return config;
      },
      (err) => {
        return err;
      }
    );

    // 响应成功
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        return err;
      }
    );

    // 针对特殊的request做的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );

    this.instance?.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  // 请求
  request(config) {
    // 
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }

    return new Promise((resolve, rej) => {
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.requestSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          // config.interceptors.responseSuccessFn();

          resolve(res);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: "GET" });
  }

  post(config) {
    return this.request({ ...config, method: "POST" });
  }

  put(config) {
    return this.request({ ...config, method: "PUT" });
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }

  patch(config) {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default MyRequest;
