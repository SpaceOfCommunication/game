import { Button, Dialog, DialogTitle, makeStyles } from '@material-ui/core';
import { DialogData } from '../../../core/dialog-service';
import React, { FC } from 'react';

const useStyles = makeStyles({
  root: {
    padding: '10px 40px'
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  }
});

const DialogConfirm: FC<DialogData> = (props) => {
  const { title, message, onConfim, onClose } = props;
  const classes = useStyles();
  
  return (
    <Dialog open={!!title}>
      <div className={classes.root}>
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        <div>{message}</div>
        <div className={classes.buttonsWrapper}>
          <Button onClick={() => onConfim && onConfim()}>Удалить</Button>
          <Button onClick={() => onClose && onClose()} color="primary">Отмена</Button>
        </div>
      </div>
  </Dialog>
  )
}

export default DialogConfirm;