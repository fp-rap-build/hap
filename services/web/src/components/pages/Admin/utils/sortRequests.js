const sortRequests = requests => {
  let sortedRequests = requests.sort((a, b) => {
    return a['ami'] - b['ami'];
  });

  let subscribed = [];
  let unsubscribed = [];

  sortedRequests.forEach(req => {
    if (req.isSubscribed) {
      subscribed.push(req);
    } else {
      unsubscribed.push(req);
    }
  });

  return [...subscribed, ...unsubscribed];
};

export default sortRequests;

// let sortedRequests;

// let subscribed = [];
// let unsubscribed = [];

// sortedRequests = [...subscribed, ...unsubscribed];
