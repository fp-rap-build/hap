const calculateAmi = monthlyIncome => {
  let ami = Number(((monthlyIncome * 12) / 71700).toFixed(2)) * 100;

  return ami;
};

export default calculateAmi;
