import './BlogListItem.css';

function BlogListItem(props) {
  const { selected } = props;

  return (
    <div tabIndex={0} className={`blog-list-item ${selected ? 'selected' : ''}`}>
      <div>
        <span> {/* Rest of the owl here */}</span>
        {/* Rest of the owl here */}
      </div>
      {/* Rest of the owl here */}
    </div>
  );
}

export default BlogListItem;
