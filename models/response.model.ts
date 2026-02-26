export interface Metadata {
    status: 'ok' | 'failed'
}

export interface Response<T> {
    data: T;
    metadata: Metadata
}