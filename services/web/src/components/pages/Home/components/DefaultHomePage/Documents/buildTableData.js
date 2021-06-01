export default function builtTableData(statuses) {
  const { residency, income, housingInstability, covid } = statuses;

  const docDescriptions = [
    {
      category: 'residency',
      title: 'Proof of Residency',
      blurb: 'Document that shows you currently reside within Spokane County.',
      status: residency,
    },
    {
      category: 'income',
      title: 'Proof of Income',
      blurb: 'Document that confirms your current Income.',
      status: income,
    },
    {
      category: 'housingInstability',
      title: 'Proof of Housing Status',
      blurb: 'Proof of risk of homelesssness or housing instability',
      status: housingInstability,
    },
    {
      category: 'covid',
      title: 'COVID-19 Hardship',
      blurb: 'Document showing hardships caused by COVID-19',
      status: covid,
    },
    // { category: 'other', title: 'Additional Documents', blurb: '' },
  ];

  return docDescriptions;
}
