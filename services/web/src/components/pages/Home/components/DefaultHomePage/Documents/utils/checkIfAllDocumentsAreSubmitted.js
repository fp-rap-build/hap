const checkIfAllDocumentsAreSubmitted = documents => {
  let categories = {
    residency: false,
    income: false,
    housingInstability: false,
    covid: false,
    childrenOrPregnancy: false,
    identity: false,
    lease: false,
  };

  documents.forEach(doc => {
    let category = doc.category;

    categories[category] = true;
  });

  for (let key in categories) {
    if (!categories[key]) return false;
  }

  return true;
};

export default checkIfAllDocumentsAreSubmitted;
