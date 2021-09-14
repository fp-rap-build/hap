const SmartyStreetsSDK = require('smartystreets-javascript-sdk');
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;

// for Server-to-server requests, use this code:
//let authId = process.env.SMARTY_AUTH_ID;
//let authToken = process.env.SMARTY_AUTH_TOKEN;
//const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code
let key = process.env.REACT_APP_SMARTY_KEY;

const credentials = new SmartyStreetsCore.SharedCredentials(key);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smartystreets.com/docs/cloud/licensing

export default function verifyAddress(address, city, state, zipCode) {
  let clientBuilder = new SmartyStreetsCore.ClientBuilder(
    credentials
  ).withBaseUrl('https://us-street.api.smartystreets.com/street-address');

  let client = clientBuilder.buildUsStreetApiClient();

  // Documentation for input fields can be found at:
  // https://smartystreets.com/docs/us-street-api#input-fields

  let lookup = new Lookup();
  lookup.street = address;
  lookup.city = city;
  lookup.state = state;
  lookup.zipCode = zipCode;

  client
    .send(lookup)
    .then(handleSuccess)
    .catch(handleError);
}

function handleSuccess(response) {
  response.lookups.map(lookup => console.log(lookup.result));
}

function handleError(response) {
  console.log(response);
}
