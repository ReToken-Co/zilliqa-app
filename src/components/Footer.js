import React from "react";
import { Box, Container } from "@material-ui/core";
import { Facebook, Instagram, LinkedIn, Twitter } from "@material-ui/icons";
import useStyles from "./ComponentStyles";

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footerStyle} elevation={1}>
      <Container maxWidth="md" className={classes.navbarDisplayFlex}>
        <Box>
          <a href="/" target="_blank" aria-label="Facebook">
            <Facebook />
          </a>
          <a href="/" target="_blank" aria-label="LinkedIn">
            <LinkedIn />
          </a>
          <a href="/" target="_blank" aria-label="Twitter">
            <Twitter />
          </a>
          <a href="/" target="_blank" aria-label="Instagram">
            <Instagram />
          </a>
        </Box>
        <p>REToken © 2021</p>
      </Container>
    </Box>
  );
};

export default Footer;
