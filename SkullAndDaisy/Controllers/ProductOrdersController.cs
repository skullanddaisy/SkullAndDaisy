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
    public class ProductOrdersController : ControllerBase
    {
        [HttpPost("addProductOrder")]
        public ActionResult CreateProductOrder(ProductOrder productOrderObject)
        {
            var newProductOrder = ProductOrderRepository.AddProductOrder(productOrderObject.ProductId, productOrderObject.OrderId);

            return Created($"api/createdProductOrder/{newProductOrder.Id}", newProductOrder);
        }
    }
}