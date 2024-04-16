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

export interface LanguageType {
  'header-btn-add': string;
  'header-btn-all': string;
  'header-btn-mypage': string;
  'header-btn-login': string;
  'home-title': string;
  'footer-introduce': string;
  'footer-notice': string;
  'addmusic-title': string;
  'addmusic-description': string;
  'addmusic-music-title': string;
  'addmusic-music-description': string;
  'addmusic-input-title': string;
  'addmusic-input-singer': string;
  'addmusic-input-link': string;
  'addmusic-album-title': string;
  'addmusic-album-description': string;
  'addmusic-album-image': string;
  'addmusic-album-upload': string;
  'addmusic-album-success': string;
  'addmusic-album-cancle': string;
  'addmusic-input-album': string;
  'addmusic-input-release': string;
  'addmusic-input-thumbnail': string;
  'addmusic-input-thumbnail-foucs': string;
  'addmusic-input-thumbnail-description': string;
  'addmusic-lyrics-title': string;
  'addmusic-lyrics-description': string;
  'addmusic-input-language': string;
  'addmusic-input-language-ko': string;
  'addmusic-input-language-jp': string;
  'addmusic-input-lyrics': string;
  'addmusic-button-cancle': string;
  'addmusic-button-submit': string;
  'language-button-korean': string;
  'language-button-japanese': string;
  'search-title': string;
  'search-description': string;
  'search-rule-all': string;
  'search-rule-title': string;
  'search-rule-singer': string;
  'search-input-placeholder': string;
  'search-none': string;
  'music-singer': string;
  'music-album': string;
  'music-release': string;
  'music-edit': string;
  'music-delete': string;
  'music-youtube-ko': string;
  'music-youtube-jp': string;
  'music-edit-korean': string;
  'music-edit-japanese': string;
  'music-add-korean': string;
  'music-add-japanese': string;
  'music-edit-korean-translate': string;
  'music-edit-japanese-translate': string;
  'music-together-korean': string;
  'music-together-japanese': string;
  'music-tab-korean': string;
  'music-tab-japanese': string;
  'music-tab-korean-compare': string;
  'music-tab-japanese-compare': string;
  'music-title-korean': string;
  'music-title-japanese': string;
  'music-title-jpver-korean': string;
  'music-title-kover-japanese': string;
  'music-lyrics-none': string;
  'addtranslate-description-korean': string;
  'addtranslate-description-japanese': string;
  'addtranslate-title-korean': string;
  'addtranslate-title-japanese': string;
  'addtranslate-button-cancle': string;
  'addtranslate-button-submit': string;
  'edittranslate-description-korean': string;
  'edittranslate-description-japanese': string;
  'edittranslate-title-korean': string;
  'edittranslate-title-japanese': string;
  'mypage-profile': string;
  'mypage-nickname': string;
  'mypage-profile-image': string;
  'mypage-profile-email': string;
  'mypage-profile-status': string;
  'mypage-profile-logout': string;
  'mypage-like': string;
  'mypage-like-list': string;
  'mypage-profile-login': string;
  'login-title-one': string;
  'login-title-two': string;
  'login-description': string;
  'login-google': string;
  'login-kakao': string;
  'login-naver': string;
  'music-add-lyrics-korean': string;
  'music-add-lyrics-japanese': string;
  'music-add-lyrics': string;
  'music-add-lyrics-title': string;
  'music-add-lyrics-description': string;
  'music-add-lyrics-button': string;
  'error-title': string;
  'error-singer': string;
  'error-album': string;
  'error-release': string;
  'error-lyrics': string;
  'error-required': string;
  'none-lyrics-title': string;
  'none-lyrics-description': string;
  'none-lyrics-button': string;
  'toast-music-add': string;
  'toast-music-cancle': string;
  'toast-music-login': string;
  'toast-music-pending': string;
  'toast-music-success': string;
  'toast-music-error': string;
  'toast-image-error': string;
  'toast-lyrics-pending': string;
  'toast-lyrics-success': string;
  'toast-lyrics-edit': string;
  'toast-lyrics-edit-success': string;
  'toast-translate-pending': string;
  'toast-translate-success': string;
  'toast-music-delete': string;
  'toast-music-edit': string;
}
