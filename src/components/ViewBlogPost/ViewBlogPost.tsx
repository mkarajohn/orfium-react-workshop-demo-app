import BlogPost from '@/components/BlogPost';
import { BlogPostData } from '@/types.ts';

export type Props = {
  selectedBlog: BlogPostData | null;
  onClose: () => void;
};

function ViewBlogPost(props: Props) {
  const { selectedBlog, onClose } = props;

  return selectedBlog ? (
    <>
      <button tabIndex={1} className="fixed right-8 top-8 rounded-2xl bg-white" onClick={onClose}>
        Close
      </button>
      <BlogPost blogData={selectedBlog} />
    </>
  ) : (
    <div className="p-4 text-xl italic">Select a blog post</div>
  );
}

export default ViewBlogPost;
