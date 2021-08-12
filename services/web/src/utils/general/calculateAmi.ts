const calculateAmi = (monthlyIncome, familySize) => {
  var amiList = {
    '1': 3600,
    '2': 4167,
    '3': 4629,
    '4': 5142,
    '5': 5554,
    '6': 5967,
    '7': 6379,
    '8': 6787,
    '9': 7200,
    '10': 7613,
    '11': 8025,
  };

  var amiMonthly = 6425;

  var factorList = {
    '1': .7,
    '2': .8,
    '3': .9,
    '4': 1,
    '5': 1.08,
    '6': 1.16,
    '7': 1.24,
    '8': 1.32,
    '9': 1.4,
    '10': 1.48,
    '11': 1.56,
  };
  
  let ami = Number((monthlyIncome / (factorList[familySize] * amiMonthly)) * 100).toFixed(2);

  return ami;
};

export default calculateAmi;
