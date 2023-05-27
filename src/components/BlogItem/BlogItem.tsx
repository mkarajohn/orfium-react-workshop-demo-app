import { useState } from 'react';

function BlogItem(props: {
  title: string;
  description: string;
  onSelect: () => void;
  selected: boolean;
}) {
  const { title, description, onSelect, selected } = props;
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      tabIndex={0}
      className={`cursor-pointer rounded border transition-all ${
        selected
          ? 'scale-105 border border-gray-300 bg-white shadow-md'
          : 'border-gray-200 bg-white shadow-none'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onKeyDown={(e) => {
        if (e.code === 'Enter' || e.code === 'Space') {
          e.stopPropagation();
          onSelect();
        }
      }}
    >
      <div className="flex items-center justify-between p-4">
        <span className="truncate text-xl">{title}</span>{' '}
        {description ? (
          <button
            className="h-8 w-8 shrink-0 border-gray-300 p-0"
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
      {expanded ? <div className="truncate p-4 pt-0 text-base">{description}</div> : null}
    </div>
  );
}

export default BlogItem;
