/* eslint-disable react-hooks/exhaustive-deps */
import { CatalogWidget } from '../components/CatalogWidget';
import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { WithBanner } from './templates';

export const CatalogPage = () => {
  const location = useLocation();
  const catalogWidgetRef = React.createRef<HTMLElement>();

  useEffect(() => {
    if (location.state?.searchQuery) {
      setTimeout(() => catalogWidgetRef.current?.scrollIntoView(), 200);
    }
  }, [location.state]);  

  return (
    <WithBanner>
      <CatalogWidget ref={catalogWidgetRef} withSearch={true} searchQuery={location.state?.searchQuery || undefined} />
    </WithBanner>
  )
}
