import React from 'react';
import { Check } from 'lucide-react';

import { useConfig } from '@/app/client-page';
import languages from '../../../../app/static/language/_list.json';

export const LanguageSelectionDialog = () => {
  const { config, setConfig } = useConfig();
  return (
    <div className="min-w-[600px] pb-8">
      <div className="flex p-4  justify-between items-center border-b">
        <h3 className="text-2xl">Languages set</h3>
      </div>
      {(languages as string[]).map((language) => (
        <LanguageItem
          key={language}
          name={language}
          currentLang={config.language}
          onClick={() => setConfig({ ...config, language: language })}
        />
      ))}
    </div>
  );
};

type LanguageItemProps = {
  name: string;
  currentLang: string;
  onClick: () => void;
};
const LanguageItem = ({ name, currentLang, onClick }: LanguageItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full select-none items-center flex cursor-pointer py-2 hover:bg-foreground hover:text-background"
    >
      <div className="min-w-5 mx-4">
        {name.toLowerCase() == currentLang.toLowerCase() ? (
          <Check size={20} />
        ) : null}
      </div>
      {name}
    </button>
  );
};
