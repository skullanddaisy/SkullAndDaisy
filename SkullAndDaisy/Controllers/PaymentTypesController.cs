using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkullAndDaisy.Models;
using SkullAndDaisy.Data;
using Microsoft.AspNetCore.Authorization;

namespace SkullAndDaisy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypesController : SecureControllerBase
    {
        readonly PaymentTypeRepository _paymentTypeRepository;

        public PaymentTypesController(PaymentTypeRepository paymentTypeRepository)
        {
            _paymentTypeRepository = paymentTypeRepository;
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
                createRequest.UserId,
                createRequest.IsActive);

            return Created($"/api/paymenttype/{newPaymentType.Id}", newPaymentType);
        }

        [HttpPut("update/{id}")]
        public ActionResult UpdatePaymentType(PaymentType paymentType)
        {
            var updatedPaymentType = _paymentTypeRepository.UpdatePaymentType(paymentType);

            return Ok(paymentType);
        }

        [HttpPut("delete/{id}")]
        public ActionResult DeletePaymentType(int id)
        {
            var paymentTypeToDelete = _paymentTypeRepository.DeletePaymentType(id);

            return Ok(paymentTypeToDelete);
        }

    }
}