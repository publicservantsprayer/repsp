import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import AppBar from "@material-ui/core/AppBar"
import SwipeableViews from "react-swipeable-views"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import Leader from "../Leader"
import theme from "../utilities/theme"

import { withFirebase } from "../Firebase"
import PageTitle from "../PageTitle"

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
})

const StateLeaders = ({ match, db }) => {
  const stateCode = match.params.stateCode.toUpperCase()
  const [fedSenate, setfedSenate] = useState()
  const [fedHouse, setfedHouse] = useState()
  const [stateSenate, setstateSenate] = useState()
  const [stateHouse, setstateHouse] = useState()

  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }
  function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
      <Typography
        component='div'
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        <Box p={3}>{children}</Box>
      </Typography>
    )
  }

  function handleChangeIndex(index) {
    setValue(index)
  }

  useEffect(() => {
    const getLeaders = async () => {
      const [
        fedSenateSnap,
        fedHouseSnap,
        stateSenateSnap,
        stateHouseSnap
      ] = await Promise.all([
        db
          .collection("states")
          .doc(stateCode)
          .collection("leaders")
          .where("LegType", "==", "FL")
          .where("Chamber", "==", "S")
          .get(),
        db
          .collection("states")
          .doc(stateCode)
          .collection("leaders")
          .where("LegType", "==", "FL")
          .where("Chamber", "==", "H")
          .get(),
        db
          .collection("states")
          .doc(stateCode)
          .collection("leaders")
          .where("LegType", "==", "SL")
          .where("Chamber", "==", "S")
          .get(),
        db
          .collection("states")
          .doc(stateCode)
          .collection("leaders")
          .where("LegType", "==", "SL")
          .where("Chamber", "==", "H")
          .get()
      ])

      setfedSenate(fedSenateSnap.docs.map(doc => doc.data()))
      setfedHouse(fedHouseSnap.docs.map(doc => doc.data()))
      setstateSenate(stateSenateSnap.docs.map(doc => doc.data()))
      setstateHouse(stateHouseSnap.docs.map(doc => doc.data()))
    }
    getLeaders()
  }, [db, stateCode])

  if (!fedSenate) return null
  if (!fedHouse) return null
  if (!stateSenate) return null
  if (!stateHouse) return null

  return (
    <div>
      <PageTitle stateCode={stateCode} />
      <Paper className={classes.root}>
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            centered>
            <Tab label='Federal Senate' />
            <Tab label='Federal House' />
            <Tab label='State Senate' />
            <Tab label='State House' />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0}>
            {fedSenate.map(leader => (
              <p key={leader.PID}>
                <Leader leader={leader} />
              </p>
            ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {fedHouse.map(leader => (
              <p key={leader.PID}>
                <Leader leader={leader} />
              </p>
            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {stateSenate.map(leader => (
              <p key={leader.PID}>
                <Leader leader={leader} />
              </p>
            ))}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {stateHouse.map(leader => (
              <p key={leader.PID}>
                <Leader leader={leader} />
              </p>
            ))}
          </TabPanel>
        </SwipeableViews>
      </Paper>
    </div>
  )
}

export default withFirebase(StateLeaders)
