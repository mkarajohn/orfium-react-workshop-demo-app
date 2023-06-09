import { BlogPostData } from '@/types.ts';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export type Props = {
  blogData: BlogPostData;
};

function BlogPost(props: Props) {
  const { blogData } = props;

  return (
    <div className="flex h-full w-full flex-col gap-8 rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="word-break-break-word line-clamp-3 shrink-0">{blogData.title}</h1>
      <h2 className="word-break-break-word line-clamp-2 shrink-0">{blogData.description}</h2>
      <div
        style={{ wordBreak: 'break-word' }}
        className="grow overflow-auto break-words"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked.parse(blogData.content)),
        }}
      ></div>
    </div>
  );
}

export default BlogPost;
