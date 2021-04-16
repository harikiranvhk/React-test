import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { fetchTopStories, fetchItemById } from '../services/storyService'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Story from '../components/story.component'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      "& .MuiAccordionDetails-root": {
        display: "block"
      },
      "& .comments:nth-of-type(odd)": {
        "background-color": "antiquewhite"
      },
    },
    mainHeading: {
      fontSize: theme.typography.pxToRem(30),
      fontWeight: theme.typography.fontWeightBold,
      padding: '2rem'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    subHeadings: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    "dataTime": {
      textAlign: "right"
    }
  }),
);

const HomePage = () => {
  const classes = useStyles();
  const [stories, setStories] = useState([]);
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleLoading = (loading) => {
    setLoading(loading);
  };

  useEffect(() => {
    async function fetchData() {
      const storiesList = [];
      const response = await fetchTopStories()
      const storyIds = response.data

      storyIds.slice(0, 10).forEach((story) => {
        storiesList.push(fetchItemById(story));
      })

      const topStoriesWithDetails = (await Promise.all(storiesList))
        .map(({ data }) => data)

      setStories(topStoriesWithDetails)
    }

    handleLoading(true)
    fetchData();
    handleLoading(false)

  }, [])

  const handleAccordionChange = (panel) => async (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);

    if (isExpanded) {
      handleLoading(true)
      const story = stories.find((story) => story.id === panel)
      const storiesList = [];
      const kids = story.kids || []

      const commentsCount = kids.length < 20 ? kids.length : 20

      kids.slice(0, commentsCount).forEach((story) => {
        storiesList.push(fetchItemById(story));
      })

      const topStoriesWithDetails = (await Promise.all(storiesList))
        .map(({ data }) => data)

      setComments(topStoriesWithDetails)
      handleLoading(false)
    }
  };

  return (
    <div className={classes.root}>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <CssBaseline />
      <Container fixed>

        <Typography component="div" style={{ backgroundColor: '#cfe8fc', }}>
          <Typography className={classes.mainHeading}>Hacker News</Typography>
          {
            stories.map(({ id, by, title, type, url }) =>
              <Story
                key={id}
                id={id}
                expandedPanel={expandedPanel}
                handleAccordionChange={handleAccordionChange}
                classes={classes}
                title={title}
                comments={comments}
                type={type}
                by={by}
                loading={loading}
              />
            )
          }
        </Typography>
      </Container>
    </div>
  )

}

export default HomePage