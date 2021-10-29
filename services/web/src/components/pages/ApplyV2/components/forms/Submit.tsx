import { useState } from 'react';

import { Button } from 'antd';

import { Form, Checkbox, Input } from 'antd';

import { axiosWithAuth } from '../../../../../api/axiosWithAuth';
import { setCurrentUser } from '../../../../../redux/users/userActions';

import { useHistory } from 'react-router-dom';

export default function Submit({
  setErrorMessage,
  request,
  formValues,
  setFormValues,
  dispatch,
}) {
  const history = useHistory();

  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  const handleAdvocateCheckboxChange = e => {
    setFormValues({ ...formValues, advocate: e.target.checked });
  };

  const onAdvocateInfoChange = e => {
    console.log(formValues);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '80%', marginTop: '1rem' }}>
        <h3>
          Thank you for completing all the steps and uploading your documents.
          Please review the final question below. Your request will not be able
          to be processed without granting us persmission to speak to other
          parties involved to verify your information and complete your request
          for Assistance.
        </h3>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: '80%',
          }}
        >
          <br />

          <Form
            layout="vertical"
            onFinish={() => {
              submitApplication(
                request,
                formValues,
                dispatch,
                setErrorMessage,
                setCurrentUser,
                history
              );
            }}
          >
            <Form.Item>
              <Checkbox onChange={handleAdvocateCheckboxChange}>
                Check this box if you are an Advocate completing this request on
                the behalf of somebody else.
              </Checkbox>
            </Form.Item>

            {formValues.advocate && (
              <>
                <Form.Item
                  hasFeedback
                  initialValue={formValues.advocateName}
                  label="Name"
                  name="advocateName"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your full name',
                    },
                  ]}
                >
                  <Input
                    onChange={onAdvocateInfoChange}
                    name="advocateName"
                    placeholder="John Doe"
                  />
                </Form.Item>

                <Form.Item
                  hasFeedback
                  initialValue={formValues.advocateEmail}
                  label="Email"
                  name="advocateEmail"
                  rules={[
                    {
                      type: 'email',
                      required: true,
                      message: 'Please enter a valid email',
                    },
                  ]}
                >
                  <Input
                    onChange={onAdvocateInfoChange}
                    name="advocateEmail"
                    placeholder="example@gmail.com"
                  />
                </Form.Item>

                <Form.Item
                  initialValue={formValues.advocatePhone}
                  hasFeedback
                  label="Phone number"
                  name="advocatePhone"
                  rules={[
                    {
                      type: 'string',
                      required: true,
                      message: 'Please enter a phone number',
                    },
                  ]}
                >
                  <Input
                    onChange={onAdvocateInfoChange}
                    placeholder="(111)-111-1111"
                    name="advocatePhone"
                  />
                </Form.Item>

                <Form.Item
                  hasFeedback
                  initialValue={formValues.advocateOrg}
                  label="Organization"
                  name="advocateOrg"
                >
                  <Input onChange={onAdvocateInfoChange} name="advocateOrg" />
                </Form.Item>
              </>
            )}

            <Form.Item
              required
              rules={[
                {
                  required: true,
                  message:
                    'We cannot process your request without permission to speak to third parties regarding your request.ß',
                },
              ]}
            >
              <Checkbox
                name="advocate"
                onChange={e => setIsCheckboxSelected(e.target.checked)}
              >
                To expedite your application process, Family Promise Rental
                Assistance Team is requesting your permission to speak to any
                person/party (i.e., landlord, mediator, lawyer, etc.) regarding
                your rental assistance request and in obtaining applicable
                documentation for your application. By checking this box and
                pressing the Submit Button, you are consenting to this request.
                <p>
                  <i>
                    * If you do not want to release this information, please
                    contact support@familypromiseofspokane.org to discuss your
                    options further.
                  </i>
                </p>
              </Checkbox>
            </Form.Item>
            <Button
              disabled={!isCheckboxSelected}
              size="large"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const submitApplication = async (
  request,
  formValues,
  dispatch,
  setErrorMessage,
  setCurrentUser,
  history
) => {
  try {
    const advocateInfo = {
      advocateName: formValues.advocateName,
      advocateEmail: formValues.advocateEmail,
      advocatePhone: formValues.advocatePhone,
      advocateOrg: formValues.advocateOrg,
    };

    await axiosWithAuth().put(`/requests/${request.id}`, {
      incomplete: false,
      ...advocateInfo,
    });

    await axiosWithAuth()
      .put('/users/me', { applicationStep: 'completed' })
      .then(res => {
        dispatch(setCurrentUser(res.data.user));
        history.push('/');
      });
      
  } catch (error) {
    alert('Unable to submit request, please report this');
  }
};
