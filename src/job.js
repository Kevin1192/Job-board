import React from 'react';

function job({job}) {
    return (
        <div className='job'>
            {job.title}
            <span className='jobcomp'>  {job.company}</span>
            <hr />
        </div>
    )
}

export default job;
