const Requests = require('../../requestsModel');

const Documents = require('../../documents/documentModel');
const checkIfDocumentsAreMissing = require('../../../documents/utils/checkIfAllDocumentsAreSubmitted');

const validateRequestId = async (req, res, next) => {

	const { id } = req.params;

	try {
		const request = await Requests.findById(id);

		if (request.length === 0) {
			return res.status(404).json({ message: `Request with id of ${id} does not exist` });
		}

		next();
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

const checkIfAllDocumentsAreSubmitted = (req, res, next) => {
	const docsMissing = checkIfAllDocumentsAreMissing();

	if (docsMissing) {
	}

	try {
	} catch (error) {}
};

module.exports = { validateRequestId, checkIfAllDocumentsAreSubmitted };
