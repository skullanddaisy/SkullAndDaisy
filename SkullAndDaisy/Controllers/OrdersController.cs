using Microsoft.AspNetCore.Mvc;
using SkullAndDaisy.Data;
using SkullAndDaisy.Models;

namespace SkullAndDaisy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        [HttpGet("getOrdersByProductSeller/{userId}")]
        public ActionResult GetOrdersByProductSeller(int userId)
        {
            var resultingOrders = OrderRepository.GetBySeller(userId);

            return Ok(resultingOrders);
        }

        [HttpGet("getAllMyOrders/{userId}")]
        public ActionResult GetAllMyOrders(int userId)
        {
            var allOrders = OrderRepository.GetAll(userId);

            return Ok(allOrders);
        }

        [HttpGet("getMyOrdersByStatus/{userId}/{orderStatus}")]
        public ActionResult GetMyOrdersByStatus(int userId, string orderStatus)
        {
            var myOrders = OrderRepository.GetByStatus(userId, orderStatus);

            return Ok(myOrders);
        }

        [HttpPost("addOrder")]
        public ActionResult AddOrder(Order orderObject)
        {
            var newOrder = OrderRepository.AddOrder(orderObject.OrderStatus, orderObject.Total, orderObject.OrderDate, orderObject.PaymentTypeId, orderObject.UserId);

            return Created($"api/createdOrder/{newOrder.Id}", newOrder);
        }

        [HttpPut("updateOrder")]
        public ActionResult UpdateOrder(Order orderObject)
        {
            var updatedOrder = OrderRepository.UpdateOrder(orderObject.Id, orderObject.OrderStatus, orderObject.Total, orderObject.OrderDate, orderObject.PaymentTypeId, orderObject.UserId);

            return Ok(updatedOrder);
        }
    }
}