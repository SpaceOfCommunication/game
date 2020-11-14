import { makeStyles } from "@material-ui/core";

export const SCREEN_SIZES = [600, 900, 1200];

export const SCREEN_MEDIA_SIZES = SCREEN_SIZES.map((size) => `@media (min-width: ${size}px)`);

export const useCommonStyles = makeStyles({
  main: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    background: '#f9f9f9',
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