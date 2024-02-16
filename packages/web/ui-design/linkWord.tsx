import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface LinkWordProps {
  children: string | ReactNode;
  className?: string;
  href: Url;
}

export const LinkWord: React.FC<LinkWordProps> = ({
  children,
  className,
  href,
}) => {
  return (
    <Link
      className={`text-link text-[15px] font-rubik leading-[22px] ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
};
