import React, { ReactNode } from 'react';

interface BigButtonProps {
  children: string | ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type: 'disable' | 'primary' | 'secondary' | 'action-button';
}

function buttonColor(type: string) {
  if (type === 'primary') {
    return 'bg-button-primary text-primary';
  } else if (type === 'secondary') {
    return 'bg-button-secondary';
  } else if (type === 'disable') {
    return 'bg-button-disable text-muted';
  } else if (type === 'action-button') {
    return 'bg-action-button';
  }

  return '';
}

export const BigButton: React.FC<BigButtonProps> = ({
  children,
  onClick,
  className,
  type,
}) => {
  return (
    <button
      className={`text-[17px] uppercase font-semibold transition-all duration-200 font-rubik leading-[22px] ${className}  ${buttonColor(
        type,
      )} py-[8px] px-[20px] rounded-[14px] w-full `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
