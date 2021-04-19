const isChecklistCompleted = checklist => {
  for (let key in checklist) {
    let unChecked = !checklist[key];
    if (unChecked) {
      return false;
    }
  }
  return true;
};

export default isChecklistCompleted;
