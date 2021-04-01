import { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  Container,
  makeStyles,
} from "@material-ui/core";
import { registerHouse } from "./zilliqa";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function RegisterHouse() {
  const classes = useStyles();
  const [streetAddr, setStreetAddr] = useState();
  const [rent, setRent] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`data ${streetAddr} ${rent}`);
    await registerHouse(streetAddr, rent * 1000000000000).then((result) => {
      console.log(`result = ${JSON.stringify(result, null, 4)}`);
    });
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit} className={classes.paper}>
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            Register Your House For Hospitality
          </Typography>

          <Paper style={{ padding: 16 }}>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Street Address"
                  variant="outlined"
                  name="streetAddress"
                  fullWidth
                  value={streetAddr}
                  onChange={(e) => setStreetAddr(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Rent (ZIL)"
                  variant="outlined"
                  name="rent"
                  fullWidth
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Container>
    </>
  );
}
