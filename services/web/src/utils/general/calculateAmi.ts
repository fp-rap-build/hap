const calculateAmi = (monthlyIncome, familySize) => {
  var amiMonthly = 6425;

  var factorList = {
    '1': 0.7,
    '2': 0.8,
    '3': 0.9,
    '4': 1,
    '5': 1.08,
    '6': 1.16,
    '7': 1.24,
    '8': 1.32,
    '9': 1.4,
    '10': 1.48,
    '11': 1.56,
  };

  let ami = Number(
    (monthlyIncome / (factorList[familySize] * amiMonthly)) * 100
  ).toFixed(2);

  return ami;
};

export default calculateAmi;
