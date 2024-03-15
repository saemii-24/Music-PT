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
