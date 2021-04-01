import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Fab,
} from "@material-ui/core";
import { Home, KeyboardArrowUp } from "@material-ui/icons";
import useStyles from "./ComponentStyles";
import HideOnScroll from "./HideOnScroll";
import SideDrawer from "./SideDrawer";
import BackToTop from "./BackToTop";
import { myWallet } from "../zilliqa";

const navLinks = [
  { title: `Register My House`, path: `/register` },
  { title: `Rental`, path: `/rental` },
];

const Navbar = (props) => {
  const classes = useStyles();

  useEffect(() => {
    if (window.zilPay) {
      myWallet().then((result) => {
        console.log(`navbar ${JSON.stringify(result)}`);
      });
    }
  }, []);

  return (
    <>
      <HideOnScroll>
        <AppBar className={classes.navbarStyle}>
          <Toolbar component="nav">
            <Container maxWidth="md" className={classes.navbarDisplayFlex}>
              <IconButton edge="start" aria-label="home">
                <a href="/" style={{ color: `#063970` }}>
                  <Home fontSize="large" />
                </a>
              </IconButton>
              <p>{props.address}</p>
              <p>{props.balance.toLocaleString("en")}</p>
              <Hidden smDown>
                <List
                  component="nav"
                  aria-labelledby="main menu"
                  className={classes.navListDisplayFlex}
                >
                  {navLinks.map(({ title, path }) => (
                    <Link to={path} key={title} className={classes.linkText}>
                      <ListItem button>
                        <ListItemText primary={title} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Hidden>
              <Hidden mdUp>
                <SideDrawer navLinks={navLinks} />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />

      <BackToTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  );
};

export default Navbar;
