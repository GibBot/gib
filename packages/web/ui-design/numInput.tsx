interface NumInputProps {
  defaultValue?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number | readonly string[] | undefined;
  className?: string;
  type?: string;
  placeholder?: string;
}

export const NumInput: React.FC<NumInputProps> = ({
  defaultValue,
  onChange,
  value,
  className,
  type,
  placeholder,
  ...props
}) => {
  return (
    <input
      className={`font-rubik text-[17px] leading-[20px] tracking-[-0.24px] bg-card focus:border-none focus:outline-none w-40 text-right ${className} placeholder:text-muted placeholder:font-rubik placeholder:text-[17px] placeholder:leading-[20px] placeholder:tracking-[-0.24px] text-primary `}
      type={type}
      value={value || defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};
