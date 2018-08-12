import React from "react";
import {Grid, Row, Col, PageHeader, Button, Glyphicon} from "react-bootstrap";
// import {LinkContainer} from "react-router-bootstrap";

import {Link} from 'react-router-dom'

export const StartMenu = () => {

  const classNames = ['start-menu'];

  return (
    <Grid className={classNames}>
      <Row>
        <Col xs={12}>
          <PageHeader>Cash Register</PageHeader>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Link to="/new-bill">
            <Button bsSize="lg" className="pull-center">
              Create a new bill <Glyphicon glyph="list-alt" />
            </Button>
          </Link>
        </Col>
      </Row>
    </Grid>
  )
};
