'use client';

import {createClient} from '@/supabase/client';
import axios from 'axios';
import React from 'react';
import {useForm} from 'react-hook-form';

interface FormData {
  singer: string;
  thumbnail: FileList;
}

const Test = () => {
  const {register, handleSubmit} = useForm<FormData>();

  async function onSubmit(formData: FormData) {
    const supabase = createClient();
    const {singer, thumbnail} = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('singer', singer);
    formDataToSend.append('thumbnail', thumbnail[0]);

    const {data, error} = await supabase.storage
      .from('thumbnail')
      .upload('public/avatar1.png', thumbnail[0], {
        cacheControl: '3600',
        upsert: false,
      });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-2'>
          <input
            type='text'
            id='singer'
            className='block w-[100%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-music-blue sm:text-sm sm:leading-6'
            {...register('singer')}
          />
        </div>
        <input type='file' {...register('thumbnail')} />
        <button type='submit'>제출하기</button>
      </form>
    </div>
  );
};

export default Test;
