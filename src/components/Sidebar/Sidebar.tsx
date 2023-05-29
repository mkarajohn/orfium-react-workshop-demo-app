import type { BlogPostsResponse, Mode } from '@/types.ts';
import './Sidebar.css';

export type Props = {
  blogposts: BlogPostsResponse | null;
  mode: Mode;
  setMode: (x: Mode) => void;
  selectedBlog: string | null;
  setSelectedBlog: (x: null | string) => void;
};

function Sidebar() {
  return (
    <div className="sidebar">
      <input
      // Rest of the owl here
      />
      <div>
        <div>{/* Rest of the owl here */}</div>
      </div>
      <div>{/* Rest of the owl here */}</div>
    </div>
  );
}

export default Sidebar;
