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
        readonly ProductOrderRepository _productOrderRepository;

        public ProductOrdersController(ProductOrderRepository productOrderRepository)
        {
            _productOrderRepository = productOrderRepository;
        }

        [HttpGet("getAllProductOrders")]
        public ActionResult GetAllProductOrders()
        {
            var allProductOrders = _productOrderRepository.GetAll();

            return Ok(allProductOrders);
        }

        [HttpGet("getProductOrderByIds/{orderId}/{productId}")]
        public ActionResult GetAllProductOrders(int orderId, int productId)
        {
            var singleProductOrders = _productOrderRepository.GetSingleByIds(orderId, productId);

            return Ok(singleProductOrders);
        }

        [HttpGet("GetProductOrdersByOrderId/{orderId}")]
        public ActionResult GetProductOrdersByOrderId(int orderId)
        {
            var filteredProductOrders = _productOrderRepository.GetAllByOrderId(orderId);

            return Ok(filteredProductOrders);
        }

        [HttpPost("addProductOrder")]
        public ActionResult AddProductOrder(ProductOrder productOrderObject)
        {
            var newProductOrder = _productOrderRepository.AddProductOrder(productOrderObject.ProductId, productOrderObject.OrderId, productOrderObject.Quantity, productOrderObject.Shipped);

            return Created($"api/createdProductOrder/{newProductOrder.Id}", newProductOrder);
        }

        [HttpDelete("deleteProductOrder/{productOrderId}")]
        public ActionResult DeleteProductOrder(int productOrderId)
        {
            var deletedProductOrder = _productOrderRepository.DeleteProductOrder(productOrderId);

            return Ok(deletedProductOrder);
        }

        [HttpPut("updateProductOrder")]
        public ActionResult UpdateProductOrder(ProductOrder productOrderObject)
        {
            var updatedOrder = _productOrderRepository.UpdateProductOrder(productOrderObject.Id, productOrderObject.ProductId, productOrderObject.OrderId, productOrderObject.Quantity, productOrderObject.Shipped);

            return Ok(updatedOrder);
        }

        [HttpPut("shippedProductOrder/{id}")]
        public ActionResult shipProductOrder(int id)
        {
            var shippedProductOrder = _productOrderRepository.ShipProduct(id);

            return Ok(shippedProductOrder);
        }
    }
}