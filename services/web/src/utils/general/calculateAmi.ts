const calculateAmi = monthlyIncome => {
  let ami = Number(((monthlyIncome * 12) / 71700) * 100).toFixed(2);

  return ami;
};

export default calculateAmi;
