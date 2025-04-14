import React from 'react';
import NextHeader from './NextHeader';
import NextFooter from './NextFooter';

export default function Layout({ children }) {
  return (
    <>
      <NextHeader />
      <main>{children}</main>
      <NextFooter />
    </>
  );
}