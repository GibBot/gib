interface ActionButtonProps {
  children: string | React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type?: 'primary' | 'secondary' | 'disable' | 'action-button';
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  className,
  type = 'action-button',
}) => {
  function buttonType(type: string) {
    if (type === 'primary') {
      return 'bg-button-primary';
    } else if (type === 'secondary') {
      return 'bg-button-secondary';
    } else if (type === 'disable') {
      return 'bg-button-disable';
    } else if (type === 'action-button') {
      return 'bg-action-button';
    }
  }

  return (
    <button
      className={`${className} ${buttonType(
        type,
      )}  w-[195px] py-[14px] rounded-[13px] flex flex-col justify-center items-center`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
