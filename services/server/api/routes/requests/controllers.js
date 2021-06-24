const Requests = require('../requests/requestsModel');

const Addresses = require('../addresses/addr-model');

const Ages = require('../ages/agesModel');

const Comments = require('../comments/commentsModel');

const Users = require('../users/userModel');

exports.createRequest = async (req, res, next) => {
  try {
    const request = req.body;

    // Create a new address
    const addressInfo = request['address'] || {};

    const address = await Addresses.create(addressInfo);

    // Default to the current users ID if one isn't specified
    request['userId'] = request['userId'] || req.user.id;

    // Link the new address to the request
    request['addressId'] = address[0].id;

    // Remove the address before saving to db
    delete request['address'];

    // Create entry in age for head of household
    await Ages.create({ userId: req.user.id, role: 'headOfHousehold' });

    //Create age entries for children
    for (let i = 0; i < request.totalChildren; i++) {
      await Ages.create({ userId: req.user.id, role: 'child' });
    }

    const newRequest = await Requests.create(request);

    // Generate initital comment
    const commentPayload = {
      requestId: newRequest[0].id,
      authorId: null,
      comment: 'Initial comment',
      category: 'external',
    };

    // Find a user to attach the comment to..
    let email =
      process.env.NODE_ENV === 'production'
        ? 'jwylie@familypromiseofspokane.org'
        : 'admin@gmail.com';

    let user = await Users.findBy({ email });

    // Create comment
    commentPayload.authorId = user[0].id;

    console.log(commentPayload);

    await Comments.create(commentPayload);

    res.status(200).json(newRequest[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
