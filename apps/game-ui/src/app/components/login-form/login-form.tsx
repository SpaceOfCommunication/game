import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, makeStyles } from '@material-ui/core';
import { Auth } from '../../../core/auth';
import React, { FC, useCallback, useState } from "react";
import { useCommonStyles } from '../../../core/styles';
import { useStore } from '../../../core/store';
import { observer } from 'mobx-react-lite';
import { MessageService } from '../../../core/message-service';

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

const LoginForm: FC = observer(() => {
  const classes = useCommonStyles();
  const componentClasses = useComponentStyles();
  const store = useStore();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const fields = { login, password };
  const [errors, setErrors] = useState({ login: '', password: '' });

  const onSubmit = useCallback(async () => {
    const errorMessages = {...errors};
    // EMPTY VALIDATION
    for(const field in errors) { 
      const val = fields[field];
      errorMessages[field] = !val ? 'Поле не может быть пустым' : '';
    }
    setErrors(errorMessages);
    if (Object.keys(errorMessages).some((key) => !!errorMessages[key])) {
      return;
    }
    // SUBMIT THE FORM
    const messageService = MessageService.getInstance();
    try {
      const { response, pouchDB } = await Auth.login(fields.login, fields.password);
      if (response.ok && response.name) {
        localStorage.setItem('userName', response.name);
        store.db.syncWithRemoteDB(pouchDB);
        messageService.showMessage({ message: 'Авторизация прошла успешно', status: 'success' });
      } else {
        throw new Error();
      }
    } catch(err) {
      if (err.name === 'unauthorized' || err.name === 'forbidden') {
        messageService.showMessage({ message: 'Неверный логин или пароль', status: 'error' });
      } else {
        messageService.showMessage({ message: 'Неизвестная ошибка. Попробуйте снова или обратитесь в поддержку.', status: 'error' });
      }
    }
  }, [errors, setErrors, fields, store]);

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12} className={classes.gridItem} >
        <h1>Вход</h1>
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
          {!errors.password && <FormHelperText id="password-helper-text">Введите пароль</FormHelperText>}
          {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth className={componentClasses.actionButton}>
          <Button onClick={onSubmit} variant="contained" color="primary" size="large">Войти</Button>
        </FormControl>
      </form>

    </Grid>
  )
})

export default LoginForm;