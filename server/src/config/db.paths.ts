export const dbPaths = {
    tables: {
        auth: 'users',
        pubTags: 'post_tags',
        posts: 'posts',
        postTagRelations: 'post_tag_relations',
    },
    columns: {
        auth: {
            email: 'email',
            passwd: 'password',
            user: 'user'
        },
    },
} as const;
