export interface IResponse<T> {
    Result:{
        statuscode: string,
        statustext: string,
    }
    data: T
}

