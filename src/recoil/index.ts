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

//musicpt/** 경로에서 사용되는 데이터
export const musicAtom = atom<Partial<SupabaseType>>({
  key: 'musicData',
  default: {},
});

export const needRefetch = atom<boolean>({
  key: 'musicRefetch',
  default: false,
});
