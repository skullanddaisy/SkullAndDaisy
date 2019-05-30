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
        const string ConnectionString = "Server = localhost; Database = SkullAndDaisy; Trusted_Connection = True;";

        public static List<Order> FilterProducts(List<Order> orders, List<ProductOrder> productOrders, List<Product> products)
        {
            if (orders != null)
            {
                foreach (var order in orders)
                {
                    var matchingProductOrders = productOrders.Where(productOrder => productOrder.OrderId == order.Id).ToList();

                    foreach (var productOrder in matchingProductOrders)
                    {
                        var matchingProducts = products.Where(product => product.Id == productOrder.ProductId).ToList();

                        order.Products = matchingProducts;
                    }
                }
                return orders;
            }

            throw new Exception("Found no orders");
        }

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

                var productOrders = ProductOrderRepository.GetAll();

                var products = db.Query<Product>("select * from Products").ToList();

                var orders = FilterProducts(myorders, productOrders, products);

                return orders;
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

                var productOrders = ProductOrderRepository.GetAll();

                var products = db.Query<Product>("select * from Products").ToList();

                var orders = FilterProducts(completedOrders, productOrders, products);

                return orders;
            
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

                var productOrders = ProductOrderRepository.GetAll();

                var products = db.Query<Product>("select * from Products").ToList();

                var orders = FilterProducts(cancelledOrders, productOrders, products);

                return orders;
            }

                throw new Exception("Found No Orders");
        }


        public static List<Order> GetPending(int userId)
        {
            using(var db = new SqlConnection(ConnectionString))
            {
                var pendingOrder = db.Query<Order>(
                    @"select Id, OrderStatus, Total, OrderDate, PaymentTypeId, UserId
                    from Orders
                    where UserId = @userId and OrderStatus = 'pending'",
                    new { userId }).ToList();

                var productOrders = ProductOrderRepository.GetAll();

                var products = db.Query<Product>("select * from Products").ToList();

                var orders = FilterProducts(pendingOrder, productOrders, products);

                return orders;
            }

            throw new Exception("Found No Orders");
        }

        public static Order UpdateOrder(int id, string orderStatus, decimal total, DateTime orderDate, int paymentTypeId, int userId)
        {
            using(var db = new SqlConnection(ConnectionString))
            {
                var updatedOrder = db.QueryFirstOrDefault<Order>(@"
                    update Orders
                    set OrderStatus = @orderStatus,
                    Total = @total,
                    OrderDate = @orderDate,
                    PaymentTypeId = @paymentTypeId,
                    UserId = @userId
                    output inserted.*
                    where Id = @id",
                    new {orderStatus, total, orderDate, paymentTypeId, userId, id});

                if (updatedOrder != null)
                {
                    return updatedOrder;
                }

            }

            throw new Exception("Order did not update");
        }
    }
}
