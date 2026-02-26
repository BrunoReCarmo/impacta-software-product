export const dbPaths = {
    tables: {
        auth: 'users',
    },
    columns: {
        auth: {
            email: 'email',
            passwd: 'password',
            user: 'user'
        },
    },
} as const;
