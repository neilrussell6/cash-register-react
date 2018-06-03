import React from "react";
import {Table} from "react-bootstrap";
import {connect} from "react-redux";
import {BillItem} from "./BillItem";
import BillSummary from "./BillSummary";
import {BILL_ADD_OR_UPDATE, BILL_REMOVE} from "../../actions";

class BillItems extends React.PureComponent {

  render() {
    const classNames = ['bill-items'];
    const {billItems} = this.props;
    return (
      <div className={classNames}>
        <h3>Itemized Bill</h3>
        <Table className={classNames} striped bordered responsive>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Name</th>
              <th>Price</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(billItems).map((k, i) => {
                const {quantity, name, totalprice} = billItems[k];
                const props = {
                  id: k,
                  quantity,
                  name,
                  price: totalprice,
                  onRemove: this.onBillItemRemove.bind(this),
                  onDecrementQuantity: this.onBillItemDecrementQuantity.bind(this),
                  onIncrementQuantity: this.onBillItemIncrementQuantity.bind(this),
                };
                return (
                  <BillItem key={i} {...props} />
                );
              })
            }
          </tbody>
          <BillSummary />
        </Table>
      </div>
    )
  }

  onBillItemRemove(id) {
    this.props.dispatch({type: BILL_REMOVE, id});
  }

  onBillItemDecrementQuantity(id) {
    const data = this.props.billItems[id];
    this.props.dispatch({type: BILL_ADD_OR_UPDATE, id, data, quantity: -1});
  }

  onBillItemIncrementQuantity(id) {
    const data = this.props.billItems[id];
    this.props.dispatch({type: BILL_ADD_OR_UPDATE, id, data, quantity: 1});
  }
}

function mapStateToProps(state) {
  return {
    billItems: state.billItems || {},
  };
}
export default connect(mapStateToProps)(BillItems);
