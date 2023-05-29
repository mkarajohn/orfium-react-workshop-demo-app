import './BlogListItem.css';

export type Props = {
  id: string;
  title: string;
  description: string;
  onSelect: (x: string) => void;
  selected: boolean;
};

function BlogListItem(props: Props) {
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
