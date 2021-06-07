import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';
import RequestsTable from '../../../../../Admin/components/RequestsTable';

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
      });
    }
  } catch (error) {
    console.log(error);
    alert('DOC CHECK ERROR');
  }
};

export default checkDocumentCompletion;
