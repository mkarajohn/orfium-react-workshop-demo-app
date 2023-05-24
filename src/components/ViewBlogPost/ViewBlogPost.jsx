import './ViewBlogPost.css';

function ViewBlogPost(props) {
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
