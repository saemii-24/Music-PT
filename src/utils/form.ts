import {FormValues} from '@/types/form';
import {createClient} from '@/supabase/client';
import axios from 'axios';

//react-hook-form 폼
export const onSubmit = async (data: FormValues) => {
  console.log(data);
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
    } else {
      const {data: uploadUrl} = await supabase.storage
        .from('thumbnail')
        .getPublicUrl(uploadData!.path);

      console.log(uploadUrl.publicUrl);
      fileUrl = uploadUrl.publicUrl;
      data.thumbnailUrl = fileUrl;
    }
  }
  //파일 url로 변경 완료, api에 post 요청
  try {
    const response = await axios.post('/api/music', data);
    console.log(response);
  } catch (err) {
    console.error('에러가 발생했습니다: ', err);
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
