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

  static async insert(value) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [value.quantity]
    )

    return new Order(rows[0]);
  }

  static async getAllOrders() {
    const { rows } = await pool.query(
      'SELECT * FROM orders',  
    )

    return rows.map(row => {
      return new Order(row);
      
    })
  }

  static async getById(id) {
    // TODO: Implement me!
  }
};
