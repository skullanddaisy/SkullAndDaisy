using SkullAndDaisy.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using System;

namespace SkullAndDaisy.Data
{
    public class ProductOrderRepository
    {
        public static List<ProductOrder> _productOrders = new List<ProductOrder>();

        const string ConnectionString = "Server = localhost; Database = SkullAndDaisy; Trusted_Connection = True;";

        public static ProductOrder AddProductOrder(int productId, int orderId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var newProductOrder = db.QueryFirstOrDefault<ProductOrder>(@"
                    Insert into ProductOrders
                    Output inserted.*
                    Values(@productId, @orderId)",
                    new {productId, orderId});

                if (newProductOrder != null)
                {
                    return newProductOrder;
                }
            }

            throw new Exception("No ProductOrder created");
        }
    }
}
