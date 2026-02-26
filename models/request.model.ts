export interface Query<T> {
    page?: number;
    limit?: number;
    body?: Partial<T>;
}

export interface Request<T> {
    query: Query<T>;
}
