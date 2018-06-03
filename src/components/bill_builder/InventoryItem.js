import React, {PropTypes} from "react";
import {Button, Glyphicon} from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

export const InventoryItem = props => {

  const classNames = ['inventory-item'];
  const {id, name, unitprice, active, onSelect} = props;

  return (
    <tr className={classNames}>
      <td>{name}</td>
      <td>
        <CurrencyFormat
          value={unitprice / 100}
          displayType={'text'}
          prefix={'R'}
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </td>
      <td>
        <Button
          bsSize="xsmall"
          onClick={() => onSelect(id)}
          disabled={!active}
          className="pull-right"
        >
          ADD <Glyphicon glyph="plus" />
        </Button>
      </td>
    </tr>
  )
};

InventoryItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  unitprice: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
