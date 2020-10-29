import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, makeStyles } from '@material-ui/core';
import React, { FC } from "react";
import { useCommonStyles } from '../../../core/styles';

const useComponentStyles = makeStyles({
  form: {
    width: '600px',
  },
  actionButton: {
    marginTop: '25px',
  },
  field: {
    margin: '8px 0px',
  }
});

const LoginForm: FC = () => {
  const classes = useCommonStyles();
  const componentClasses = useComponentStyles();

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12} className={classes.gridItem} >
        <h1>Вход</h1>
      </Grid>
      <form className={componentClasses.form}>
        <FormControl fullWidth required>
          <InputLabel htmlFor="email">Логин</InputLabel>
          <Input id="email" aria-describedby="login-helper-text" />
          <FormHelperText id="login-helper-text">Пожалуйста укажите свой email</FormHelperText>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <Input id="password" type="password" aria-describedby="password-helper-text" />
          <FormHelperText id="password-helper-text">Придумайте пароль</FormHelperText>
        </FormControl>
        <FormControl fullWidth className={componentClasses.actionButton}>
          <Button variant="contained" color="primary" size="large">Войти</Button>
        </FormControl>
      </form>

    </Grid>
  )
}

export default LoginForm;