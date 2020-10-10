import { makeStyles } from "@material-ui/core";

export const useCommonStyles = makeStyles({
  main: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  gridRoot: {
    width: '900px',
  },
  gridItem: {
    textAlign: 'center',
    padding: '15px'
  }
});