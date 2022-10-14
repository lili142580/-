import request from "@/untils/request";
export function getAction(url: string, params?: any) {
    return request({
        url,
        method: 'get',
        params: params,
    })
}
export function postAction(url: string, params?: any) {
    return request({
        url,
        method: 'post',
        data: params,
    })
}