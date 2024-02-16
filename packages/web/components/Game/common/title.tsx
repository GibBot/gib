export function LoadTitle({
  children,
  className,
}: {
  children: React.ReactNode | string;
  className?: string;
}) {
  return (
    <div
      className={`bordered-text text-[24px] font-black font-RealTextPro-Black tracking-[0.72px] ${className}`}
    >
      {children}
    </div>
  );
}

export function Title22px({
  children,
  className,
}: {
  children: React.ReactNode | string;
  className?: string;
}) {
  return (
    <div
      className={`text-[22px] font-black text-center font-RealTextPro-Black capitalize ${className}`}
    >
      {children}
    </div>
  );
}
