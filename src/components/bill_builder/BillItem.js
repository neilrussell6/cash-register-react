import React, {PropTypes} from "react";
import {Button, Glyphicon} from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

export const BillItem = props => {

  const classNames = ['bill-item'];
  const {
    id,
    quantity,
    name,
    price,
    onRemove,
    onDecrementQuantity,
    onIncrementQuantity,
  } = props;

  return (
    <tr className={classNames}>
      <td>
        <Button bsSize="xsmall" onClick={() => onDecrementQuantity(id)}>
          <Glyphicon glyph="minus" />
        </Button>
        <span> {quantity} </span>
        <Button bsSize="xsmall" onClick={() => onIncrementQuantity(id)}>
          <Glyphicon glyph="plus" />
        </Button>
        </td>
      <td>{name}</td>
      <td>
        <CurrencyFormat
          value={price / 100}
          displayType={'text'}
          prefix={'R'}
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </td>
      <td>
        <Button bsSize="xsmall" onClick={() => onRemove(id)} className="pull-right">
          REMOVE <Glyphicon glyph="remove" />
        </Button>
      </td>
    </tr>
  )
};

BillItem.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onDecrementQuantity: PropTypes.func.isRequired,
  onIncrementQuantity: PropTypes.func.isRequired,
};
