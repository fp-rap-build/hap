import { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import Comments from '../../../../../common/Comments';

export default function InternalCommentsWrapper({ request }) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [comments, setComments] = useState([]);

  const fetchInternalComments = async () => {
    setLoading(true);
    try {
      let internalComments = await axiosWithAuth()
        .get(`/comments/find/request/${request.id}/category`, {
          category: 'internal',
        })
        .then(res => res.data);

      setComments(internalComments);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => fetchInternalComments(), []);

  if (loading) return <h1>Fetching comments..</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <Comments
      comments={comments}
      setComments={setComments}
      category="internal"
    />
  );
}
