const upload = require('../utils');
const Documents = require('../documentModel');
const dbConfig = require('../../../../../data/db-config');
const { request } = require('../../../../app');

const multiUpload = upload.array('document');

const createDocument = async (req, res) => {
  multiUpload(req, res, async (err) => {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: 'Image Upload Error',
          detail: err.message,
          error: err,
        },
      });
    }
    // Document was successfully saved to the S3 bucket, let's store a reference to that document in our db

    try {
      // Format documents to match our schema
      let formattedDocuments = req.files.map((file) =>
        formatFile(file, req.params.id)
      );

      let documents = await Documents.save(formattedDocuments);

      res.status(200).json({ documents });

      console.log(documents);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Unable to submit document to database' });
    }
  });
};

const formatFile = (file, requestId) => {
  return {
    requestId: requestId,
    name: file.originalname,
    type: file.mimetype,
    location: file.location,
    key: file.key,
  };
};

module.exports = createDocument;
