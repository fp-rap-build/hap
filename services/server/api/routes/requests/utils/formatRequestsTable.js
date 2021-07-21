// Merges all the documents into a single array

const formatRequestsTable = (requests) => {
  const formattedRequests = [];

  let idx = 0;

  let currentIdx = 0;

  while (idx < requests.length) {
    let request = requests[idx];

    if (requests[currentIdx].id !== requests[idx].id) {
      formattedRequests.push(requests[currentIdx]);

      requests[currentIdx].category = undefined;
      requests[currentIdx].location = undefined;
      requests[currentIdx].status = undefined;
      requests[currentIdx].docId = undefined;
      requests[currentIdx].type = undefined;

      currentIdx = idx;
    }

    if (!requests[currentIdx]['documents']) {
      requests[currentIdx]['documents'] = [];
    }

    if (requests[currentIdx].category) {
      requests[currentIdx]['documents'].push({
        docId: request.docId,
        requestId: request.id,
        category: request.category,
        status: request.status,
        location: request.location,
        type: request.type,
      });
    }

    if (idx === requests.length - 1) {
      formattedRequests.push(requests[currentIdx]);
    }

    idx += 1;
  }

  return formattedRequests;
};

module.exports = formatRequestsTable;
