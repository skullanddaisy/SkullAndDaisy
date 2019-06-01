using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkullAndDaisy.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderStatus { get; set; }
        public decimal Total { get; set; }
        public DateTime OrderDate { get; set; }
        public int PaymentTypeId { get; set; }
        public int UserId { get; set; }

        public List<Product> Products { get; set; }

    }

    internal enum OrderStatus
    {
        Complete,
        Cancelled,
        Pending
    }
}
