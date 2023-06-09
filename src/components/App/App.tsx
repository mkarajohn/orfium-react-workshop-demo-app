import CreateBlogPost from '@/components/CreateBlogPost';
import Sidebar from '@/components/Sidebar';
import ViewBlogPost from '@/components/ViewBlogPost';
import { useFetch } from '@/hooks/useFetch.ts';
import type { BlogPostData, Mode } from '@/types.ts';
import { marked } from 'marked';
import { useRef, useState } from 'react';
import './App.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mangle } from 'marked-mangle';

marked.use({ ...mangle(), headerIds: false });

function App() {
  const [data, setLocalData] = useFetch('http://localhost:3001/api/blogposts');
  const [selected, setSelected] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('view');
  const blogsListRef = useRef<HTMLDivElement>(null);

  function handleNewPostSuccess(newPostID: string, newPostData: BlogPostData) {
    setMode('view');
    setLocalData({ ...data, [newPostID]: newPostData });
    setSelected(newPostID);
    setTimeout(() => {
      blogsListRef.current?.parentElement?.scroll({
        left: 0,
        top: blogsListRef.current?.offsetHeight,
        behavior: 'smooth',
      });
    }, 100);
  }

  function handleCloseBlogPostView() {
    setSelected(null);
  }

  return (
    <main className="app-wrapper">
      <div className="sidebar-wrapper">
        <Sidebar
          ref={blogsListRef}
          blogposts={data}
          selectedBlog={selected}
          setSelectedBlog={setSelected}
          mode={mode}
          setMode={setMode}
        />
      </div>
      <div className="main-content-wrapper">
        {mode === 'view' ? (
          data ? (
            <ViewBlogPost
              selectedBlog={selected ? data[selected] : null}
              onClose={handleCloseBlogPostView}
            />
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <CreateBlogPost onSuccess={handleNewPostSuccess} />
        )}
      </div>
    </main>
  );
}

export default App;
