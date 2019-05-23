using SkullAndDaisy.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;

namespace SkullAndDaisy.Data
{
    public class OrderRepository
    {

        public static List<Order> _orders = new List<Order>();

        const string ConnectionString = "Server = localhost; Database = SkullAndDaisy; Trusted_Connection = True;";

        public static Order AddOrder(string orderStatus, decimal total, DateTime orderDate, int paymentTypeId, int userId)
        {
            using(var db = new SqlConnection(ConnectionString))
            {
                var newOrderObject = db.QueryFirstOrDefault<Order>(@"
                    Insert into Orders
                    Output inserted.*
                    Values(@orderStatus, @total, @orderDate, @paymentTypeId, @userId)",
                    new {orderStatus, total, orderDate, paymentTypeId, userId });

                if (newOrderObject != null)
                {
                    return newOrderObject;
                }
            }

            throw new Exception("No Order Created");
        }

        public static List<Order> GetAll(int userId)
        {
            using(var db = new SqlConnection(ConnectionString))
            {
                var orders = db.Query<Order>("");
            }

            throw new Exception("Found No Orders");
        }
    }
}
