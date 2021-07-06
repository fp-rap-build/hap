//NO LONGER BEING USED - FUNCTIONALITY DUPLICATED AND RUNNING ON SERVER AS DOC MIDDLEWARE

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

const checkDocumentCompletion = async (tableData, request) => {
  try {
    for (let i = 0; i < 4; i++) {
      const { status } = tableData[i];

      if (status === 'received' || status === 'optOut') {
        continue;
      } else {
        return;
      }
    }

    if (
      request.requestStatus === 'documentsNeeded' ||
      request.requestStatus === 'inReview'
    ) {
      //verifyingDocuments
      await axiosWithAuth().put(`/requests/${request.id}`, {
        requestStatus: 'verifyingDocuments',
        incomplete: false,
      });
    }
  } catch (error) {
    alert('DOC CHECK ERROR');
  }
};

export default checkDocumentCompletion;
