import React from 'react';

import { useParams } from 'react-router-dom';

export default function Index() {
  const { resetToken } = useParams();

  return (
    <div>
      <h1>Reset Password {resetToken}</h1>
    </div>
  );
}
