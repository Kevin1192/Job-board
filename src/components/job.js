import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";


function job({ job, onClick }) {
  return (
    <Paper className="job" onClick={onClick}>
      <div>
        <Typography variant="h5">{job.title}</Typography>
        <Typography variant="h6">{job.company}</Typography>
        <Typography>{job.location}</Typography>
      </div>
      <div>
        <Typography>
          {job.created_at.split(" ").slice(0, 3).join(" ")}
        </Typography>
        
        <a href={job.url}>
          <Button
            color="primary"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
          >
            Apply
          </Button>
        </a>
      </div>
    </Paper>
  );
}

export default job;
