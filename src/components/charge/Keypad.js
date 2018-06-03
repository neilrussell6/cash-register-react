import React from "react";
import {Grid, Row, Col, Button, Well, Glyphicon} from "react-bootstrap";
import {connect} from "react-redux";
import CurrencyFormat from "react-currency-format";
import {KEYPAD_CLEAR, KEYPAD_SET_POINT, KEYPAD_UPDATE} from "../../actions";

const CLEAR = 'KEYPAD_CLEAR';
const POINT = 'KEYPAD_POINT';

class Keypad extends React.PureComponent {

  render() {

    const classNames = ['keypad'];
    const {amount} = this.props.keypad;

    return (

      <Grid className={classNames}>
        <Row>
          <Col>
            <Well>
              <h1>
                <CurrencyFormat
                  value={amount / 100}
                  displayType={'text'}
                  prefix={'R'}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </h1>
            </Well>
          </Col>
        </Row>
        <Row>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(1)}>1</Button></Col>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(2)}>2</Button></Col>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(3)}>3</Button></Col>
        </Row>
        <Row>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(4)}>4</Button></Col>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(5)}>5</Button></Col>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(6)}>6</Button></Col>
        </Row>
        <Row>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(7)}>7</Button></Col>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(8)}>8</Button></Col>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(9)}>9</Button></Col>
        </Row>
        <Row>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(CLEAR)}>
            <Glyphicon glyph="ban-circle" />
          </Button></Col>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(0)}>0</Button></Col>
          <Col xs={4}><Button bsSize="lg" onClick={() => this.onPress(POINT)}>.</Button></Col>
        </Row>
      </Grid>
    )
  }

  onPress(value) {
    if (value === CLEAR) {
      this.props.dispatch({type: KEYPAD_CLEAR, value});
      return;
    }
    if (value === POINT) {
      this.props.dispatch({type: KEYPAD_SET_POINT, value});
      return;
    }
    this.props.dispatch({type: KEYPAD_UPDATE, value});
  }
}

function mapStateToProps(state) {
  return {
    keypad: state.keypad || {},
  };
}
export default connect(mapStateToProps)(Keypad);
