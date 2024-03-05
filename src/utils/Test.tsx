'use client';

import {createClient} from '@/supabase/client';
// import {supabase} from '@/utils/supabase';
import React, {FormEvent, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import FormTest from './FormTest';

interface FormData {
  singer: string;
  thumbnail: FileList;
}

const Test = () => {
  // const {register, handleSubmit} = useForm<FormData>();
  const [file, setFile] = useState<File>();

  const handleChangeFile = (e: any) => {
    if (e.target.files.length !== 0) {
      setFile(e.target.files[0]);
    }
    console.log(file);
  };

  const handleSubmit = async (event: any) => {
    const supabase = createClient();
    event.preventDefault();

    let fileName = new Date().getTime();
    console.log(fileName);
    console.log(file);

    if (file) {
      const {data: uploadData, error} = await supabase.storage
        .from('thumbnail')
        .upload(`image_${fileName}`, file);

      const {data: uploadUrl} = await supabase.storage
        .from('thumbnail')
        .getPublicUrl(uploadData!.path);

      console.log(uploadUrl.publicUrl);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          id='thumbnail'
          onChange={(e) => {
            handleChangeFile(e);
          }}
        />
        <button type='submit'>제출하기</button>
      </form>
      <FormTest />
    </div>
  );
};

export default Test;
