import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb(props) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">
          {/* {props.project.map((project) => (
            <div key={project.id}>
              {project.name}
            </div>
          ))} */}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{props.item}</Typography>
      </Breadcrumbs>
    </div>
  )
}
