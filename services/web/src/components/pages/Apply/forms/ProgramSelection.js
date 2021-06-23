import React, { useState, useEffect } from 'react';

import axios from 'axios';

import CardTitle from '../CardTitle';

import { Divider, Typography, Button, Row, Col, Spin, Card } from 'antd';

// urls

import { SNAP_ERA, SNAP_ERAP, VLP_EDP, LS, OTHER } from '../../../../utils/data/urls';

const { Paragraph, Title } = Typography;

const dsBaseUrl = process.env.REACT_APP_DS_API_URI;

const ProgramSelection = ({ formValues }) => {
  let {
    zipCode,
    cityName,
    familySize,
    totalChildren,
    monthlyIncome,
    unEmp90,
    foodWrkr,
    minorGuest,
    monthlyRent,
    owed,
    amountRequested,
    covidFH,
  } = formValues;

  const [loadStatus, setLoadStatus] = useState(false);
  const [availablePrograms, setAvailablePrograms] = useState({});
  const [programs, setPrograms] = useState([]);

  const fetchPrograms = async () => {
    try {
    } catch (error) {}
  };

  // Only eligible for family promise if no other options are available
  const checkPrograms = async () => {
    // convert bools to '0' or '1'

    const queryString = `?zipCode=${zipCode}&cityName=${cityName}&familySize=${familySize}&totalChildren=${totalChildren}&monthlyIncome=${monthlyIncome}&monthlyRent=${monthlyRent}&owed=${owed}&amountRequested=${amountRequested}&unEmp90=${unEmp90}&foodWrkr=${foodWrkr}&minorGuest=${minorGuest}&covidFH=${covidFH}`;
    const callURL = dsBaseUrl + queryString;
    setLoadStatus(true);
    try {
      const res = await axios.post(callURL);

      setAvailablePrograms(res.data);
    } catch (err) {
      alert('error from DS API');
      console.error(err);
    } finally {
      setLoadStatus(false);
    }
  };

  useEffect(() => {
    checkPrograms();
    // eslint-disable-next-line
  }, []);

  return (
    <Spin spinning={loadStatus} tip="Checking your eligibility...">
      <Card
        title={
          <CardTitle percentage={100} title="Programs You May Qualify For:" />
        }
      >
        <Row>
          <Col span={15}>
            <Paragraph strong={availablePrograms.FP}>
              {' '}
              Family Promise of Spokane : Housing Assistance{' '}
            </Paragraph>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <Button
              type="primary"
              size="medium"
              htmlType="submit"
              disabled={!availablePrograms.FP}
            >
              {availablePrograms.FP ? 'Apply Now' : 'Not Available'}
            </Button>
          </Col>
        </Row>

        <Divider />

        <Row align="middle">
          <Col span={15}>
            <Paragraph strong={availablePrograms.LS}>
              {' '}
              Live Stories : FORWARD Program{' '}
            </Paragraph>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <Button
              href={LS}
              target="_blank"
              type="primary"
              size="medium"
              disabled={!availablePrograms.LS}
            >
              {availablePrograms.LS ? 'More Info' : 'Not Available'}
            </Button>
          </Col>
        </Row>
        <Divider />
        

        <Row>
          <Col span={15}>
            <Paragraph strong={availablePrograms.SNAP_ERAP}>
              {' '}
              Spokane Neighborhood Action Partners (SNAP) : ERA Program{' '}
            </Paragraph>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <Button
              href={SNAP_ERAP}
              target="_blank"
              type="primary"
              size="medium"
              disabled={!availablePrograms.SNAP_ERAP}
            >
              {availablePrograms.SNAP_ERAP ? 'More Info' : 'Not Available'}
            </Button>
          </Col>
        </Row>

        <Divider />
        <Row>
          <Col span={15}>
            <Paragraph strong={availablePrograms.VLP_EDP}>
              {' '}
              NW Mediation Center : Eviction Resolution Program{' '}
            </Paragraph>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <Button
              href={'https://www.nwmediationcenter.com/'}
              target="_blank"
              type="primary"
              size="medium"
              disabled={!availablePrograms.VLP_EDP}
            >
              {availablePrograms.VLP_EDP ? 'More Info' : 'Not Available'}
            </Button>
          </Col>
        </Row>

        <Divider />
        <Row>
          <Col span={15}>
            <Paragraph strong={availablePrograms.VLP_EDP}>
              {' '}
              Volunteer Lawyers Program : Eviction Defense Project{' '}
            </Paragraph>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <Button
              href={VLP_EDP}
              target="_blank"
              type="primary"
              size="medium"
              disabled={!availablePrograms.VLP_EDP}
            >
              {availablePrograms.VLP_EDP ? 'More Info' : 'Not Available'}
            </Button>
          </Col>
        </Row>
        <Divider />

        <Row align="middle">
          <Col span={15}>
            <Paragraph strong={availablePrograms.OTHER}>
              {' '}
              Services and Resources Available in Spokane County: {' '}
            </Paragraph>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <Button
              href={OTHER}
              target="_blank"
              type="primary"
              size="medium"
              disabled={!availablePrograms.OTHER}
            >
              {availablePrograms.OTHER ? 'More Info' : 'Not Available'}
            </Button>
          </Col>
        </Row>
        <Divider />

      </Card>
    </Spin>
  );
};

export default ProgramSelection;
