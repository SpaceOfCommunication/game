import { makeStyles } from "@material-ui/core";

export const SCREEN_SIZES = [600, 900, 1200];

export const SCREEN_MEDIA_SIZES = SCREEN_SIZES.map((size) => `@media (min-width: ${size}px)`);

export const PRIMARY_COLOR = '#ee6d3e';
export const SECONDARY_COLOR = '#fdfaf2';
export const RED_COLOR = '#d90000';
export const GREEN_COLOR = '#017b01';

export const useCommonStyles = makeStyles({
  main: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    background: SECONDARY_COLOR,
  },
  link: {
    textDecoration: 'none',
    color: PRIMARY_COLOR
  },
  gridRoot: {
    width: '900px',
  },
  gridItem: {
    textAlign: 'center',
    padding: '15px'
  },
  navLink: {
    margin: '0px 15px',
    fontSize: '125%',
    fontWeight: 'bold',
  }
});