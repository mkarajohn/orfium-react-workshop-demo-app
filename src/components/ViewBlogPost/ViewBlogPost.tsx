import BlogPost from '@/components/BlogPost';
import { BlogPostData } from '@/types.ts';
import './ViewBlogPost.css';

export type Props = {
  selectedBlog: BlogPostData | null;
  onClose: () => void;
};

function ViewBlogPost(props: Props) {
  const { selectedBlog, onClose } = props;

  return selectedBlog ? (
    <>
      <button tabIndex={1} className="close-blogpost-button" onClick={onClose}>
        Close
      </button>
      <BlogPost blogData={selectedBlog} />
    </>
  ) : (
    <div className="no-selected-blogpost-message">Select a blog post</div>
  );
}

export default ViewBlogPost;
