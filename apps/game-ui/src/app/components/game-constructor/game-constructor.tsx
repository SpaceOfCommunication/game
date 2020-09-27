import { Button, FormControl, FormHelperText, Grid, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import Message from '../ui/message';

const useStyles = makeStyles({
  gridItem: {
    textAlign: 'center',
    padding: '15px'
  }
});

export const GameConstructor: FC = () => {

  const classes = useStyles();

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={12}>
        <Message>Для создания игры загрузите картинку <span role="img" aria-label="иконка картинки">🖼 </span>
        и мелодию <span role="img" aria-label="иконка мелодии">🎶</span></Message>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <FormControl>
          <input id="game-picture" type="file" accept="image/png, image/jpeg" aria-describedby="Поле выбора изображения" />
          <FormHelperText id="my-helper-text">
            Выберите картинку <span role="img" aria-label="иконка картинки">🖼 </span> на своем компьютере
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <FormControl>
          <input id="game-picture" type="file" accept="audio/*" aria-describedby="Поле выбора изображения" />
          <FormHelperText id="my-helper-text">
            Выберите мелодию <span role="img" aria-label="иконка мелодии">🎶</span> на своем компьютере
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Button disabled={true} variant="contained" color="primary" size="large">Создать игру</Button>
      </Grid>
    </Grid>
  )
};


export default GameConstructor