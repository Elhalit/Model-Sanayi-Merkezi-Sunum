import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div 
      className="fixed top-6 right-6 z-50 flex items-center gap-3"
      data-testid="language-switcher"
    >
      <div className="flex items-center gap-2 backdrop-blur-xl bg-[hsl(210_20%_12%)]/40 border border-white/10 rounded-lg p-1 shadow-2xl shadow-black/20">
        <Globe className="w-4 h-4 text-[hsl(45_95%_56%)] ml-2" />
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md ${
              i18n.language === lang.code
                ? 'text-[hsl(45_95%_56%)]'
                : 'text-white/60 hover:text-white/80'
            }`}
            data-testid={`lang-${lang.code}`}
          >
            {lang.label}
            {i18n.language === lang.code && (
              <motion.div
                layoutId="activeLanguage"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(45_95%_56%)]"
                initial={false}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
