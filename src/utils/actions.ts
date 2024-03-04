// import {createClient} from '@/supabase/client';
// import {PrismaClient} from '@prisma/client';

import {FormEvent} from 'react';

// export async function handleSubmit(
//   formData: FormData,
//   e: Event,
// ): Promise<void> {
//   e.preventDefault();

//   const prisma = new PrismaClient();
//   const supabase = createClient();

//   const singer = formData.get('singer') as string;
//   const thumbnail = formData.get('thumbnail') as File;

//   const {data: thumbnailData, error} = await supabase.storage
//     .from('thumbnail')
//     .upload(`${thumbnail.name}-${new Date()}`, thumbnail, {
//       cacheControl: '259200',
//     });

//   if (error) {
//     console.error('Error uploading image to Supabase:', error.message);
//     return;
//   }

//   // Update home information in the database
//   const updatedHome = await prisma.post.update({
//     where: {
//       id: homeId,
//     },
//     data: {
//       singer: singer,
//       thumbnail: thumbnailData?.path,
//     },
//   });

//   console.log('Home information updated:', updatedHome);
// }

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append('title', singer);
  formData.append('preview_image', fileRef.current.files[0]);

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (data.id) router.push(`/posts/${data.id}`);
};
