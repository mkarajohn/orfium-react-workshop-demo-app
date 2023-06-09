import { post } from '@/api.ts';
import BlogPost from '@/components/BlogPost';
import { BlogPostData } from '@/types.ts';
import { useState } from 'react';
import './CreateBlogPost.css';

export type Props = {
  onSuccess: (x: string, y: BlogPostData) => void;
};
function CreateBlogPost(props: Props) {
  const { onSuccess } = props;

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="create-blogpost-wrapper">
      <form
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
        />
        <input
          placeholder="Blog post description"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
          type="text"
        />
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
        <button disabled={!title || !content}>Post</button>
      </form>
      <BlogPost blogData={{ title, description: desc, content }} />
    </div>
  );
}

export default CreateBlogPost;
