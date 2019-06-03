using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkullAndDaisy.Data;
using SkullAndDaisy.Models;

namespace SkullAndDaisy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        readonly ProductRepository _productRepository;

        public ProductsController(ProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpPost("CreateProduct")]
        public ActionResult AddProduct(CreateProductRequest createRequest)
        {

            var newProduct = _productRepository.AddProduct(
                createRequest.Title,
                createRequest.Description,
                createRequest.ProductTypeId,
                createRequest.Price,
                createRequest.Quantity,
                createRequest.UserId);

            return Created($"/api/target/{newProduct.Id}", newProduct);
        }

        // Get single product method
        [HttpGet("{id}")]
        [AllowAnonymous]
        public ActionResult GetSingleProduct(int id)
        {
            var singleProduct = _productRepository.GetProduct(id);

            return Ok(singleProduct);
        }

        // Get all products method
        [HttpGet("GetAllProducts")]
        [AllowAnonymous]
        public ActionResult GetAllProducts()
        {
            var products = _productRepository.GetAll();

            return Ok(products);
        }

        // Update single product method
        [HttpPut("UpdateProduct/{id}")]
        public ActionResult UpdateProduct(Product product)
        {
            var updatedProduct = _productRepository.UpdateProduct(product);
            return Ok(product);
        }

        // Delete single product method
        [HttpDelete("DeleteProduct/{productId}")]
        public ActionResult DeleteProduct(int productId)
        {
            var productToDelete = _productRepository.DeleteProduct(productId);

            return Ok(productToDelete);
        }

        // Filter products by productTypeId method
        [HttpGet("FilterProductByType/{productTypeId}")]
        public ActionResult FilterProductByType(int productTypeId)
        {
            var productFilteredByType = _productRepository.FilterProductByType(productTypeId);

            return Ok(productFilteredByType);
        }
    }
}