using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkullAndDaisy.Models;
using SkullAndDaisy.Data;

namespace SkullAndDaisy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypesController : ControllerBase
    {
        readonly PaymentTypeRepository _paymentTypeRepository;

        public PaymentTypesController()
        {
            _paymentTypeRepository = new PaymentTypeRepository();
        }

        [HttpGet("{userId}/all")]
        public ActionResult GetAllPaymentTypesForUser(int userId)
        {
            var paymentTypes = _paymentTypeRepository.GetAllPaymentTypesForUser(userId);

            return Ok(paymentTypes);
        }

        [HttpGet("{id}")]
        public ActionResult GetSinglePaymentType(int id)
        {
            var paymentType = _paymentTypeRepository.GetSinglePaymentType(id);

            return Ok(paymentType);
        }

        [HttpPost("create")]
        public ActionResult AddPaymentType(CreatePaymentTypeRequest createRequest)
        {
            var newPaymentType = _paymentTypeRepository.AddNewPaymentType(
                createRequest.Name,
                createRequest.AccountNumber,
                createRequest.UserId);

            return Created($"/api/paymenttype/{newPaymentType.Id}", newPaymentType);
        }

    }
}