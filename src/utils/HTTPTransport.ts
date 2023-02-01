// eslint-disable-next-line no-shadow
enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface Options {
    headers?: Record<string, string>
    data?: string,
    method?: METHODS,
    timeout?: number,
}

type Url = string;
type Data = Record<string, string> | string;
type Method = (url: Url, options?: Options) => Promise<any>

function queryStringify(data: Data) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  // eslint-disable-next-line max-len
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`, "?");
}

export class HTTPTransport {
  get: Method = (url, options = {}) => this.request(
    url,
    { ...options, method: METHODS.GET },
    options.timeout,
  );

  post: Method = (url, options = {}) => this.request(
    url,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  put: Method = (url, options = {}) => this.request(
    url,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  delete: Method = (url, options = {}) => this.request(
    url,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  request = (url: Url, options: Options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error("No method"));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}