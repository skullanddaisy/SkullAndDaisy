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
    public class ProductsController : ControllerBase
    {
        ProductRepository _productRepository;

        public ProductsController()
        {
            _productRepository = new ProductRepository();
        }

        [HttpPost("CreateProduct")]
        public ActionResult AddProduct(CreateProductRequest createRequest)
        {
            _productRepository = new ProductRepository();

            var newProduct = _productRepository.AddProduct(
                createRequest.Title,
                createRequest.Description,
                createRequest.ProductTypeId,
                createRequest.Price,
                createRequest.Quantity,
                createRequest.UserId);

            return Created($"/api/target/{newProduct.Id}", newProduct);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleProduct(int id)
        {
            var singleProduct = _productRepository.GetProduct(id);

            return Ok(singleProduct);
        }

        [HttpGet("GetAllProducts")]
        public ActionResult GetAllProducts()
        {
            var products = _productRepository.GetAll();

            return Ok(products);
        }

        [HttpPut("UpdateProduct/{id}")]
        public ActionResult UpdateProduct(Product product)
        {
            var updatedProduct = _productRepository.UpdateProduct(product);
            return Ok(product);
        }

        [HttpDelete("DeleteProduct/{productId}")]
        public ActionResult DeleteProduct(int productId)
        {
            var productToDelete = _productRepository.DeleteProduct(productId);

            return Ok(productToDelete);
        }
    }
}