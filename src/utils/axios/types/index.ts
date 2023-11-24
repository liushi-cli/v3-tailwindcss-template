export interface ResponseModel<T = any> {
    success: boolean;
    message: string | null;
    code: number | string;
    data: T;
}

export interface uploadFileItemModel {
    name: string,
    value: string | Blob
}