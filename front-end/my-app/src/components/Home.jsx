import React, { Component } from "react";
import AppBar from "./AppBar.jsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Selecter from "./SelecterFarmer.jsx";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Utils from "./ultils.jsx";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginBottom: "20px",
    elevation: 0,
    square: true
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      product: "",
      transport_cost: "",
      weight: "",
      price: "",
      id: -1,
      date: "2018-2-14"
    };
  }

  submitData = () => {
    let id = this.state.id + 1;

    var min = 1;
    var max = 100;
    var rand =  min + (Math.random() * (max-min));

    fetch("http://localhost:3001/farmerMineBlock", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        product: this.state.product,
        transport_cost: this.state.transport_cost,
        weight: this.state.weight,
        price: this.state.price,
        date: this.state.date
      })
    }).then(this.setState({ id: id }));
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  componentWillMount() {
    this.setState({ id: Utils() });
  }
  myHandlerInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar />
        <h1 style={{ color: "black", marginRight: "30px" }}>
          Registo do produto{" "}
        </h1>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Paper className={classes.paper}>
              <Selecter
                name="product"
                handleChange={this.myHandlerInput}
                selectedProduct={this.state.product}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <TextField
                label="Transport Cost"
                name="transport_cost"
                onChange={this.myHandlerInput}
                id="simple-start-adornment"
                className={classNames(classes.margin, classes.textField)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  )
                }}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <TextField
                label="Weight"
                id="simple-start-adornment"
                name="weight"
                onChange={this.myHandlerInput}
                className={classNames(classes.margin, classes.textField)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Kg</InputAdornment>
                  )
                }}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <TextField
                label="Price"
                name="price"
                id="simple-start-adornment"
                onChange={this.myHandlerInput}
                className={classNames(classes.margin, classes.textField)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€/Kg</InputAdornment>
                  )
                }}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  name="date"
                  label="Date"
                  onChange={this.myHandlerInput}
                  type="date"
                  defaultValue="2018-02-14"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </form>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Button
                variant="contained"
                date="name"
                className={classes.button}
                onClick={this.submitData}
              >
                Submit
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
