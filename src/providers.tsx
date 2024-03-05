'use client';

import {RecoilRoot} from 'recoil';

import {ToastContainer} from 'react-toastify';

interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({children}: Props) => {
  return (
    <>
      <RecoilRoot>
        {children}
        <ToastContainer
          autoClose={1000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
      </RecoilRoot>
      ;
    </>
  );
};
