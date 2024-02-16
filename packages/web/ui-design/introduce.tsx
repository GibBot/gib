import React, { ReactNode } from 'react';
import Image from 'next/image';

export interface IntroduceProps {
  icon?: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  className?: string;
}

export const Introduce: React.FC<IntroduceProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  return (
    <div className={`flex gap-[10px] ${className}`}>
      {icon && <div>{icon}</div>}
      <div>
        <div className="text-primary font-rubik text-[17px] leading-[22px] flex items-center">
          {title}
        </div>
        {description && (
          <div className="text-muted font-rubik text-[13px] leading-[18px] tracking-[-0.078px] ">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
