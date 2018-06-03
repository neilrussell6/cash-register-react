import React from "react";
import {connect} from "react-redux";
import {Grid, Row, Col, PageHeader, Button, Glyphicon} from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import Keypad from "./Keypad";
import {LinkContainer} from "react-router-bootstrap";

class Charge extends React.PureComponent {

  render() {
    const classNames = ['charge'];
    const {total} = this.props.billSummary;

    return (
      <Grid className={classNames}>
        <Row>
          <Col xs={12}>
            <PageHeader>Bill Summary</PageHeader>
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
            <h3>Please enter amount received</h3>
            <Keypad />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <LinkContainer to="/new-bill">
              <Button bsSize="lg">
                BACK <Glyphicon glyph="chevron-left" />
              </Button>
            </LinkContainer>
          </Col>
          <Col xs={6}>
            <LinkContainer to="/change">
              <Button bsSize="lg" className="pull-right">
                PROCEED <Glyphicon glyph="chevron-right" />
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    billSummary: state.billSummary || {},
  };
}
export default connect(mapStateToProps)(Charge);
