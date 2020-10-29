import { SnackStatus } from '../../../core/message-service';
import React, { FC } from 'react';
import { Paper } from '@material-ui/core';

export interface SnackMessageProps {
  status?: SnackStatus;
};

const SnackMessage : FC<SnackMessageProps> = (props) => {
  return (
    <Paper elevation={3}>{props.children}</Paper>
  );
};

export default SnackMessage;