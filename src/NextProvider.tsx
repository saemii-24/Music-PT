'use client';

import {RecoilRoot} from 'recoil';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({children}: Props) => {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          autoClose={1000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
        {/* <ReactQueryDevtools /> */}
        {children}
      </QueryClientProvider>
    </RecoilRoot>
  );
};
