import { useCallback } from 'react';

import { getTranslation, type TranslationKey } from '@/src/constants/translations';
import { useSettingsStore } from '@/src/store/settingsStore';

export function useTranslation() {
  const language = useSettingsStore((s) => s.language);

  const t = useCallback(
    (key: TranslationKey) => getTranslation(language, key),
    [language],
  );

  return { language, t } as const;
}
