using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkullAndDaisy.Models
{
    public class ProductOrder
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int Quantity { get; set; }
        public bool Shipped { get; set; }
    }
}
