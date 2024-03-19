import axios from 'axios';
import {useRouter} from 'next/navigation';

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

  try {
    const res = await onSubmit(data);
    // console.log(res);
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
  const supabase = createClient();

  //file 이 업로드 되었을 때 처리
  let fileName = new Date().getTime();
  let file = data.thumbnail![0];

  let fileUrl = null;

  if (file) {
    const {data: uploadData, error} = await supabase.storage
      .from('thumbnail')
      .upload(`image_${fileName}`, file);

    //만약 업로드가 실패한 경우
    if (error) {
      console.error('이미지 업로드 실패:', error.message);
      toast.error('이미지 업로드에 실패했습니다.');
    } else {
      const {data: uploadUrl} = await supabase.storage
        .from('thumbnail')
        .getPublicUrl(uploadData!.path);

      fileUrl = uploadUrl.publicUrl;
    }
  }

  //파일 url로 변경 완료, api에 post 요청
  try {
    const response = await axios.post('/api/music', {
      title: data.title,
      singer: data.singer,
      youtube: data.youtube,
      album: data.album,
      release: data.release,
      thumbnail: fileUrl,
      language: data.language,
      lyrics: data.lyrics,
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
