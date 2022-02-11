import React from 'react'
import { Link } from 'react-router-dom'
import {
  StylesProvider,
  Chip,
  Container,
  Grid,
  Button,
} from '@material-ui/core'
import './Home.css'
import ProjectList from './ProjectList'
import CustomizedInputBase from './pet-details/search/Search'

function Projects() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  return (
    <Container>
      {/* Projects header  */}
      <Grid container spacing={1} className="padding-top">
        <Grid item xs={6}>
          {/* <h2>Browse, search or add  NFT's to your collections.</h2> */}
          <div className="label-btns">
            <Chip
              size="medium"
              label="All Cards"
              color="primary"
              clickable
              onClick={handleDelete}
            />

            <Chip
              size="medium"
              label="Birthday"
              clickable
              onClick={handleDelete}
            />

            <Chip
              size="medium"
              label="Valentines Day"
              clickable
              onClick={handleDelete}
            />

            <Chip
              size="medium"
              label="Anniversary"
              clickable
              onClick={handleDelete}
            />

            <Chip
              size="medium"
              label="Wedding"
              clickable
              onClick={handleDelete}
            />

            <Chip
              size="medium"
              label="Christmas"
              clickable
              onClick={handleDelete}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <CustomizedInputBase />
        </Grid>
      </Grid>

      <ProjectList />
    </Container>
  )
}

export default Projects
