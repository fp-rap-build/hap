import { useEffect, useState } from 'react';

import { Menu, Dropdown, message, Spin, Space, Form } from 'antd';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { LoadingOutlined, EllipsisOutlined } from '@ant-design/icons';
import checkIfAllDocumentsInCategoryAreDenied from '../../../../../Home/components/DefaultHomePage/Documents/utils/checkIfAllDocumentsInCategoryAreDenied';

export default function Category({ document, setRequests, setDocuments }) {
	const { status: docStatus, requestId, docId, category: docCategory } = document;

	const [ category, setCategory ] = useState(docCategory);

	const [ loading, setLoading ] = useState(false);

	const handleButtonClick = () => {
		if (category === docCategory) return;

		setLoading(true);

		axiosWithAuth()
			.put(`/documents/${docId}`, { category })
			.then((res) => {
				setDocuments((prevState) => prevState.filter((doc) => doc.docId !== docId));
                
				setRequests((prevState) =>
					prevState.map((req) => {
						if (req.id === requestId) {
							document['category'] = category;

							req[category].push(document);

							req[docCategory] = req[docCategory].filter((doc) => {
								if (doc.docId !== docId) {
									return doc;
								}
							});
						}

						return req;
					})
				);
			})
			.catch((err) => alert('Massive failure'))
			.finally(() => setLoading(false));
	};

	const handleMenuClick = (e) => {
		setCategory(e.key);
	};

	useEffect(
		() => {
			setCategory(document.category);
		},
		[ document ]
	);

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="childrenOrPregnancy">Children</Menu.Item>
			<Menu.Item key="residency">Residency</Menu.Item>
			<Menu.Item key="income">income</Menu.Item>
			<Menu.Item key="housingInstability">Housing Instability</Menu.Item>
			<Menu.Item key="covid">Covid</Menu.Item>
		</Menu>
	);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			Category:
			<Dropdown.Button
				style={{ marginBottom: '1rem' }}
				icon={loading ? <LoadingOutlined /> : <EllipsisOutlined />}
				onClick={handleButtonClick}
				overlay={menu}
			>
				{camelCaseToSentenceCase(category)}
			</Dropdown.Button>
		</div>
	);
}

const camelCaseToSentenceCase = (text) => {
	const result = text.replace(/([A-Z])/g, ' $1');
	const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

	return finalResult;
};
