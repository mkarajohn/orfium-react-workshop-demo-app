export type BlogPostData = { title: string; description: string; content: string };

export type BlogPostsResponse = Record<string, BlogPostData>;

export type Mode = 'view' | 'create';
