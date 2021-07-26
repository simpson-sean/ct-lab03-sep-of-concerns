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

  // Get Order by ID (update/Replace?)
  static async getOrderById(id) {
    const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);  

    return new Order(rows[0]);
      
    };
  

  // Modify Existing Order (Update)
  static async updateOrderById() {
    const { rows } = await pool.query(
      '',  
    )

    return rows.map(row => {
      return new Order(row);
      
    })
  }
  
  //Remove Order (Delete)
  static async deleteOrder() {
    const { rows } = await pool.query(
      '',  
    )

    return rows.map(row => {
      return new Order(row);
      
    })
  }




  // static async getById(id) {
  //   // TODO: Implement me!
  // }
};
