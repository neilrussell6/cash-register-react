import React from "react";
import {connect} from "react-redux";
import {Grid, Row, Col, PageHeader, Button, Glyphicon} from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import {LinkContainer} from "react-router-bootstrap";

class Change extends React.PureComponent {

  render() {
    const classNames = ['charge'];
    const {total} = this.props.billSummary;
    const {amount} = this.props.keypad;
    const received = amount;
    const change = received - total;

    return (
      <Grid className={classNames}>
        <Row>
          <Col xs={12}>
            <PageHeader>Change</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h3>
              <span>Total due is </span>
              <CurrencyFormat
                value={total / 100}
                displayType={'text'}
                prefix={'R'}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </h3>

            <h3>
              <span>Total received is </span>
              <CurrencyFormat
                value={received / 100}
                displayType={'text'}
                prefix={'R'}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </h3>

            <h3>
              <span>Change is </span>
              <CurrencyFormat
                value={change / 100}
                displayType={'text'}
                prefix={'R'}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </h3>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <LinkContainer to="/charge">
              <Button bsSize="lg">
                BACK <Glyphicon glyph="chevron-left" />
              </Button>
            </LinkContainer>
          </Col>
          <Col xs={6}>&nbsp;</Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    billSummary: state.billSummary || {},
    keypad: state.keypad || {},
  };
}
export default connect(mapStateToProps)(Change);
