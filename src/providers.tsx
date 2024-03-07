'use client';

import {RecoilRoot} from 'recoil';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

interface Props {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();

export const NextProvider = ({children}: Props) => {
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {children}
          <ToastContainer
            autoClose={1000}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
          />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
      ;
    </>
  );
};
