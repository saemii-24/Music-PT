'use client';

import {RecoilRoot} from 'recoil';
import {ToastContainer, toast} from 'react-toastify';
interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({children}: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
