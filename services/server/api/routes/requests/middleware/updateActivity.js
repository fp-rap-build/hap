const Request = require('../requestsModel');

const updateActivity = async (req, res, next) => {
	if (!req.user || !req.params.id) return next();

	const { role } = req.user;

	const { id } = req.params;

	try {
		if (role === 'tenant') {
			await Request.update(id, { latestTenantActivity: new Date() });
		} else {
			await Request.update(id, { latestStaffActivity: new Date() });
		}
	} catch (error) {
		console.log(error);
	} finally {
		// This middleware isn't a priority. If it fails, I still want the other mw's to be called
		next();
	}
};

module.exports = updateActivity;
