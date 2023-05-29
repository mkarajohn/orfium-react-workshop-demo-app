import { BlogPostData } from '@/types.ts';
// import { marked } from 'marked';
// import sanitizeHtml from 'sanitize-html';
import './BlogPost.css';

export type Props = {
  blogData: BlogPostData;
};

function BlogPost() {
  return (
    <div className="blogpost">
      {/* Rest of the owl here */}
      {/* Tip: use sanitizeHtml(marked.parse(blogData.content)) on the  */}
      {/*      dangerouslySetInnerHTML */}
    </div>
  );
}

export default BlogPost;
