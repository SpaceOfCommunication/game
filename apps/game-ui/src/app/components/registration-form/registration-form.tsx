import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, makeStyles } from '@material-ui/core';
import { MessageService } from '../../../core/message-service';
import React, { FC, useCallback, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useCommonStyles } from '../../../core/styles';
import { Auth } from '../../../core/auth';

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

const RegistrationForm: FC = () => {
  const classes = useCommonStyles();
  const componentClasses = useComponentStyles();
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwrodRepeat, setPasswordRepeat] = useState('');
  const fields = { login, password, passwrodRepeat };
  const [errors, setErrors] = useState({ login: '', password: '', passwrodRepeat: '' });

  const onFormSubmit = useCallback(async () => {
    const errorMessages = {...errors};
    // EMPTY VALIDATION
    for(const field in errors) { 
      const val = fields[field];
      errorMessages[field] = !val ? 'Поле не может быть пустым' : '';
    }
    // PASS REPEAT VALIDATION
    if (fields.password && fields.passwrodRepeat && fields.password !== fields.passwrodRepeat) {
      errorMessages.passwrodRepeat = 'Пароль не совпадает';
    }
    setErrors(errorMessages);
    if (Object.keys(errorMessages).some((key) => !!errorMessages[key])) {
      return;
    }
    // SUBMITING THE FORM
    const response = await Auth.signUp(fields.login, fields.password);
    const messageService = MessageService.getInstance();
    if (!response.ok) {
      response.json().then((body) => messageService.showMessage({ message: body.message, status: 'error' }))
      return;
    }
    messageService.showMessage({ message: 'Регистрация успешно завершена', status: 'success' });
    history.push('/login');
  }, [errors, setErrors, fields, history]);

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12} className={classes.gridItem} >
        <h1>Регистрация</h1>
      </Grid>
      <form className={componentClasses.form}>
        <FormControl fullWidth required error={!!errors.login} className={componentClasses.field}>
          <InputLabel htmlFor="email">Логин</InputLabel>
          <Input id="email" value={login} onChange={e => setLogin(e.target.value)} aria-describedby="login-helper-text" />
          {!errors.login && <FormHelperText id="login-helper-text">Пожалуйста укажите свой email</FormHelperText>}
          {errors.login && <FormHelperText error>{errors.login}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth required error={!!errors.password} className={componentClasses.field}>
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
            aria-describedby="password-helper-text" />
          {!errors.password && <FormHelperText id="password-helper-text">Придумайте пароль</FormHelperText>}
          {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth required error={!!errors.passwrodRepeat} className={componentClasses.field}>
          <InputLabel htmlFor="password-repeat">Повтор пароля</InputLabel>
          <Input id="password-repeat" type="password" value={passwrodRepeat}
            onChange={e => setPasswordRepeat(e.target.value)} aria-describedby="password-repeat-helper-text" />
          {!errors.passwrodRepeat && <FormHelperText id="password-repeat-helper-text">Введите пароль еще раз</FormHelperText>}
          {errors.passwrodRepeat && <FormHelperText error>{errors.passwrodRepeat}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth className={componentClasses.actionButton}>
          <Button onClick={onFormSubmit} variant="contained" color="primary" size="large">Зарегистрироваться</Button>
        </FormControl>
      </form>
    </Grid>
  )
}

export default RegistrationForm;