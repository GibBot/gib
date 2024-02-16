import { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface MenuItemProps {
  header?: ReactNode;
  content?: ReactNode;
  navigation?: boolean;
  url?: string | URL;
  value?: string | number | ReactNode;
  height?: number;
  width?: number;
  className?: string;
}
interface MenuDividerProps {
  marginLeft?: number;
  borderColor?: string;
}

interface MenuProps {
  className?: string;
  bgColor?: string;
  borderColor?: string;
  children?: ReactNode;
}

export const Menu: React.FC<MenuProps> = ({
  className,
  bgColor,
  borderColor,
  children,
}) => {
  return (
    <div
      className={`w-full rounded-[13px] border border-solid ${className}`}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor || `var(--color-border-muted)`,
      }}
    >
      {/* {list.map((value, index) => {
        return (
          <div
            key={index}
            className={`${
              index !== 0 && 'border-t-[1px] border-muted border-solid '
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
      })} */}
      {children}
    </div>
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({
  header,
  content,
  navigation,
  url,
  value,
  height,
  width,
  className,
}) => {
  const router = useRouter();

  function clickRedirect() {
    router.push(url || '/');
  }

  return (
    <div
      className={`min-w-[260px] py-[10px] pl-[16px] pr-[24px] rounded-[13px] flex items-center justify-between ${className} `}
      onClick={navigation ? () => clickRedirect() : undefined}
      style={{ height, width }}
    >
      <div className="flex flex-row gap-[16px] items-center">
        {header}
        {content}
      </div>
      <div className="font-rubik text-[15px] leading-[22px] tracking-[-0.408px] text-muted ">
        {value}

        {navigation && (
          <Image
            src="/images/right-arrow.svg"
            alt="arrow"
            width={7}
            height={12}
            className="inline ml-[12px]"
          />
        )}
      </div>
    </div>
  );
};

export const MenuDivider: React.FC<MenuDividerProps> = ({
  marginLeft = 30,
  borderColor,
}) => {
  return (
    <div
      className="border-t-[1px] border-muted border-solid h-[1px] w-full"
      style={{ marginRight: `${marginLeft}px`, borderColor }}
    />
  );
};
