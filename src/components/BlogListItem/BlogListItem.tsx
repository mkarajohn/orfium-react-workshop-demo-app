import { memo, useState } from 'react';

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
      className={`cursor-pointer rounded border transition-all ${
        selected
          ? 'scale-105 border border-gray-300 bg-white shadow-md'
          : 'border-gray-200 bg-white shadow-none'
      }`}
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
      <div className="flex items-center justify-between p-4">
        <span className="truncate pr-4 text-xl">{title}</span>{' '}
        {description ? (
          <button
            tabIndex={0}
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

export default memo(BlogListItem);
