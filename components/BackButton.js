'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === '/') {
    return null;
  }

  return (
    <div className="container page-back-button-wrap">
      <button
        onClick={() => router.back()}
        className="back-button"
        aria-label="Go back to previous page"
      >
        <FaArrowLeft /> <span>Back</span>
      </button>
    </div>
  );
};

export default BackButton;
