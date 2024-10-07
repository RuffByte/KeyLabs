'use client';

import React, { createContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import Button from './Button';

type DialogContextProps = {
  open: boolean;
  handleToggle: () => void;
  handleClose: () => void;
};

const DialogContext = createContext({} as DialogContextProps);

export const useDialog = () => {
  const context = React.useContext<DialogContextProps>(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export const Dialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setopen] = useState(false);

  const handleClose = () => {
    setopen(false);
  };

  const handleToggle = () => {
    setopen(() => !open);
  };

  return (
    <DialogContext.Provider
      value={{
        open,
        handleToggle,
        handleClose,
      }}
    >
      {open && <Modal />}
      {children}
    </DialogContext.Provider>
  );
};

const Modal = () => {
  const { handleClose } = useDialog();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.2 }}
        onClick={handleClose}
        className="fixed inset-0 z-[1000] h-dvh w-dvw bg-black/70"
      />
    </AnimatePresence>
  );
};

export const DialogContent = ({ children }: { children: React.ReactNode }) => {
  const { open } = useDialog();
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.1 }}
          className="absolute left-1/2 top-1/2 z-[1000] rounded-lg bg-background [translate:-50%_-50%]"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DialogTriggerButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { handleToggle, open } = useDialog();
  return (
    <Button
      onClick={handleToggle}
      className={cn('flex items-center gap-2 px-8', open && 'border-secondary')}
      variant="outline"
    >
      {children}
    </Button>
  );
};

export default Dialog;
