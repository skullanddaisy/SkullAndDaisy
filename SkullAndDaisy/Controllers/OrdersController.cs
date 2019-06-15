using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkullAndDaisy.Data;
using SkullAndDaisy.Models;

namespace SkullAndDaisy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        readonly OrderRepository _orderRepository;

        public OrdersController(OrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet("getOrdersByProductSeller/{userId}")]
        public ActionResult GetOrdersByProductSeller(int userId)
        {
            var resultingOrders = _orderRepository.GetBySeller(userId);

            return Ok(resultingOrders);
        }

        [HttpGet("getAllMyOrders/{userId}")]
        public ActionResult GetAllMyOrders(int userId)
        {
            var allOrders = _orderRepository.GetAll(userId);

            return Ok(allOrders);
        }

        [HttpGet("getMyOrdersByStatus/{userId}/{orderStatus}")]
        public ActionResult GetMyOrdersByStatus(int userId, string orderStatus)
        {
            var myOrders = _orderRepository.GetByStatus(userId, orderStatus);

            return Ok(myOrders);
        }

        [HttpPost("addOrder")]
        public ActionResult AddOrder(Order orderObject)
        {
            var newOrder = _orderRepository.AddOrder(orderObject.OrderStatus, orderObject.Total, orderObject.OrderDate, orderObject.PaymentTypeId, orderObject.UserId);

            return Created($"api/createdOrder/{newOrder.Id}", newOrder);
        }

        [HttpPut("updateOrder")]
        public ActionResult UpdateOrder(Order orderObject)
        {
            var updatedOrder = _orderRepository.UpdateOrder(orderObject.Id, orderObject.OrderStatus, orderObject.Total, orderObject.OrderDate, orderObject.PaymentTypeId, orderObject.UserId);

            return Ok(updatedOrder);
        }

        [HttpGet("getMonthlySalesTotal/{userId}")]
        public decimal GetThisMonthsSales(int userId)
        {
            var salesTotal = _orderRepository.GetThisMonthsSales(userId);

            return salesTotal;
        }
    }
}