const db = require('../../../data/db-config');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const findAll = async (query = {}) => await db('users');

const findBy = async (filter) => await db('users').where(filter);

const findRequestsByUserId = (userId) =>
  db('requests as r')
    .join('addresses as a', 'r.addressId', '=', 'a.id')
    .select(
      'r.id',
      'r.familySize',
      'r.monthlyIncome',
      'r.requestStatus',
      'r.requestDate',
      'r.apmApproval',
      'r.pmApproval',
      'r.bookKeeperApproval',
      'r.headAcctApproval',
      'r.orgId',
      'r.adminApproval',
      'a.address',
      'a.zipCode',
      'a.cityName',
      'a.state'
    )
    .where({ userId });

const findById = async (id) => db('users').where({ id }).first('*');

const findByIdAndUpdate = async (id, payload) => {
  if (payload['password']) {
    payload['password'] = await bcrypt.hash(user['password'], 12);
  }
  return await db('users').where({ id }).update(payload).returning('*');
};

const findByIdAndDelete = async (id) => await db('users').where({ id }).del();

const findAddressByUserId = async (id) =>
  await db('users')
    .where('users.id', id)
    .join('addresses', 'users.addressId', '=', 'addresses.id')
    .select(
      'addresses.address',
      'addresses.state',
      'addresses.cityName',
      'addresses.zipCode'
    );

const findOrCreateAddress = async (user) => {
  if (!user.addressId) {
    let address = await db('addresses').insert({}).returning('*');
  }
};

const findSubscriptionsById = (userId) => db('subscriptions').where({ userId });

const updateAddressById = async (addressId, payload) =>
  await db('addresses').where({ id: addressId }).update(payload).returning('*');

const create = async (user) => {
  // Create an empty address for the user and set the addressId

  user['password'] = await bcrypt.hash(user['password'], 12);

  return db('users').insert(user).returning('*');
};

const update = (id, profile) => {
  return db('users').where({ id }).first().update(profile).returning('*');
};

const remove = async (id) => await db('users').where({ id }).del();

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.id).then((profile) => profile);
  if (foundProfile) {
    return foundProfile;
  }

  // Create an empty address for the user and set the addressId

  let newAddress = await db('addresses').insert({}).returning('*');

  profileObj['addressId'] = newAddress[0].id;

  return await create(profileObj).then((newProfile) =>
    newProfile ? newProfile[0] : newProfile
  );
};

const nameFromId = (id) => {
  return db('users as u')
    .select('u.firstName', 'u.lastName')
    .where({ id })
    .first();
};

const findNotificationsById = (userId) =>
  db('userNotifications').where({ userId }).orderBy('createdAt', 'desc');

const readAllNotifications = (userId) =>
  db('userNotifications')
    .where({ userId })
    .update({ seen: true })
    .returning('*');
    
const createPasswordResetToken = async (id) => {
  let resetToken = crypto.randomBytes(32).toString('hex');

  let hashedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  let expiresIn = Date.now() + 20 * 60 * 1000;

  await db('users').where({ id }).update({
    passwordResetToken: hashedResetToken,
    passwordResetExpires: expiresIn,
  });

  return resetToken;
};

module.exports = {
  findAll,
  findBy,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  create,
  update,
  remove,
  findOrCreateProfile,
  findAddressByUserId,
  findOrCreateAddress,
  updateAddressById,
  nameFromId,
  findRequestsByUserId,
  findSubscriptionsById,
  findNotificationsById,
  readAllNotifications,
  createPasswordResetToken,
};
