import { Variants } from 'framer-motion';

export const hitVariants = (index: number): Variants => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2, delay: index * 0.1 } },
    exit: { opacity: 0, scale: 1.2, transition: { duration: 0.1 } },
  } as Variants;
};

export const OptionBarOutVariants = (hasStart: boolean): Variants => {
  return {
    initial: { x: '-50%' },
    animate: {
      opacity: hasStart ? 0 : 1,
      y: hasStart ? '100%' : '0%',
      transition: { ease: 'easeInOut', duration: 0.25 },
    },
  };
};

export const NavigationOutVariants = (hasStart: boolean): Variants => {
  return {
    animate: {
      opacity: hasStart ? 0 : 1,
      y: hasStart ? '-100%' : '0%',
      transition: { ease: 'easeInOut', duration: 0.25 },
    },
  };
};
