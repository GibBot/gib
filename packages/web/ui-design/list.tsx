import { ReactNode } from 'react';
import { Introduce } from './introduce';

interface listItem {
  icon?: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  children?: string | ReactNode;
}

interface ListProps {
  list: listItem[];
  className?: string;
}

export const List: React.FC<ListProps> = ({ list, className }) => {
  return (
    <div className={`bg-card min-w-[260px] rounded-[13px] ${className}`}>
      {list.map((value, index) => {
        return (
          <div
            key={index}
            className={`${
              index != 0 && 'border-t-[1px] border-muted border-solid '
            } flex items-center  pl-[16px] pr-[24px] min-h-[60px] justify-between  overflow-hidden overflow-ellipsis whitespace-nowrap `}
          >
            <div
              className={` w-full  py-[10px] flex  items-center  justify-between  overflow-hidden overflow-ellipsis whitespace-nowrap `}
            >
              <Introduce
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
              {value.children}
            </div>
          </div>
        );
      })}
    </div>
  );
};
