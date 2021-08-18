import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import GavelIcon from '@material-ui/icons/Gavel';

export default function Action({ onClick, children }) {
  return <IconButton onClick={onClick}>{children}</IconButton>;
}
