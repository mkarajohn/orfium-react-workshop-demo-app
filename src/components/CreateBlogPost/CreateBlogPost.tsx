import { BlogPostData } from '@/types.ts';
import './CreateBlogPost.css';

export type Props = {
  onSuccess: (x: string, y: BlogPostData) => void;
};
function CreateBlogPost() {
  return (
    <div className="create-blogpost-wrapper">
      <form>{/* Rest of the owl here */}</form>
      {/* Rest of the owl here */}
    </div>
  );
}

export default CreateBlogPost;
