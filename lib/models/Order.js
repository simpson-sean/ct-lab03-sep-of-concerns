const orders = require("../controllers/orders");
const pool = require("../utils/pool")

// static method: Order.insert, Number.parseInt, Math.random
// instance method: .map, .toString(), .toUpperCase()
module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }


  // Get all orders (PASSING TEST)
  static async getAllOrders() {
    const { rows } = await pool.query(
      'SELECT * FROM orders',  
    )

    return rows.map(row => {
      return new Order(row);

    })
  }

 // Insert new Order (Create) (PASSING TEST)
 static async insert(value) {
  const { rows } = await pool.query(
    'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
    [value.quantity]
  )

  return new Order(rows[0]);
}

  // Get Order by ID (update/Replace) (PASSING TEST)
  static async getOrderById(id) {
    const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);  

    return new Order(rows[0]);
      
    };
  

  // Modify Existing Order (Update) (PASSING TEST)
  static async updateOrder(id, quantity) {
    const existingOrder = await Order.getOrderById(id);
    const newQuantity = quantity ?? existingOrder.quantity;

    const { rows } = await pool.query(
      `UPDATE orders SET quantity=$1 WHERE id=$2 RETURNING *`,
      [ newQuantity, id]  
    )

    return new Order(rows[0]);
      
  };
  
  //Remove Order (Delete)
  static async deleteOrder(id) {
    const { rows } = await pool.query(
      'DELETE FROM orders WHERE id=$1 RETURNING *', [id]  
    );

    return new Order(rows[0]);
      
    }
};


