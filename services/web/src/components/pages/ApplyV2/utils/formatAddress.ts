const formatAddress = address => {
  return `${address.streetLine}, ${address.city}, ${address.state}, ${address.zipcode}`;
};

export default formatAddress;
