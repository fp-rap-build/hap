import React from 'react';

export default function Watermark() {
  return (
    <div style={{ position: 'fixed', zIndex: 3, bottom: '4%', left: '1%' }}>
      <a href="http://www.familypromiseofspokane.org/" target="_blank">
        Powered by Family Promise of Spokane
      </a>
    </div>
  );
}
