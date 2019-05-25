using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkullAndDaisy.Models
{
    public class PaymentType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AccountNo { get; set; }
        public int UserId { get; set; }
    }
}
