import axios, { AxiosResponse, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import { HttpCodeConfig } from './httpCode';
import { ResponseModel, uploadFileItemModel } from './types/index'
import { getToken } from '../token/index'

class Request {
    service: AxiosInstance

    constructor() {
        this.service = axios.create({
            baseURL: import.meta.env.VITE_APP_BASE_URL,
            timeout: 5 * 1000
        });

        this.service.interceptors.request.use(
            (success: InternalAxiosRequestConfig) => {
                return success
            },
            (error: AxiosError) => {
                console.log('requestError: ', error)
                return Promise.reject(error);
            },
            ({
                runWhen: ((config: InternalAxiosRequestConfig) => {
                    /**
                     * set your headers
                     */
                    if (getToken()) {
                        config.headers[import.meta.env.VITE_APP_TOKEN_KEY] = getToken()
                    }
                    return true
                })
            })
        );

        this.service.interceptors.response.use(
            (response: any) => {
                const { data } = response
                const { code } = data
                if (code && code !== HttpCodeConfig.success) {
                    switch (code) {
                        case HttpCodeConfig.notFound:
                            // the way to handle this code
                            break;
                        case HttpCodeConfig.noPermission:
                            // the method to handle this code
                            break;
                        default:
                            break;
                    }
                } else {
                    return data
                }
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }

    request<T = any>(config: AxiosRequestConfig) {
        return new Promise((resolve, reject) => {
            try {
                this.service.request(config)
                    .then((res: AxiosResponse<ResponseModel<T>>) => {
                        const { data } = res.data
                        resolve(data as Promise<T>)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            } catch (err) {
                return Promise.reject(err)
            }
        })
    }

    get<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.service.request({ method: 'GET', ...config })
    }
    post<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.service.request({ method: 'POST', ...config })
    }
    put<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.service.request({ method: 'PUT', ...config })
    }
    delete<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.service.request({ method: 'DELETE', ...config })
    }
    upload<T = any>(fileItem: uploadFileItemModel, config: AxiosRequestConfig): Promise<T> {
        let fd = new FormData()
        fd.append(fileItem.name, fileItem.value)
        let headers = { 'Content-Type': 'multipart/form-data', ...config.headers }
        delete config.headers
        /**
         *  If the URL of the uploaded file is globally unique, you can configure it in the environment variable and set it here
         *  like: config.headers.url = import.meta.env.VITE_UPLOAD_URL || config.headers.url
         */
        return this.service.request({ method: 'POST', headers, data: fd, ...config })
    }
}

const httpRequest = new Request()
export default httpRequest;