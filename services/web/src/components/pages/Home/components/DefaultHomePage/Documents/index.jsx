import DocumentField from './DocumentField';
import DocumentUploader from './DocumentUploader';

const docDescriptions = [
  {
    category: 'residency',
    title: 'Proof of Residency',
    blurb: 'Document that shows you currently reside within Spokane County.',
  },
  {
    category: 'income',
    title: 'Proof of Income',
    blurb: 'Document that confirms your current Income.',
  },
  {
    category: 'housingInstability',
    title: 'Proof of Housing Status',
    blurb: 'Proof of risk of homelesssness or housing instability',
  },
  {
    category: 'covid',
    title: 'COVID-19 Hardship',
    blurb: 'Document showing hardships caused by COVID-19',
  },
  // { category: 'other', title: 'Additional Documents', blurb: '' },
];

//If they opt out pop out a modal that reads the form with a I Acknowledge etc. etc
// toggle status to optOut
//If docs good toggles status to received
//------------------------------------------------
//For status/ category trackingn handle on FE
//Write a list of the four categories - get all docs for the request
// show x/4 received, x/4 optOut, x/4 missing

export default function Index({ request }) {
  return (
    <div className="documentsContainer">
      {docDescriptions.map(description => (
        <DocumentField
          category={description.category}
          title={description.title}
          blurb={description.blurb}
        />
      ))}
    </div>
  );
}
