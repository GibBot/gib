import { ReactNode } from 'react';
import { Introduce } from './introduce';
import Image from 'next/image';

interface LinkCardProps {
  icon?: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  linkWord?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  icon,
  title,
  description,
  linkWord,
  className,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`bg-card min-w-[260px] py-[10px] pl-[16px] pr-[24px] rounded-[13px] flex items-center justify-between ${className} `}
      {...props}
    >
      <Introduce
        icon={icon}
        title={title}
        description={description}
        className="items-center"
      />
      <p
        className="font-rubik text-[15px] leading-[22px] tracking-[-0.408px] text-muted "
        onClick={onClick}
      >
        {linkWord}

        <Image
          src="/images/right-arrow.svg"
          alt="arrow"
          width={7}
          height={12}
          className="inline ml-[12px]"
        />
      </p>
    </div>
  );
};
