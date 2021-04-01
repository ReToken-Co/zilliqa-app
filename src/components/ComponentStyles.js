import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navbarStyle: {
    position: `fixed`,
    backgroundColor: `#abdbe3`,
    height: theme.spacing(7),
    padding: theme.spacing(0, 2),
    display: `flex`,
  },
  navbarStyle1: {
    position: `fixed`,
    backgroundColor: `#abdbe3`,
    height: theme.spacing(5),
    padding: theme.spacing(0, 2),
    bottom: 0,
    display: `flex`,
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
    maxWidth: `md`,
  },
  navListDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    color: `#063970`,
},
  list: {
    width: 250,
  },
  footerStyle: {
    backgroundColor: `#abdbe3`,
    bottom: 0,
    left: 0,
    minWidth: `100%`,
    height: theme.spacing(5),
    display: `flex`,
    flexDirection: `row`,
    alignItems: `center`,
    padding: theme.spacing(0, 2),
    "& a": {
      color: `#727485`,
      padding: theme.spacing(1),
      fontSize: `2.5rem`,
    },
    "& p": {
      fontSize: `0.9rem`,
      fontWeight: 400,
      color: `#727485`,
      padding: theme.spacing(1),
    },
  },
}));

export default useStyles;
