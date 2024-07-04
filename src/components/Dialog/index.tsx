import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useOnClickOutside } from 'usehooks-ts';

interface IProps {
  children: ReactNode;
  handleDialogClose: () => void;
}

export default function Dialog({ children, handleDialogClose }: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, handleDialogClose);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={
        'fixed top-0 left-0 bg-black  z-[8999] bg-opacity-50 w-screen h-screen flex flex-col justify-center items-center align-middle'
      }
    >
      <motion.div
        className={
          'bg-background shadow-2xl  shadow-zinc-800 border-slate-600 border-2 overflow-y-auto scrollbar-thin max-h-[98vh] h-[80vh] tablet:h-[70%] z-[9998] relative rounded-xl overflow-hidden tablet:w-[70%] w-[95%] desktop:w-[55%]'
        }
        ref={ref}
      >
        <button
          onClick={() => {
            handleDialogClose();
          }}
          className={'absolute bg-background rounded-full right-3 top-3 z-[999] p-2 w-fit h-fit'}
        >
          <IoClose className={'text-white'} />
        </button>
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
