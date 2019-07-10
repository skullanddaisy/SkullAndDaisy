using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkullAndDaisy.Data;
using SkullAndDaisy.Models;

namespace SkullAndDaisy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypesController : SecureControllerBase
    {
        readonly ProductTypeRepository _productTypeRepository;

        public ProductTypesController(ProductTypeRepository productTypeRepository)
        {
            _productTypeRepository = productTypeRepository;
        }

        [HttpPost("CreateProductType")]
        public ActionResult AddProductType(CreateProductTypeRequest createRequest)
        {

            var newProductType = _productTypeRepository.AddProductType(
                createRequest.Name);

            return Created($"/api/target/{newProductType.Id}", newProductType);
        }

        // Get single product method
        [HttpGet("{id}")]
        public ActionResult GetSingleProductType(int id)
        {
            var singleProductTypes = _productTypeRepository.GetProductType(id);

            return Ok(singleProductTypes);
        }

        [HttpGet("GetAllProductTypes")]
        public ActionResult GetAllProductTypes()
        {
            var productTypes = _productTypeRepository.GetAll();

            return Ok(productTypes);
        }

        [HttpPut("UpdateProductType/{id}")]
        public ActionResult UpdateProductType(ProductType productType)
        {
            var updatedProductType = _productTypeRepository.UpdateProductType(productType);
            return Ok(productType);
        }

        [HttpDelete("DeleteProductType/{productTypeId}")]
        public ActionResult DeleteProductType(int productTypeId)
        {
            var productTypeToDelete = _productTypeRepository.DeleteProductType(productTypeId);

            return Ok(productTypeToDelete);
        }
    }
}