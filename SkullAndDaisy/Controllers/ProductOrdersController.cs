using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkullAndDaisy.Data;
using SkullAndDaisy.Models;

namespace SkullAndDaisy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductOrdersController : ControllerBase
    {
        [HttpGet("getAllProductOrders")]
        public ActionResult GetAllProductOrders()
        {
            var allProductOrders = ProductOrderRepository.GetAll();

            return Ok(allProductOrders);
        }

        [HttpGet("GetProductOrdersByOrderId/{orderId}")]
        public ActionResult GetProductOrdersByOrderId(int orderId)
        {
            var filteredProductOrders = ProductOrderRepository.GetAllByOrderId(orderId);

            return Ok(filteredProductOrders);
        }

        [HttpPost("addProductOrder")]
        public ActionResult AddProductOrder(ProductOrder productOrderObject)
        {
            var newProductOrder = ProductOrderRepository.AddProductOrder(productOrderObject.ProductId, productOrderObject.OrderId);

            return Created($"api/createdProductOrder/{newProductOrder.Id}", newProductOrder);
        }

        [HttpDelete("deleteProductOrder/{productOrderId}")]
        public ActionResult DeleteProductOrder(int productOrderId)
        {
            var deletedProductOrder = ProductOrderRepository.DeleteProductOrder(productOrderId);

            return Ok(deletedProductOrder);
        }
    }
}