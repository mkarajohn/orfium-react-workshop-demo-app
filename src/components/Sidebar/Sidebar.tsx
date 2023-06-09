import BlogListItem from '@/components/BlogListItem';
import type { BlogPostsResponse, Mode } from '@/types.ts';
import { ForwardedRef, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './Sidebar.css';

export type Props = {
  blogposts: BlogPostsResponse | null;
  mode: Mode;
  setMode: (x: Mode) => void;
  selectedBlog: string | null;
  setSelectedBlog: (x: null | string) => void;
};

const Sidebar = forwardRef(function Sidebar(props: Props, ref: ForwardedRef<HTMLDivElement>) {
  const { blogposts, mode, setMode, selectedBlog, setSelectedBlog } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const localRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (key: string) => {
      setMode('view');
      setSelectedBlog(key);
    },
    [setMode, setSelectedBlog]
  );

  const filteredBlogposts = useMemo(() => {
    const filteredBlogposts: Record<
      string,
      { title: string; description: string; content: string }
    > = {};

    for (const id in blogposts) {
      const post = blogposts[id];

      if (post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        filteredBlogposts[id] = post;
      }
    }

    return filteredBlogposts;
  }, [blogposts, searchTerm]);

  useEffect(() => {
    localRef.current?.scroll({
      left: 0,
      top: 0,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      behavior: 'instant',
    });
  }, [searchTerm]);

  const keys = Object.keys(filteredBlogposts);

  return (
    <div className="sidebar">
      <input
        tabIndex={2}
        placeholder="Search blog posts"
        type="search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div ref={localRef}>
        <div ref={ref}>
          {blogposts ? (
            keys.map((key) => {
              return (
                <BlogListItem
                  key={key}
                  id={key}
                  selected={key === selectedBlog}
                  title={blogposts[key].title}
                  description={blogposts[key].description}
                  onSelect={handleSelect}
                />
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <div>
        {mode === 'view' ? (
          <button
            className="create"
            tabIndex={0}
            onClick={() => {
              setMode('create');
            }}
          >
            Create new
          </button>
        ) : (
          <button
            className="cancel"
            tabIndex={0}
            onClick={() => {
              setMode('view');
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
});

export default Sidebar;
