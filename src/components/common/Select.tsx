import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type HTMLAttributes,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface SelectProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  name: string;
  float?: 'left' | 'right';
  children?: React.ReactNode;
}

export const SelectItem = ({ value }: { value: string }) => {
  const { handleClose, handleSelect, value: current } = useSelectContext();

  return (
    <button
      className={cn(
        'flex h-8 w-full items-center justify-between px-8 py-2 text-foreground',
        String(value) === String(current)
          ? 'bg-foreground text-background'
          : 'hover:bg-highlight/10'
      )}
      onClick={() => {
        handleClose();
        handleSelect(value);
      }}
    >
      {String(value ?? '')}
    </button>
  );
};

const SelectContext = createContext(
  {} as {
    handleToggle: () => void;
    handleClose: () => void;
    handleSelect: (val: string) => void;
    open: boolean;
    value?: string;
  }
);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

type SelectPropss = {
  children: React.ReactNode;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const Select = ({ children, defaultValue, onChange }: SelectPropss) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>(
    defaultValue ?? undefined
  );
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSelect = (value: string) => {
    setValue(value);
  };

  useLayoutEffect(() => {
    if (value && onChange) {
      onChange(value);
    }
  }, [value]);

  return (
    <SelectContext.Provider
      value={{ handleToggle, handleClose, open, value, handleSelect }}
    >
      {children}
    </SelectContext.Provider>
  );
};

export const SelectContent = ({
  className,
  name,
  children,
  float = 'left',
  ...props
}: SelectProps) => {
  const { open, handleToggle, value } = useSelectContext();
  return (
    <div className="relative flex w-full max-w-min grow flex-col">
      <button
        {...props}
        className={cn(
          'hover:bg-accent relative flex items-center justify-between rounded-md border border-secondary/70 p-2 px-8 text-base text-foreground *:stroke-foreground hover:bg-highlight/10',
          className
        )}
        onClick={handleToggle}
      >
        {value ?? name}
        <ChevronDown size={16} />
      </button>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.075 } }}
            className="absolute left-0 top-full mt-1 w-full origin-top rounded-md border border-secondary/70 bg-background text-base"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
