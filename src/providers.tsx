'use client';

import { RecoilRoot } from 'recoil';

interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
