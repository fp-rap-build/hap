const checkIfDocumentsAreMissing = (docs) => {
  categories = {
    residency: false,
    income: false,
    housingInstability: false,
    covid: false,
    childrenOrPregnancy: false,
  };

  docs.forEach((doc) => (categories[doc.category] = true));

  let docsMissing = Object.values(categories).some((value) => value === false);

  return docsMissing;
};

module.exports = checkIfDocumentsAreMissing;
