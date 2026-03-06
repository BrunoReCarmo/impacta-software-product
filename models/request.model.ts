export interface Query<T> {
    page?: number;
    limit?: number;
}

export interface Request<T> {
    query: Query<T>;
    body?: Partial<T>;
}
