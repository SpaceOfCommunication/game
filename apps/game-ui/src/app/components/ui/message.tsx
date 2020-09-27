import { Typography } from '@material-ui/core';
import React from 'react';

const Message = (props) => {
  return <Typography variant="h5" align="center" color="textSecondary" paragraph>
    {props.children}
  </Typography>
}

export default Message;