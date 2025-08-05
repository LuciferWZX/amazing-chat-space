export const ResponseCode = {
    SUCCESS: 0,
} as const;

export type CustomResponse<T> = {
    code: typeof ResponseCode.SUCCESS,
    message: string,
    data: T
}|undefined