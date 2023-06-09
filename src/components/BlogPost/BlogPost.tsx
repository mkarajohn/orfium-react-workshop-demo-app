import { BlogPostData } from '@/types.ts';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import './BlogPost.css';

export type Props = {
  blogData: BlogPostData;
};

function BlogPost(props: Props) {
  const { blogData } = props;

  return (
    <div className="blogpost">
      <h1>{blogData.title}</h1>
      <h2>{blogData.description}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked.parse(blogData.content)),
        }}
      ></div>
    </div>
  );
}

export default BlogPost;
