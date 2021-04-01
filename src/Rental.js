import { useEffect } from "react";
import {
  Button,
  Paper,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { rentHouse } from "./zilliqa";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 180,
    width: 400,
    padding: theme.spacing(2),
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Rental(props) {
  const classes = useStyles();

  useEffect(() => {
    console.log(
      `houses ${JSON.stringify(props.houses)}`
    );
  }, [props]);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(`click ${e.currentTarget.id} ${props.houses[e.currentTarget.id - 1].rentAmount}`);
    await rentHouse(e.currentTarget.id, props.houses[e.currentTarget.id - 1].rentAmount).then((result) => {
      console.log(`result = ${JSON.stringify(result)}`);
    });
  };

  return (
    <>
      <h1>Welcome to House Rental</h1>
      <Grid container maxwidth="md" className={classes.root} spacing={1}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            {props.houses.map((house) => (
              <Grid key={house.id} item>
                <Paper className={classes.paper}>
                  <h3>{Number(house.rentAmount / 1000000000000).toLocaleString("en", { maximumFractionDigits: 2 })} zil </h3>
                  <h4>Location: {house.streetAddress} </h4>
                  <p>{house.landlord}</p>
                  <Button variant="contained" color="primary"
                    id={house.id.toString()}
                    onClick={handleClick}
                    disabled={house.status === "1" ? true : false }
                    size="medium"
                  >
                    Book Now
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
