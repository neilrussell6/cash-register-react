export function index() {
  return new Promise(resolve => {
    setTimeout(() => {
      // build dummy inventory list
      const inventory = [
        {id: 1, key: 'americano', name: 'Americano', unitprice: 2500},
        {id: 2, key: 'cappuccino', name: 'Cappuccino', unitprice: 3790},
        {id: 3, key: 'blacktea', name: 'Black Tea', unitprice: 1580},
        {id: 4, key: 'greentea', name: 'Green Tea', unitprice: 1255},
      ];
      resolve(inventory);
    }, 1000);
  });
}
