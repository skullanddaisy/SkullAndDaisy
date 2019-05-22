using SkullAndDaisy.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SkullAndDaisy.Data
{
    public class OrderRepository
    {

        public static List<Order> _orders = new List<Order>();

        const string ConnectionString = "Server = localhost; Database = SkullAndDaisy; Trusted_Connection = True;";

        static Order AddOrder(string orderStatus, decimal total, DateTime orderDate, int paymentTypeId, int userId)
        {
            using(var db = new SqlConnection(ConnectionString))
            {
                var newOrderObject = 
            }
        }
    }
}
