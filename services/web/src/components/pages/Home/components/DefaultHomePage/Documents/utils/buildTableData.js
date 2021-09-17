export default function builtTableData(statuses) {
  const docDescriptions = [
    {
      key: 'childrenOrPregnancy',
      category: 'childrenOrPregnancy',
      title: 'Proof of Children/Minors or Pregnancy',
      blurb:
        'Award letter from government agency with child’s name included as part of the household (TANF, Food benefits, SSI/SSA) , a School enrollment form, or proof of pregnancy.',
      status: statuses.childrenOrPregnancy
        ? statuses.childrenOrPregnancy
        : 'missing',
      selfDecDisabled: true,
    },
    {
      key: 'residency',
      category: 'residency',
      title: 'City of Spokane City residency',
      blurb:
        'At least one of the following: a. Driver’s license/ State ID with Spokane city address,  b. Work or school ID,  c. Public benefit award letter  ( Supplemental Nutrition assistance Program (SNAP) award letter or Temporary Assistance for Needy Families (TANF) award letter),  d. Utility bill,   e. Lease agreement, f. Other reasonable sources ',
      status: statuses.residency ? statuses.residency : 'missing',
      selfDecDisabled: true,
    },
    {
      key: 'identity',
      category: 'identity',
      title: 'Proof of identity',
      blurb:
        'At least one of the following: a. Driver’s license/ State ID with Spokane city address,  b. Work or school ID,  c. Public benefit award letter  ( Supplemental Nutrition assistance Program (SNAP) award letter or Temporary Assistance for Needy Families (TANF) award letter),  d. Utility bill,   e. Lease agreement, f. Other reasonable sources ',
      status: statuses.identity ? statuses.identity : 'missing',
      selfDecDisabled: true,
    },
    {
      key: 'lease',
      category: 'lease',
      title: 'Lease agreement',
      blurb:
        'How to document: Current Lease (MUST INCLUDE All:  Where the applicant resides, Rental payment amount and Tenant and landlord signature.',
    },
    {
      status: statuses.lease ? statuses.lease : 'missing',
      selfDecDisabled: false,
    },
    {
      key: 'income',
      category: 'income',
      title: 'Proof of all gross income for the last sixty (60) days',
      blurb:
        'Acceptable documents include: a. Current year Social Security award letters, b. Pay Stubs, c. Self-Employment Ledger, d. Child Support, e. Other sources of income',
      status: statuses.income ? statuses.income : 'missing',
      description: '',
      selfDecDisabled: false,
    },
    {
      key: 'housingInstability',
      category: 'housingInstability',
      title: 'Proof of Rent Owed',
      blurb:
        'One or more individuals in the household must demonstrate a risk of experiencing homelessness or currently experiencing housing instability. This must be documented and may include: A past due utility notice or eviction notice, or Statement from the landlord that verifies the household’s housing instability (currently late on rent and/or has rental arrears).',
      status: statuses.housingInstability
        ? statuses.housingInstability
        : 'missing',
      selfDecDisabled: false,
    },
    {
      key: 'covid',
      category: 'covid',
      title: 'Proof of financial impact caused by COVID 19 pandemic',
      blurb:
        'Acceptable Documents include: a. Letter from employer showing termination of employment or reduced hours, b. Medical documentation from a doctor, c. Childcare costs that were paid',
      status: statuses.covid ? statuses.covid : 'missing',
      selfDecDisabled: false,
    },
  ];

  return docDescriptions;
}
