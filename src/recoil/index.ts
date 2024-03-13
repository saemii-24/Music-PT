'use client';
import {atom, selector} from 'recoil';
import ko from '@/language/ko.json';
import jp from '@/language/jp.json';
import {SupabaseType} from '@/types/form';

export const mode = atom<boolean>({
  key: 'darkMode',
  default: false,
});

export const language = atom<string>({
  key: 'nowLanguage',
  default: 'ko',
});

export const languageMode = selector({
  key: 'languageDataSelector',
  get: ({get}) => {
    const nowLanguageMode = get(language);
    return nowLanguageMode === 'ko' ? ko : jp;
  },
});

export const musicAtom = atom<Partial<SupabaseType>>({
  key: 'musicData',
  default: {},
});
