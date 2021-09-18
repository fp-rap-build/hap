import { useState } from 'react';

const SmartyStreetsSDK = require('smartystreets-javascript-sdk');
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocompletePro.Lookup;

let key = process.env.REACT_APP_SMARTY_KEY;

const credentials = new SmartyStreetsCore.SharedCredentials(key);

let clientBuilder = new SmartyStreetsCore.ClientBuilder(
  credentials
).withLicenses(['us-autocomplete-pro-cloud']);

let client = clientBuilder.buildUsAutocompleteProClient();

const useAddressAutoSuggestions = initialState => {
  const [autosuggestions, setAutosuggestions] = useState(initialState);

  const handleAddressChange = address => {
    if (!address) return;

    // Documentation for input fields can be found at.
    // https://smartystreets.com/docs/us-street-api#input-fields

    let lookup = new Lookup(address);

    lookup.maxResults = 5;
    lookup.preferStates = ['WA'];

    client
      .send(lookup)
      .then(function(results) {
        setAutosuggestions(results.result);
      })
      .catch(console.log);
  };

  return [autosuggestions, handleAddressChange];
};

export default useAddressAutoSuggestions;
