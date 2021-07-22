const checkIfAllDocumentsInCategoryAreDenied = (docs, category) => {
  let docsByCategory = docs.filter(doc => doc.category === category);

  if (docsByCategory.length === 0) return false;

  let allDenied = true;

  docsByCategory.forEach(doc => {
    if (doc.status !== 'denied') allDenied = false;
  });

  return allDenied;
};

export default checkIfAllDocumentsInCategoryAreDenied;
