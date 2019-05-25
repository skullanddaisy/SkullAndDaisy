using SkullAndDaisy.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using System.Linq;

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
                    Insert into Orders(OrderStatus, Total, OrderDate, PaymentTypeId, UserId)
                    Output inserted.*
                    Values(@orderStatus, @total, @orderDate, @paymentTypeId, @userId)",
                    new { orderStatus, total, orderDate, paymentTypeId, userId });

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
                var myorders = db.Query<Order>(
                    @"select Id, OrderStatus, OrderDate, Total, PaymentTypeId, UserId
                    from Orders
                    where UserId = @userId",
                    new { userId }).ToList();

                if (myorders != null)
                {
                    return myorders;
                }
            }

            throw new Exception("Found No Orders");
        }

        public static List<Order> GetCompleted(int userId)
        {
            using(var db = new SqlConnection(ConnectionString))
            {
                var completedOrders = db.Query<Order>(
                    @"select Id, OrderStatus, OrderDate, Total, PaymentTypeId, UserId
                    from Orders
                    where UserId = @userId and OrderStatus = 'complete'",
                    new { userId }).ToList();

                if (completedOrders != null)
                {
                    return completedOrders;
                }
            }

            throw new Exception("Found No Orders");
        }

        public static List<Order> GetCancelled(int userId)
        {
            using(var db = new SqlConnection(ConnectionString))
            {
                var cancelledOrders = db.Query<Order>(
                    @"select Id, OrderStatus, OrderDate, Total, PaymentTypeId, UserId
                    from Orders
                    where UserId = @userId and OrderStatus = 'cancelled'",
                    new { userId }).ToList();

                if (cancelledOrders != null)
                {
                    return cancelledOrders;
                }
            }

                throw new Exception("Found No Orders");
        }


        public static Order GetPending(int userId)
        {
            using(var db = new SqlConnection(ConnectionString))
            {
                var pendingOrder = db.QueryFirstOrDefault<Order>(
                    @"select Id, OrderStatus, Total, OrderDate, PaymentTypeId, UserId
                    from Orders
                    where UserId = @userId and OrderStatus = 'pending'",
                    new { userId });

                if (pendingOrder != null)
                {
                    return pendingOrder;
                }
            }

            throw new Exception("Found No Orders");
        }

    }
}
