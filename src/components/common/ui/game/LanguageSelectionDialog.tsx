import React from 'react';
import { Check } from 'lucide-react';

import { useGameContext, usePreConfig } from '@/app/client-page';
import languages from '@/static/language/_list.json';

export const LanguageSelectionDialog = () => {
  const { handleResetGame } = useGameContext();
  const { config, setConfig } = usePreConfig();
  return (
    <div className="min-w-[600px] pb-8 text-foreground">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-2xl">Languages set</h3>
      </div>
      {(languages as string[]).map((language) => (
        <LanguageItem
          key={language}
          name={language}
          currentLang={config.language}
          onClick={() => {
            setConfig({ ...config, language: language });
            handleResetGame();
          }}
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
      className="flex w-full cursor-pointer select-none items-center py-2 hover:bg-foreground hover:text-background"
    >
      <div className="mx-4 min-w-5">
        {name.toLowerCase() == currentLang.toLowerCase() ? (
          <Check size={20} />
        ) : null}
      </div>
      {name}
    </button>
  );
};
