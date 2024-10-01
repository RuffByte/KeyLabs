'use client';

import React, { createContext, useState } from 'react';

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
      {children}
      {open && <Modal />}
    </DialogContext.Provider>
  );
};

const Modal = () => {
  const { handleClose } = useDialog();
  return (
    <div
      onClick={handleClose}
      className="fixed w-dvw h-dvh left-0 bg-black/70 z-[999]"
    />
  );
};

export const DialogContent = ({ children }: { children: React.ReactNode }) => {
  const { open } = useDialog();
  if (!open) return;
  return (
    <div className="rounded-lg absolute bg-background z-[1000] left-1/2 top-1/2 [translate:-50%_-50%]">
      {children}
    </div>
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
      className={cn(
        'w-min px-8 flex gap-2 items-center',
        open && 'border-secondary'
      )}
      variant="outline"
    >
      {children}
    </Button>
  );
};

export default Dialog;
