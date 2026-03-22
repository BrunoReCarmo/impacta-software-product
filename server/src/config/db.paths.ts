export const dbPaths = {
    tables: {
        auth: 'users',
        pubTags: 'post_tags',
    },
    columns: {
        auth: {
            email: 'email',
            passwd: 'password',
            user: 'user'
        },
    },
} as const;
