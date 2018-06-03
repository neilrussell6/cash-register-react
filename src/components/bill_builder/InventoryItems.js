import React from "react";
import {Table} from "react-bootstrap";
import {connect} from "react-redux";
import {InventoryItem} from "./InventoryItem";
import {BILL_ADD_OR_UPDATE, INVENTORY_INDEX} from "../../actions";

class InventoryItems extends React.PureComponent {

  componentWillMount() {
    this.props.dispatch({type: INVENTORY_INDEX});
  }

  render() {
    const classNames = ['inventory-items'];
    const {inventoryItems} = this.props;
    return (
      <div>
        <h3>Available items</h3>
        <Table className={classNames} striped bordered responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(inventoryItems).map((k, i) => {
                const {name, unitprice, active} = inventoryItems[k];
                const props = {
                  id: k,
                  name,
                  unitprice,
                  active,
                  onSelect: this.onInventoryItemSelect.bind(this),
                };
                return (
                  <InventoryItem key={i} {...props} />
                );
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }

  onInventoryItemSelect(id) {
    const data = this.props.inventoryItems[id];
    this.props.dispatch({type: BILL_ADD_OR_UPDATE, id, data});
  }
}

function mapStateToProps(state) {
  return {
    inventoryItems: state.inventoryItems || {},
  };
}
export default connect(mapStateToProps)(InventoryItems);
