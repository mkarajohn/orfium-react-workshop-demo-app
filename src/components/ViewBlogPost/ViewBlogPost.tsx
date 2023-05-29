import { BlogPostData } from '@/types.ts';
import './ViewBlogPost.css';

export type Props = {
  selectedBlog: BlogPostData | null;
  onClose: () => void;
};

function ViewBlogPost(props: Props) {
  const { selectedBlog } = props;

  return selectedBlog ? (
    <>
      <button tabIndex={1} className="close-blogpost-button">
        Close
      </button>
      {/* Rest of the owl here */}
    </>
  ) : (
    <div className="no-selected-blogpost-message">Select a blog post</div>
  );
}

export default ViewBlogPost;
