const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {

  static async createOrder(value) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${value.quantity}`
    );

    const order = await Order.insert(value);

    return order;
  }

  static async updateOrderById(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Updated Order received for ${id, quantity}`
    );

    const order = await Order.updateOrder(id, quantity);

    return order;
  }




};
