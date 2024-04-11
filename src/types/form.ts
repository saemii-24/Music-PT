import {UseFormRegister, UseFormReset, UseFormWatch} from 'react-hook-form';

export type FormValues = {
  title_ko: string;
  singer_ko: string;
  youtube_ko: string;
  album_ko: string;
  release_ko: string;
  thumbnail_ko: FileList;
  lyrics_ko: string;
  title_jp: string;
  singer_jp: string;
  youtube_jp: string;
  album_jp: string;
  release_jp: string;
  thumbnail_jp: FileList;
  lyrics_jp: string;
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
  count: number | null;
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

export type LyricsVerType = 'koVer' | 'jpVer' | 'koCompare' | 'jpCompare';

export type UploadImagePropsType = {
  watch: UseFormWatch<FormValues>;
  register: UseFormRegister<FormValues>;
  reset: UseFormReset<FormValues>;
};

export type SelectType = 'title' | 'singer' | 'all';

export interface UserInterfaceType {
  name?: string;
  email?: string;
  image?: string;
}

export type LangType = 'ko' | 'jp';

export type StatusType = 'error' | 'success' | 'pending';
