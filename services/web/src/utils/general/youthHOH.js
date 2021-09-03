const youthHOH = dob => {
  function getAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  let age = getAge(dob);

  let youth = age < 25 ? 'Yes' : 'No';

  return youth;
};

export default youthHOH;
