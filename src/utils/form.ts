import axios from 'axios';
import {useRouter} from 'next/navigation';

import {createClient} from '@/supabase/client';
import {toast} from 'react-toastify';

import type {FormValues, TextAreaValue} from '@/types/form';
import type {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {SetterOrUpdater} from 'recoil';

export function UseRoute(address: string) {
  const route = useRouter();
  route.push(address);
  return;
}

//기본 음악 업로드
//react-hook-form 폼
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

//file 확인
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

//자막 수정
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
