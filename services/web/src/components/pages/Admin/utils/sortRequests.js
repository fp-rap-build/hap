const sortRequests = requests => {
  let sortedRequests = requests.sort((a, b) => {
    return a['ami'] - b['ami'];
  });

  return sortedRequests;
};

export default sortRequests;

// let sortedRequests;

// let subscribed = [];
// let unsubscribed = [];

// requests.forEach(req => {
//   if (req.isSubscribed) {
//     subscribed.push(req);
//   } else {
//     unsubscribed.push(req);
//   }
// });

// sortedRequests = [...subscribed, ...unsubscribed];
