export default function builtTableData(statuses) {
  const docDescriptions = [
    {
      category: 'residency',
      title: 'Proof of Residency',
      blurb: 'Document that shows you currently reside within Spokane County.',
      status: statuses.residency ? statuses.residency : 'missing',
    },
    {
      category: 'income',
      title: 'Proof of Income',
      blurb: 'Document that confirms your current Income.',
      status: statuses.income ? statuses.income : 'missing',
    },
    {
      category: 'housingInstability',
      title: 'Proof of Housing Status',
      blurb: 'Proof of risk of homelesssness or housing instability',
      status: statuses.housingInstability
        ? statuses.housingInstability
        : 'missing',
    },
    {
      category: 'covid',
      title: 'COVID-19 Hardship',
      blurb: 'Document showing hardships caused by COVID-19',
      status: statuses.covid ? statuses.covid : 'missing',
    },
  ];

  return docDescriptions;
}
