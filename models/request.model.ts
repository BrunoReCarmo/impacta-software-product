export interface Query<T> {
    page?: number;
    limit?: number;
}

export interface Request<T> {
    query: Query<T>;
    header: any;
    body?: Partial<T>;
}
