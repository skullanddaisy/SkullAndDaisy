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

        [HttpPost("CreateProduct")]
        public ActionResult AddProduct(CreateProductRequest createRequest)
        {
            _productRepository = new ProductRepository();

            var newProduct = _productRepository.AddProduct(
                createRequest.Title,
                createRequest.ProductTypeId,
                createRequest.Price,
                createRequest.UserId);

            return Created($"/api/target/{newProduct.Id}", newProduct);
        }

        [HttpGet("GetProducts")]
        public ActionResult GetAllProducts()
        {
            var products = _productRepository.GetAll();

            return Ok(products);
        }

        [HttpPut("UpdateProduct")]
        public ActionResult UpdateProduct(Product product)
        {
            var updatedProduct = _productRepository.UpdateProduct(
                                                    product.Id,
                                                    product.Title,
                                                    product.Description,
                                                    product.Quantity,
                                                    product.ProductTypeId,
                                                    product.Price,
                                                    product.UserId);
            return Ok(updatedProduct);
        }

        [HttpDelete("DeleteProduct")]
        public ActionResult DeleteProuct(Product product)
        {
            var productToDelete = _productRepository.DeleteProduct(product.Id);

            return Ok(productToDelete);
        }
    }
}