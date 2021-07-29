import { Modal, Typography, Button } from 'antd';

import { Upload, message } from 'antd';

import { InboxOutlined } from '@ant-design/icons';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

const { Title } = Typography;

const SubmitDocument = ({ request, setRequests, category, setDocuments }) => {
	const uploadUrl = `${process.env.REACT_APP_API_URI}/requests/${request.id}/documents`;

	const token = localStorage.getItem('token');

	const headers = {
		authorization: `Bearer ${token}`
	};

	const onUploadFinish = async (document) => {
		document['status'] = 'verified';

		document['docId'] = document['id'];

		document['category'] = category;

		setDocuments((prevSate) => [ ...prevSate, document ]);

		axiosWithAuth()
			.put(`/documents/${document.id}`, { category, status: 'verified' })
			.then(() => {
				setRequests((prevState) =>
					prevState.map((req) => {
						if (req.id === request.id) {
							req[category].push(document);
						}

						return req;
					})
				);
			})
			.catch((err) => {
				message.error('error updating document category');
			});
	};

	return <Uploader actionUrl={uploadUrl} onFinish={onUploadFinish} headers={headers} />;
};

const Uploader = ({ actionUrl, headers, onFinish }) => {
	const { Dragger } = Upload;

	const props = {
		name: 'document',
		headers: headers,
		multiple: true,
		action: actionUrl,
		onChange(info) {
			const { status } = info.file;
			if (status === 'done') {
				message.success(`Successfully uploaded document`);

				onFinish(info.file.response.documents[0]);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		}
	};

	return (
		<Upload {...props}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				Upload:
				<Button>Click to Upload</Button>
			</div>
		</Upload>
	);
};

export default SubmitDocument;
