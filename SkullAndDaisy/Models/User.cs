using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkullAndDaisy.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }

        // Items user is selling
        public List<Product> Products { get; set; }

        // Methods of payment
        public List<PaymentType> PaymentTypes { get; set; }

        // Order history
        public List<Order> Orders { get; set; }
    }
}
