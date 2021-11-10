import React from 'react';

import { DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const customFormat = value => `custom format: ${value.format(dateFormat)}`;

const customWeekStartEndFormat = value =>
  `${moment(value)
    .startOf('week')
    .format(weekFormat)} ~ ${moment(value)
    .endOf('week')
    .format(weekFormat)}`;

export default function DateInput({ props }) {
  return (
    <DatePicker
      {...props}
      defaultValue={moment('01/01/2015', dateFormatList[0])}
      format={dateFormatList}
    />
  );
}
