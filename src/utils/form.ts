import axios from 'axios';

import {createClient} from '@/supabase/client';
import {toast} from 'react-toastify';

import type {FormValues, TextAreaValue} from '@/types/form';
import type {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {SetterOrUpdater} from 'recoil';
import {FieldValues} from 'react-hook-form';

//각 페이지의 폼 제출시 사용되는 함수입니다.

//addmusic, editmusic 제출
export const formSubmit = async (data: any, route: AppRouterInstance) => {
  // 로딩 메시지 표시
  const loadingToast = toast.loading('음악을 등록 중입니다.');

  /*만약 일본어 버전을 클릭하지 않았을 경우, react-hook-form에서 해당 값을 
  인식하지 못하므로, 기본값을 지정한다.*/
  if (!data.album_jp) {
    data.title_jp = '';
    data.singer_jp = '';
    data.youtube_jp = '';
    data.album_jp = '';
    data.release_jp = '';
    data.thumbnail_jp = {};
    data.lyrics_jp = '';
  }

  try {
    const res = await onSubmit(data);
    const obj: any = Object.values(res)[1];

    //업로드 완료시 로딩메세지 닫고, 페이지 이동
    toast.dismiss(loadingToast);
    route.push('/musicpt/' + obj.id);
    toast.success('음악이 등록 되었습니다.');
  } catch (err) {
    toast.dismiss(loadingToast);
    console.error('업로드 오류:', err);
    toast.error('다시 시도해주세요.');
  }
};

//addmusic, editmusic에서 supabase storage thumbnail 업로드
export const onSubmit = async (data: FormValues) => {
  //일본어 버전의 경우 기본값을 지정해주어야 한다.

  const supabase = createClient();

  //file 이 업로드 되었을 때 처리
  let file_ko = data.thumbnail_ko![0];
  let file_jp = data.thumbnail_jp![0];

  let fileUrl_ko = '';
  let fileUrl_jp = '';

  let fileName_ko = 'ko_' + new Date().getTime();
  let fileName_jp = 'jp_' + new Date().getTime();

  if (file_ko) {
    const {data: uploadData, error} = await supabase.storage
      .from('thumbnail')
      .upload(`image_${fileName_ko}`, file_ko);

    //만약 업로드가 실패한 경우
    if (error) {
      console.error('이미지 업로드 실패:', error.message);
      toast.error('이미지 업로드에 실패했습니다.');
    } else {
      const {data: uploadUrl} = await supabase.storage
        .from('thumbnail')
        .getPublicUrl(uploadData!.path);

      fileUrl_ko = uploadUrl.publicUrl;
    }
  }

  if (file_jp) {
    const {data: uploadData, error} = await supabase.storage
      .from('thumbnail')
      .upload(`image_${fileName_jp}`, file_jp);

    //만약 업로드가 실패한 경우
    if (error) {
      console.error('이미지 업로드 실패:', error.message);
      toast.error('이미지 업로드에 실패했습니다.');
    } else {
      const {data: uploadUrl} = await supabase.storage
        .from('thumbnail')
        .getPublicUrl(uploadData!.path);

      fileUrl_jp = uploadUrl.publicUrl;
    }
  }

  //파일 url로 변경 완료, api에 post 요청
  try {
    const response = await axios.post('/api/music', {
      title_ko: data.title_ko,
      singer_ko: data.singer_ko,
      youtube_ko: data.youtube_ko,
      album_ko: data.album_ko,
      release_ko: data.release_ko,
      thumbnail_ko: fileUrl_ko,
      lyrics_ko: data.lyrics_ko,
      title_jp: data.title_jp,
      singer_jp: data.singer_jp,
      youtube_jp: data.youtube_jp,
      album_jp: data.album_jp,
      release_jp: data.release_jp,
      thumbnail_jp: fileUrl_jp,
      lyrics_jp: data.lyrics_jp,
    });
    return response.data;
  } catch (err) {
    console.error('에러가 발생했습니다: ', err);
    toast.error('다시 시도해주세요.');
  }
};

//file 확장자, 사이즈 확인
export const checkFileType = (value?: FileList) => {
  if (value && value[0]) {
    // 확장자 확인
    const correctFormat = [
      'image/png',
      'image/jpg',
      'image/webp',
      'image/jpeg',
    ];
    const file = value[0];
    const fileExtension = file.type.toLowerCase();

    if (value[0].size > 1048576) {
      return '* 1MB 이하 파일을 업로드해 주세요.';
    }
    if (!correctFormat.includes(fileExtension)) {
      return '* PNG 또는 JPG 파일을 업로드해 주세요.';
    }
  }
  return true;
};

//addlyrics
export const onSubmitAddLyrics = async (
  formdata: TextAreaValue,
  id: string,
  lang: string,
  route: AppRouterInstance,
  setNeedFetch: SetterOrUpdater<boolean>,
) => {
  const loadingToast = toast.loading('가사를 추가하는 중입니다.');

  try {
    const {data} = await axios.put(`/api/editlyrics/${id}`, {
      lyricsLang: lang,
      lyrics: formdata.lyrics,
    });
    toast.dismiss(loadingToast);
    route.push('/musicpt/' + id);
    //내용이 수정되었으므로, data를 refetch 해야한다.
    setNeedFetch(true);
    toast.success('가사가 추가 되었습니다.');
  } catch (err) {
    toast.dismiss(loadingToast);
    console.error(err);
    toast.error('다시 시도해주세요.');
  }
};

//editlyrics
export const onSubmitEditLyrics = async (
  formdata: TextAreaValue,
  id: string,
  lang: string,
  route: AppRouterInstance,
  setNeedFetch: SetterOrUpdater<boolean>,
) => {
  const loadingToast = toast.loading('가사를 수정 중입니다.');

  try {
    const {data} = await axios.put(`/api/editlyrics/${id}`, {
      lyricsLang: lang,
      lyrics: formdata.lyrics,
    });
    toast.dismiss(loadingToast);
    route.push('/musicpt/' + id);
    //내용이 수정되었으므로, data를 refetch 해야한다.
    setNeedFetch(true);
    toast.success('가사가 수정 되었습니다.');
    return data;
  } catch (err) {
    toast.dismiss(loadingToast);
    console.error(err);
    toast.error('다시 시도해주세요.');
  }
  return;
};

//addtranslate, edittranslate
export const onSumbitAddTranslate = async (
  formdata: FieldValues,
  id: string,
  lang: string,
  route: AppRouterInstance,
  setNeedFetch: SetterOrUpdater<boolean>,
) => {
  //객체형태로 들어오는 폼 데이터들을 줄바꿈된 하나의 string 값으로 바꾼다.
  let lyricsData = Object.values(formdata)
    .map((line: string, index: number) => {
      if (index === Object.keys(formdata).length - 1) {
        return line;
      } else {
        return line + '\n';
      }
    })
    .reduce((prev: string, cul: string) => prev + cul, '');

  // 로딩 메시지 표시
  const loadingToast = toast.loading('번역을 등록 중입니다.');

  try {
    const {data} = await axios.put(`/api/addtranslate/${id}`, {
      translateto: lang,
      lyrics: lyricsData,
    });
    toast.dismiss(loadingToast);

    //업로드 완료시 로딩메세지 닫고, 페이지 이동
    route.push('/musicpt/' + id);
    toast.success('번역이 등록 되었습니다.');
    //내용이 수정되었으므로, data를 refetch 해야한다.
    setNeedFetch(true);
    return data;
  } catch (err) {
    console.error('업로드 오류:', err);
    toast.error('다시 시도해주세요.');
  }
};

//react-hook-form defaultValue를 만들기 위한 함수
export function makeDefaultObj(arr: string[]) {
  let defaultValueObj: {[key: string]: string} = {};
  arr.forEach(
    (item: string, index: number) =>
      (defaultValueObj[`lyrics_${index}`] = item),
  );
  return defaultValueObj;
}

//muiscpt/[id] 음악을 삭제
export const deleteMusic = async (id: string, route: AppRouterInstance) => {
  try {
    await axios.delete(`/api/music/${id}`);
    route.push('/');
    toast.success('음악이 삭제되었습니다');
  } catch (err) {
    console.error('업로드 오류:', err);
    toast.error('다시 시도해주세요.');
  }
};
