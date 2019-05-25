using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkullAndDaisy.Data;
using SkullAndDaisy.Models;

namespace SkullAndDaisy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        [HttpGet("getAllMyOrders/{userId}")]
        public ActionResult GetAllMyOrders(int userId)
        {
            var allOrders = OrderRepository.GetAll(userId);

            return Ok(allOrders);
        }

        [HttpGet("getMyCompletedOrders/{userId}")]
        public ActionResult GetMyCompletedOrders(int userId)
        {
            var completedOrders = OrderRepository.GetCompleted(userId);

            return Ok(completedOrders);
        }

        [HttpGet("getMyCancelledOrders/{userId}")]
        public ActionResult GetMyCancelledOrders(int userId)
        {
            var cancelledOrders = OrderRepository.GetCancelled(userId);

            return Ok(cancelledOrders);
        }

        [HttpGet("getMyPendingOrder/{userId}")]
        public ActionResult GetMyPendingOrder(int userId)
        {
            var pendingOrder = OrderRepository.GetPending(userId);

            return Ok(pendingOrder);
        }

        [HttpPost("addOrder")]
        public ActionResult AddOrder(Order orderObject)
        {
            var newOrder = OrderRepository.AddOrder(orderObject.OrderStatus, orderObject.Total, orderObject.OrderDate, orderObject.PaymentTypeId, orderObject.UserId);

            return Created($"api/createdOrder/{newOrder.Id}", newOrder);
        }
    }
}