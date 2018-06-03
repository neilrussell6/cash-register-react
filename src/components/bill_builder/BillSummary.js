import React from "react";
import {connect} from "react-redux";
import CurrencyFormat from "react-currency-format";

class BillSummary extends React.PureComponent {

  render() {
    const classNames = ['bill-summary'];
    const {total} = this.props.billSummary;

    return (
      <tfoot className={classNames}>
        <tr>
          <td>&nbsp;</td>
          <td>total</td>
          <td>
            <CurrencyFormat
              value={total / 100}
              displayType={'text'}
              prefix={'R'}
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </td>
          <td>&nbsp;</td>
        </tr>
      </tfoot>
    )
  }
}

function mapStateToProps(state) {
  return {
    billSummary: state.billSummary || {},
  };
}
export default connect(mapStateToProps)(BillSummary);
