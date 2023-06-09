import { memo, useState } from 'react';
import './BlogListItem.css';

export type Props = {
  id: string;
  title: string;
  description: string;
  onSelect: (x: string) => void;
  selected: boolean;
};

function BlogListItem(props: Props) {
  const { id, title, description, onSelect, selected } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      tabIndex={0}
      className={`blog-list-item ${selected ? 'selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onKeyDown={(e) => {
        if (e.code === 'Enter' || e.code === 'Space') {
          e.stopPropagation();
          onSelect(id);
        }
      }}
    >
      <div>
        <span>{title}</span>
        {description ? (
          <button
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          >
            {expanded ? '-' : '+'}
          </button>
        ) : null}
      </div>
      {expanded ? <div>{description}</div> : null}
    </div>
  );
}

export default memo(BlogListItem);
