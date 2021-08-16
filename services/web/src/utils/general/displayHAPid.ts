const createHAPid = (requestId) => {
    
    
    let hapID = (String(`HAP` + String(requestId))).substr(0, 20);
  
    return hapID;
  };
  
  export default createHAPid;
  