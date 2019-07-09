using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkullAndDaisy.Models
{
    public class CreatePaymentTypeRequest
    {
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public int UserId { get; set; }
        public bool IsActive { get; set; }
    }
}
