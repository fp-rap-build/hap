import { useEffect, useState } from 'react';

import { Menu, Dropdown, message, Spin, Space } from 'antd';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { LoadingOutlined, EllipsisOutlined } from '@ant-design/icons';
import checkIfAllDocumentsInCategoryAreDenied from '../../../../../Home/components/DefaultHomePage/Documents/utils/checkIfAllDocumentsInCategoryAreDenied';

export default function Status({ document, setRequests }) {
	const { status: docStatus, requestId, docId, category } = document;

	const [ status, setStatus ] = useState(docStatus);

	const [ loading, setLoading ] = useState(false);

	const handleButtonClick = () => {
		if (status === docStatus) return;

		setLoading(true);
		axiosWithAuth()
			.put(`/documents/${docId}/status`, { status })
			.then(() => {
				message.success(`Successfully updated document status to ${status}`);

				setRequests((prevState) =>
					prevState.map((request) => {
						if (request.id === requestId) {
							request[category] = request[category].map((doc) => {
								if (doc.docId == docId) {
									doc.status = status;
								}
								return doc;
							});
						}

						return request;
					})
				);
			})
			.catch(() => message.error('Unable to update status'))
			.finally(() => setLoading(false));
	};

	const handleMenuClick = (e) => {
		setStatus(e.key);
	};

	useEffect(
		() => {
			setStatus(document.status);
		},
		[ document ]
	);

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="verified">Verified (Ok)</Menu.Item>
			<Menu.Item key="actionsRequired">Actions Required</Menu.Item>
			<Menu.Item key="denied">{<p style={{ color: 'red' }}>Denied</p>}</Menu.Item>
		</Menu>
	);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			Status:
			<Dropdown.Button
				style={{ marginBottom: '1rem' }}
				icon={loading ? <LoadingOutlined /> : <EllipsisOutlined />}
				onClick={handleButtonClick}
				overlay={menu}
			>
				{camelCaseToSentenceCase(status)}
			</Dropdown.Button>
		</div>
	);
}

const camelCaseToSentenceCase = (text) => {
	const result = text.replace(/([A-Z])/g, ' $1');
	const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

	return finalResult;
};
