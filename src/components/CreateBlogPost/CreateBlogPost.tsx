import { post } from '@/api.ts';
import BlogPost from '@/components/BlogPost';
import { BlogPostData } from '@/types.ts';
import { useState } from 'react';

export type Props = {
  onSuccess: (x: string, y: BlogPostData) => void;
};
function CreateBlogPost(props: Props) {
  const { onSuccess } = props;

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="relative flex h-full gap-8">
      <div className="shrink-0 grow basis-1/2">
        <form
          className="flex h-full w-full flex-col items-start gap-4"
          onSubmit={(e) => {
            e.preventDefault();

            post('http://localhost:3001/api/blogposts', {
              title: title,
              description: desc,
              content: content,
            }).then((newBlogPostData: { id: number } & BlogPostData) => {
              const { id, ...rest } = newBlogPostData;
              setTitle('');
              setDesc('');
              setContent('');
              onSuccess(id.toString(), rest);
            });
          }}
        >
          <input
            placeholder="Blog post title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
            className="w-full rounded border border-gray-300 p-4 shadow-inner"
          />
          <input
            placeholder="Blog post description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            value={desc}
            type="text"
            className="w-full rounded border border-gray-300 p-4 shadow-inner"
          />
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="w-full grow rounded border border-gray-300 p-4 shadow-inner"
            value={content}
          />
          <button
            disabled={!title || !content}
            className="w-1/3 self-center border bg-green-300 text-green-900 hover:border-green-900 disabled:border-gray-300 disabled:bg-gray-300 disabled:text-white"
          >
            Post
          </button>
        </form>
      </div>
      <div className="min-w-0 grow basis-1/2">
        <BlogPost blogData={{ title, description: desc, content }} />
      </div>
    </div>
  );
}

export default CreateBlogPost;
