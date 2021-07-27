const { Router } = require('express');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body);

      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const order = await Order.getAllOrders();

      res.send(order);
    } catch (err) {
      next(err);
    }

  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.getOrderById(id);

      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const updatedOrder = await OrderService.updateOrderById(id, quantity);

      res.send(updatedOrder);

    } catch (err) {
      next(err);
    }

  })
  
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.deleteOrderById(id);

      res.send({
        message: `${order.quantity} items have been removed.`,
      });
    
    }catch(err) {
      next(err);
    } 

  });
