const parseAddress = str => {
  str = str.split(',');

  let address = str[0].trim();
  let cityName = str[1].trim();
  let state = str[2].trim();
  let zipCode = str[3].trim();

  return [address, cityName, state, zipCode];
};

export default parseAddress;
