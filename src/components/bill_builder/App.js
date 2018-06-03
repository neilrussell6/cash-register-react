import React from "react";
import {Grid, Row, Col, PageHeader, Button, Glyphicon} from "react-bootstrap";
import InventoryItems from "./InventoryItems";
import BillItems from "./BillItems";
import {LinkContainer} from "react-router-bootstrap";

export const BillBuilder = () => {

  const classNames = ['bill-builder'];

  return (
    <Grid className={classNames}>
      <Row>
        <Col xs={12}>
          <PageHeader>Add a new Bill</PageHeader>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <InventoryItems />
        </Col>
        <Col xs={6}>
          <BillItems />
         </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <LinkContainer to="/">
            <Button bsSize="lg">
              BACK <Glyphicon glyph="chevron-left" />
            </Button>
          </LinkContainer>
        </Col>
        <Col xs={6}>
          <LinkContainer to="/charge">
            <Button bsSize="lg" className="pull-right">
              PROCEED <Glyphicon glyph="chevron-right" />
            </Button>
          </LinkContainer>
        </Col>
      </Row>
    </Grid>
  )
};
