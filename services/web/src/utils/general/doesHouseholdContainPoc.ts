const doesHouseholdContainPoc = request => {
  const { hispanic, asian, black, pacific, native } = request;

  if (hispanic || asian || black || pacific || native) return true;

  return false;
};

export default doesHouseholdContainPoc;
