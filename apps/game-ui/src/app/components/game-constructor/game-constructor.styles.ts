import { makeStyles } from '@material-ui/core';

export const useGameConstructorStyles = makeStyles({
  wrapper: {
    padding: '20px',
    maxWidth: '1300px',
  },
  header: {
    textAlign: 'center',
  },
  textInputBlock: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px 0px 30px 0px',
  },
  textInput: {
    flexBasis: '45%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  screnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});