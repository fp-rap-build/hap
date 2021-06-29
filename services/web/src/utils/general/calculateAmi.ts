const calculateAmi = (monthlyIncome, familySize) => {
  var amiList = {
    '1': 3613,
    '2': 4129,
    '3': 4646,
    '4': 5158,
    '5': 5575,
    '6': 5988,
    '7': 6400,
    '8': 6812,
    '9': 7000,
    '10': 8000,
    '11': 9000,
  };
  let ami = Number((monthlyIncome / amiList[familySize]) * 100).toFixed(2);

  return ami;
};

export default calculateAmi;
