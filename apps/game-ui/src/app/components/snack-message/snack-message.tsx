import { SnackStatus } from '../../../core/message-service';
import React, { FC } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { GREEN_COLOR, RED_COLOR } from '../../../core/styles';

export interface SnackMessageProps {
  status?: SnackStatus;
};

const useStyles = makeStyles({
  root: {
    padding: '20px',
    fontSize: '150%',
  },
  success: {
    color: GREEN_COLOR,
  },
  error: {
    color: RED_COLOR
  }
});

const SnackMessage : FC<SnackMessageProps> = (props) => {
  const { children, status } = props;
  const classes = useStyles();
  let messageClasses = classes.root;
  if (status === 'success') {
    messageClasses = `${messageClasses} ${classes.success}`;
  } else if (status === 'error') {
    messageClasses = `${messageClasses} ${classes.error}`;
  }
  
  return (
    <Paper className={messageClasses} elevation={3}>{children}</Paper>
  );
};

export default SnackMessage;