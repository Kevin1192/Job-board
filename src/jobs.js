import React from 'react';
import Typography from '@material-ui/core/Typography';

import Job from './job';

export default function Jobs({jobs}) {
    return (
        <div>
            <Typography variant="h3">
                Entry Level Software jobboard
            </Typography>
            {
                jobs.map(
                    job => <Job job={job} />
                )
            }
        </div>
    )
}