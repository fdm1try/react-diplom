import React from 'react'
import { MainTemplate } from './MainTemplate';
import { Banner } from '../../components/Banner';

export interface IWithBanner {
  children?: React.ReactNode;
}

export const WithBanner: React.FC<IWithBanner> = ({ children }) => {
  return (
    <MainTemplate>
      <Banner />
      {children}
    </MainTemplate>
  )
}
