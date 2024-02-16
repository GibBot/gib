import Image from 'next/image';
import { motion } from 'framer-motion';

export function ResultCard({
  className,
  children,
  backgroundAnimation,
  isEnd,
}: {
  className?: string;
  children?: React.ReactNode;
  backgroundAnimation?: React.ReactNode;
  isEnd?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-[32px] overflow-hidden relative ${className}`}
    >
      {isEnd && (
        <motion.div
          className="absolute inset-3 w-[90%] z-[1]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/game/card-bg.png"
            width={400}
            height={300}
            className="w-full h-full"
            alt=""
          />
        </motion.div>
      )}

      <div className="absolute top-0  ">{backgroundAnimation}</div>
      <div className="z-[10] relative">{children}</div>
    </div>
  );
}
