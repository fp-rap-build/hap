// Place any components you want to persist accross all pages

import React from 'react';

import Navbar from './components/Navbar';

export default function index({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <div>
        <a href="http://www.familypromiseofspokane.org/">
          Powered by Family Promise of Spokane
        </a>
      </div>
    </div>
  );
}
