// Place any components you want to persist accross all pages

import React from 'react';

import Navbar from './components/Navbar';

import Zendesk from 'react-zendesk';

var y = 1;

const setting = {
  color: {
    theme: '#004477',
  },
  launcher: {
    chatLabel: {
      'en-US': 'Need Help?',
    },
  },
  contactForm: {
    fields: [
      { id: 'description', prefill: { '*': 'My pre-filled description' } },
    ],
  },
};

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


