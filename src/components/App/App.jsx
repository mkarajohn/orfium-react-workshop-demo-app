import { marked } from 'marked';
import './App.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mangle } from 'marked-mangle';

marked.use({ ...mangle(), headerIds: false });

function App() {
  return (
    <main className="app-wrapper">
      <div className="sidebar-wrapper">{/* Sidebar here */}</div>
      <div className="main-content-wrapper">{/* ViewBlogPost or CreateBlogPost here */}</div>
    </main>
  );
}

export default App;
