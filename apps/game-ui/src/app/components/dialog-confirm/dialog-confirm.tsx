import { Button, Dialog, DialogTitle } from '@material-ui/core';
import { DialogData } from '../../../core/dialog-service';
import React, { FC } from 'react';

const DialogConfirm: FC<DialogData> = (props) => {
  const { title, message, onConfim, onClose } = props;
  
  return (
    <Dialog open={!!title}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <div>{message}</div>
      <div>
        <Button onClick={() => onConfim && onConfim()} color="secondary">Удалить</Button>
        <Button onClick={() => onClose && onClose()} color="primary">Отмена</Button>
      </div>
  </Dialog>
  )
}

export default DialogConfirm;