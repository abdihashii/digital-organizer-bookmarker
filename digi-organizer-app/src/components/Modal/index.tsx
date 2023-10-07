'use client';

import { motion } from 'framer-motion';
import Backdrop from '@/components/Modal/Backdrop';
import React from 'react';
import { X } from 'lucide-react';

const Modal = ({
  children,
  handleClose,
  title,
}: {
  children: React.ReactNode;
  handleClose: () => void;
  title: string;
}) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => {
          e.stopPropagation(); // prevents click event in modal from propagating to backdrop
        }}
        className="m-auto flex h-fit w-11/12 flex-col items-center gap-8 rounded-xl bg-white p-8 dark:bg-gray-800 lg:w-1/2"
      >
        <div className="flex w-full flex-row justify-between">
          <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <button onClick={handleClose} className="group">
            <X
              size={32}
              className="overflow-visible text-4xl text-gray-800 transition-colors duration-100 group-hover:text-gray-400 dark:text-white"
            />
          </button>
        </div>

        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
