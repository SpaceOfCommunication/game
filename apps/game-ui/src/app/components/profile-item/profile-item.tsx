import { Button } from '@material-ui/core';
import { useStore } from '../../../core/store';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from "react";
import { Link } from 'react-router-dom';
import { useCommonStyles } from '../../../core/styles';


const ProfileItem: FC = observer(() => {
  const classes = useCommonStyles();
  const store = useStore();
  const logout = useCallback(() => {
    store.logout();
  }, [store])

  const userName = store.userName.get();
  console.log('username', userName)
  return (
    <>
      {!userName &&
        <Link to="/login" className={classes.link}>
          <Button className={classes.navLink} color="inherit" disableElevation>Войти</Button>
        </Link>
      }
      {userName && 
        <>
          <div className={classes.link}><span className={classes.navLink}>Здравствуйте, {userName}</span></div>
          <div className={classes.link}><Button onClick={logout} className={classes.navLink}>Выйти</Button></div>
        </>
      }
    </>
  )
})

export default ProfileItem;