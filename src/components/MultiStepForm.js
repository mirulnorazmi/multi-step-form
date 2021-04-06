import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { Names } from "./stepForm/Names";
import { Address } from "./stepForm/Address";
import { Contact } from "./stepForm/Contact";
import { Review } from "./stepForm/Review";
import { Submit } from "./stepForm/Submit";

import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <SettingsIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "rgb(255, 255, 255, 0.8)",
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  paddForm: {
    padding: "0px 100px 0px 100px",
  }
}));

function getSteps() {
  return ["Personal Data", "Location", "Upload File", "Confirmation"];
}

const defaultData = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
};


export const MultiStepForm = () => {
  const classes = useStyles();
  const [formData, setForm] = useForm(defaultData);
  const [activeStep, setActiveStep] = React.useState(0);
  /*const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });*/

  const props = { formData, setForm};

  
  
  function getStepContent(step) {
  
    switch (step) {
      case 0:
        return <Names {...props} />;
      case 1:
        return <Address {...props} />;
      case 2:
        return <Review {...props} />;
      default:
        return "Unknown step";
    }
  }

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  /*switch (step.id) {
    case "names":
      return <Names {...props} />;
    case "address":
      return <Address {...props} />;
    case "contact":
      return <Contact {...props} />;
    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
  }*/

  return (
    <div className={classes.root}>
      <br /><br></br><br /><br></br>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        style={{backgroundColor: "#ffffff00"}}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.paddForm}>
        <Grid container >
      <Grid item xs={1} sm={3} />
      <Grid item xs={10} sm={6} alignItems="center" justify="center">
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions} >

              {console.log(props)}
              <Submit />
            </Typography>
          </div>
        ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    style={{marginLeft: "180px"}}
                  >
                    Back
                </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                
              </div>
            </div>
          )}
          </Grid>
          <Grid item xs={1} sm={3} />
          </Grid>
      </div>
      <br/><br/>
    </div>
  );
};
