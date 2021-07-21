const checkIfDocumentsHaveDeniedCategories = (requestDocs) => {
  let hasDeniedCategories = false;

  let docChecks = {
    childrenOrPregnancy: false,
    residency: false,
    income: false,
    housingInstability: false,
    covid: false,
  };

  let docsGroupedByCategory = {
    childrenOrPregnancy: [],
    residency: [],
    income: [],
    housingInstability: [],
    covid: [],
  };

  requestDocs.forEach((doc) => {
    if (doc.category in docChecks) {
      docsGroupedByCategory[doc.category].push(doc);
    }
  });

  for (let category in docsGroupedByCategory) {
    let documents = docsGroupedByCategory[category];

    if (documents.length === 0) continue;

    let allDocsInCategoryDenied = true;

    documents.forEach((doc) => {
      if (doc.status !== 'denied') {
        allDocsInCategoryDenied = false;
      }
    });

    if (allDocsInCategoryDenied) {
      hasDeniedCategories = true;
    }
  }

  return hasDeniedCategories;
};

module.exports = checkIfDocumentsHaveDeniedCategories;
