using SkullAndDaisy.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using System.Linq;
using Microsoft.Extensions.Options;

namespace SkullAndDaisy.Data
{
    public class OrderRepository
    {
        const string ConnectionString = "Server = localhost; Database = SkullAndDaisy; Trusted_Connection = True;";

        public static List<Order> GetBySeller(int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var orders = db.Query<Order>("select * from orders").ToList();

                var productOrders = ProductOrderRepository.GetAll();

                var products = db.Query<Product>(@"select * 
                    from Products 
                    where userId = @userId",
                    new { userId }).ToList();

                HashSet<Order> matchingOrders = new HashSet<Order>();

                if (products != null)
                {
                    foreach (var product in products)
                    {
                        var matchingProductOrders = productOrders.Where(productOrder => productOrder.ProductId == product.Id).ToList();

                        foreach (var productOrder in matchingProductOrders)
                        {
                            Order match = orders.Where(order => order.Id == productOrder.OrderId).FirstOrDefault();
                            matchingOrders.Add(match);
                        }
                    }

                    var listedOrders = matchingOrders.ToList();
                    var ordersWithProducts = FilterProducts(listedOrders);
                    return ordersWithProducts;
                }
                
            }

            throw new Exception("Found no orders");
        }

        public static Order AddOrder(string orderStatus, decimal total, DateTime orderDate, int paymentTypeId, int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
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

               

                var orders = FilterProducts(myorders);

                return orders;
            }

            throw new Exception("Found No Orders");
        }

        public static List<Order> GetByStatus(int userId, string orderStatus)
        {
            using(var db = new SqlConnection(ConnectionString))
            {
                var filteredOrders = db.Query<Order>(
                    @"select Id, OrderStatus, OrderDate, Total, PaymentTypeId, UserId
                    from Orders
                    where UserId = @userId and OrderStatus = @orderStatus",
                    new { userId, orderStatus }).ToList();

                var orders = FilterProducts(filteredOrders);

                return orders;
            
            }

            throw new Exception("Found No Orders");
        }


        public static List<Order> FilterProducts(List<Order> orders)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                if (orders != null)
                {
                    var productOrders = ProductOrderRepository.GetAll();

                    var products = db.Query<Product>("select * from Products").ToList();

                    

                    foreach (var order in orders)
                    {
                        var matchingProductOrders = productOrders.Where(productOrder => productOrder.OrderId == order.Id).ToList();

                        List<Product> theProducts = new List<Product>();

                        foreach (var productOrder in matchingProductOrders)
                        {
                            var matchingProducts = products.Where(product => product.Id == productOrder.ProductId).FirstOrDefault();

                            theProducts.Add(matchingProducts);
                        }

                        order.Products = theProducts;
                    }
                    return orders;
                }
            }

            throw new Exception("Found no orders");
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
