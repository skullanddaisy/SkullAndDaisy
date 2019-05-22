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
        [HttpPost("addOrder")]
        public ActionResult CreateOrder(Order orderObject)
        {
            var newOrder = OrderRepository.AddOrder(orderObject.OrderStatus, orderObject.Total, orderObject.OrderDate, orderObject.PaymentTypeId, orderObject.UserId);

            return Created($"api/createdOrder/{newOrder.Id}", newOrder);
        }
    }
}