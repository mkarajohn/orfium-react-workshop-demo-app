import BlogItem from '@/components/BlogItem';
import { marked } from 'marked';
import { useEffect, useMemo, useRef, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import './App.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mangle } from 'marked-mangle';

marked.use({ ...mangle(), headerIds: false });

function App() {
  const [blogposts, setBlogposts] = useState<Record<
    string,
    { title: string; description: string; content: string }
  > | null>(null);
  const [selected, setSelected] = useState<null | string>(null);
  const [mode, setMode] = useState<'view' | 'create'>('view');
  const [shouldFetch, setShouldFetch] = useState(true);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const listRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (shouldFetch) {
      const request = fetch('http://localhost:3001/api/blogposts', { signal });

      request
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setBlogposts(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setShouldFetch(false);
        });
    }

    return function () {
      controller.abort();
    };
  }, [shouldFetch]);

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

  const keys = Object.keys(filteredBlogposts);

  return (
    <main className="flex h-screen w-screen">
      <div className="relative z-10 flex w-96 shrink-0 flex-col  bg-gray-50 shadow-xl shadow-gray-300">
        <input
          placeholder="Search blog posts"
          type="search"
          className="w-full border-b border-gray-300 px-4 py-6 shadow-inner"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div
          ref={listRef}
          className="flex grow flex-col gap-4 overflow-auto p-4"
          onClick={() => {
            setSelected(null);
          }}
        >
          {blogposts
            ? keys.map((key) => {
                return (
                  <BlogItem
                    selected={key === selected}
                    key={key}
                    title={blogposts[key].title}
                    description={blogposts[key].description}
                    onSelect={() => {
                      setMode('view');
                      setSelected(key);
                    }}
                  />
                );
              })
            : null}
        </div>
        <div className="flex shrink-0 flex-col p-4 pb-8">
          {mode === 'view' ? (
            <button
              className="border bg-green-300 text-green-900 hover:border-green-900"
              onClick={() => {
                setMode('create');
              }}
            >
              Create new
            </button>
          ) : (
            <button
              className="border bg-red-300 text-red-900 hover:border-red-900"
              onClick={() => {
                setMode('view');
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="relative grow overflow-auto bg-gray-100 px-16 py-8">
        {mode === 'view' ? (
          selected ? (
            blogposts ? (
              <div className="flex shrink-0 grow basis-1/2 flex-col gap-8 rounded-2xl bg-white p-8 shadow-xl">
                <h1 style={{ wordBreak: 'break-word' }} className="break-words">
                  {blogposts[selected].title}
                </h1>
                <h2 style={{ wordBreak: 'break-word' }} className="break-words">
                  {blogposts[selected].description}
                </h2>
                <div
                  style={{ wordBreak: 'break-word' }}
                  className="break-words"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(marked.parse(blogposts[selected].content)),
                  }}
                ></div>
              </div>
            ) : null
          ) : (
            <div className="p-4 text-xl italic">Select a blog post</div>
          )
        ) : (
          <div className="relative flex h-full gap-8">
            <form
              className="flex grow basis-1/2 flex-col items-start gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                console.log({
                  title: title,
                  description: desc,
                  content: content,
                });
                fetch('http://localhost:3001/api/blogposts', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    title: title,
                    description: desc,
                    content: content,
                  }),
                })
                  .then((resp) => resp.json())
                  .then(
                    (data: { id: number; title: string; description: string; content: string }) => {
                      const { id, ...rest } = data;
                      setMode('view');
                      setBlogposts({ ...blogposts, [id]: rest });
                      setSelected(id.toString());
                      setTitle('');
                      setDesc('');
                      setContent('');
                    }
                  )
                  .then(() => {
                    setTimeout(() => {
                      listRef.current?.scroll({
                        left: 0,
                        top: listRef.current?.offsetHeight,
                        behavior: 'smooth',
                      });
                    }, 100);
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
                className="w-full rounded border border-gray-300 p-4 shadow-inner"
              />
              <input
                placeholder="Blog post description"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                value={desc}
                type="text"
                className="w-full rounded border border-gray-300 p-4 shadow-inner"
              />
              <textarea
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className="w-full grow rounded border border-gray-300 p-4 shadow-inner"
                value={content}
              />
              <button
                disabled={!title || !content}
                className="w-1/3 self-center border bg-green-300 text-green-900 hover:border-green-900 disabled:border-gray-300 disabled:bg-gray-300 disabled:text-white"
              >
                Post
              </button>
            </form>
            <div className="flex grow basis-1/2 flex-col gap-4 overflow-auto rounded-2xl bg-white p-8 shadow-xl">
              <h1 style={{ wordBreak: 'break-word' }} className="break-words">
                {title}
              </h1>
              <h2 style={{ wordBreak: 'break-word' }} className="break-words">
                {desc}
              </h2>
              <div
                style={{ wordBreak: 'break-word' }}
                className="break-words"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(marked.parse(content)),
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
