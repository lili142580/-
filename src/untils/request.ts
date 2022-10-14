import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue';
import { useRouter } from "vue-router";
declare module "axios" {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
}
const $router = useRouter()
const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
});
request.interceptors.request.use((config: AxiosRequestConfig) => {
    let token: string | null = localStorage.getItem('token')
    if (token) {
        if (config && config?.headers) {
            config.headers['Authorization'] = token
        }

    }
    return config;

}, (err: any) => {
    return Promise.reject(err)
})
request.interceptors.response.use((response: AxiosResponse) => {
    console.log(response, '==>')
    let { data, status } = response
    if (status == 200) {
        switch (data.meta.status) {
            case 500:
                message.error(data.meta.msg);
                break;
            case 400:
                message.error(data.meta.msg);
                break;
            case 402:
                $router.push({ path: '/login' })
                break;
            default:
                break;
        }
        return data
    } else {
        console.error('服务器报错！')
    }


}, (err: any) => {
    return Promise.reject(err)
})
export default request