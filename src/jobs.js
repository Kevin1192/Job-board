import React from "react";
import Typography from "@material-ui/core/Typography";

import Job from "./job";
import JobModel from "./JobModel.js";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles({
  root: {
    width: '400px',
    flexGrow: 1,
  },
});

export default function Jobs({ jobs }) {
  // dialog
  const [open, setOpen] = React.useState(false);
  const [selectedJob, selectJob] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //page
  const numPages = Math.ceil(jobs.length / 50);
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const jobsOnPage = jobs.slice(activeStep * 50, activeStep * 50 + 51);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="page">
      <JobModel open={open} job={selectedJob} handleClose={handleClose} />
      <div className="header2">
        <Typography variant="h4" component="h1" className="header1">
          Software Engineer Job Board
        </Typography>
        <Typography variant="h5" component="h2">
          Found {jobs.length} jobs
        </Typography>
      </div>
      <div class="jobs">
        {jobsOnPage.map((job, i) => (
          <Job
            key={i}
            job={job}
            onClick={() => {
              selectJob(job);
              handleClickOpen();
            }}
          />
        ))}
        <div>
          Page {activeStep + 1} of {numPages}
        </div>
        <MobileStepper
          variant="progress"
          steps={numPages}
          position="static"
          activeStep={activeStep}
          className={classes.root}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === numPages - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </div>
    </div>
  );
}
