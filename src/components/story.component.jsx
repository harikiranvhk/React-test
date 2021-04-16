import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const Story = ({ id, expandedPanel, handleAccordionChange, classes, title, comments, type, by, loading }) => {

  return (
    <Accordion expanded={expandedPanel === id} onChange={handleAccordionChange(id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div>
          <Typography className={classes.heading}>{title}</Typography>
          <div className={classes.subHeadings}>
            <p>type: {type}</p>
            <p>By: {by}</p>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography className={classes.heading}>Comments</Typography>
        {
          loading || comments.length > 0 ? comments.filter(({ type }) => type === "comment").map(({ id: commnetId, text, time }) =>
            <div className="comments" key={commnetId}>
              <p dangerouslySetInnerHTML={{ __html: text }} />
              <p className={classes.dataTime}>- {moment.unix(time).format("dd.mm.yyyy hh:MM:ss")}</p>
            </div>
          )
            : <div>No comments yet..</div>
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default Story