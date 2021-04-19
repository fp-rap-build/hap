import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';
import LoadingComponent from '../../../common/LoadingComponent';

export default function Programs() {
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState([]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <h1>Programs</h1>
    </div>
  );
}
