// Place any components you want to persist accross all pages

import React from 'react';

import Navbar from './components/Navbar';

import Watermark from './components/Watermark';

export default function index({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Watermark />
    </div>
  );
}
