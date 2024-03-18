import {UseFormRegister, UseFormReset, UseFormWatch} from 'react-hook-form';

export type FormValues = {
  title: string;
  singer: string;
  youtube?: string;
  album: string;
  release: string;
  thumbnail?: FileList;
  thumbnailUrl?: string;
  language: string;
  lyrics: string;
};

export type SupabaseType = {
  date: string;
  updatedAt: string;
  id: number;
  jpalbum: string | null;
  jplyrics: string | null;
  jprelease: string | null;
  jpsinger: string | null;
  jpthumbnail: string | null;
  jptitle: string | null;
  jptranslate: string | null;
  jpyoutube: string | null;
  koalbum: string | null;
  kolyrics: string | null;
  korelease: string | null;
  kosinger: string | null;
  kothumbnail: string | null;
  kotitle: string | null;
  kotranslate: string | null;
  koyoutube: string | null;
};

export interface ParamsProps {
  params: {id: string};
}

export type TextAreaValue = {
  lyrics: string;
};

export type PropsType = {
  lang: string;
  id: string;
};

export type MusicPtProps = {
  lyricsVer: LyricsVerType;
  music: Partial<SupabaseType> | null;
  id: string;
};

export type MusicPtPropsOmitId = {
  setLyricsVer: React.Dispatch<React.SetStateAction<LyricsVerType>>;
  lyricsVer: LyricsVerType;
  music: Partial<SupabaseType> | null;
};

export type LyricsVerType =
  | '한국어 버전 가사'
  | '일본어 버전 가사'
  | '한국어 비교하기'
  | '일본어 비교하기';

export type UploadImagePropsType = {
  watch: UseFormWatch<FormValues>;
  register: UseFormRegister<FormValues>;
  reset: UseFormReset<FormValues>;
};
