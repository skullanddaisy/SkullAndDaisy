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
        readonly string _connectionString;
        readonly ProductOrderRepository _productOrderRepository;
        readonly ProductRepository _productRepository;

        public OrderRepository(IOptions<DbConfiguration> dbConfig, ProductOrderRepository productOrderRepository, ProductRepository productRepository)
        {
            _connectionString = dbConfig.Value.ConnectionString;
            _productRepository = productRepository;
            _productOrderRepository = productOrderRepository;
        }

        public List<Order> GetBySeller(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var orders = db.Query<Order>("select * from orders").ToList();

                var productOrders = _productOrderRepository.GetAll();

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
                    var ordersWithProducts = FilterProductsByUserId(listedOrders, userId);

                    return ordersWithProducts;
                }               
            }

            throw new Exception("Found no orders");
        }

        public Order AddOrder(string orderStatus, decimal total, DateTime orderDate, int paymentTypeId, int userId)
        {
            using (var db = new SqlConnection(_connectionString))
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

        public List<Order> GetAll(int userId)
        {
            using(var db = new SqlConnection(_connectionString))
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

        public List<Order> GetByStatus(int userId, string orderStatus)
        {
            using(var db = new SqlConnection(_connectionString))
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

        public List<Order> FilterProductsByUserId(List<Order> orders, int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                if (orders != null)
                {
                    var productOrders = _productOrderRepository.GetAll();

                    var products = _productRepository.FilterProductsByUser(userId).ToList();

                    foreach (var order in orders)
                    {
                        var matchingProductOrders = productOrders.Where(productOrder => productOrder.OrderId == order.Id).ToList();

                        List<Product> theProducts = new List<Product>();

                        foreach (var productOrder in matchingProductOrders)
                        {
                            var matchingProducts = products.Where(product => product.Id == productOrder.ProductId).FirstOrDefault();

                            if (matchingProducts != null)
                            {
                                matchingProducts.Quantity = productOrder.Quantity;
                                theProducts.Add(matchingProducts);
                            }
                        }

                        order.Products = theProducts;
                    }
                    return orders;
                }
            }

            throw new Exception("Found no orders");
        }

        public List<Order> FilterProducts(List<Order> orders)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                if (orders != null)
                {
                    var productOrders = _productOrderRepository.GetAll();

                    var products = _productRepository.GetAll().ToList();

                    foreach (var order in orders)
                    {
                        List<Product> theProducts = new List<Product>();

                        var matchingProductOrders = productOrders.Where(productOrder => productOrder.OrderId == order.Id).ToList();

                        foreach (var productOrder in matchingProductOrders)
                        {
                            var matchingProduct = products.Where(product => product.Id == productOrder.ProductId).FirstOrDefault();

                            matchingProduct.Quantity = productOrder.Quantity;

                            if (matchingProduct != null)
                            {
                                theProducts.Add(matchingProduct);
                            }
                        }

                        order.Products = theProducts;
                    }
                    return orders;
                }
            }

            throw new Exception("Found no orders");
        }

        public decimal GetThisMonthsSales(int userId)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var monthlySum = db.ExecuteScalar<decimal>(
                    @"SELECT SUM(o.total)
                    FROM orders o
                    join productorders po on po.orderId = o.Id
                    join products p on p.id = po.productid
                    WHERE o.OrderDate >= DATEADD(month, -1, GETDATE())
                    AND  o.OrderStatus != 'Pending'
                    AND p.UserId = @userId",

                    new { userId });

                return monthlySum;
            }
            throw new Exception("Could not find sales for this month.");
        }

        public Order UpdateOrder(int id, string orderStatus, decimal total, DateTime orderDate, int paymentTypeId, int userId)
        {
            using(var db = new SqlConnection(_connectionString))
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
        public decimal GetTotalCompletedSales (int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var totalSales = db.ExecuteScalar<decimal>(
                    @"SELECT SUM(o.total)
                    FROM orders o
                    JOIN productorders po on po.orderId = o.Id
                    JOIN products p on p.id = po.productid
                    WHERE o.OrderStatus != 'Pending'
                    AND p.UserId = @userId",

                    new { userId });

                return totalSales;
            }
            throw new Exception("Could not find sales.");
        }

        public List<Object> GetItemsToShip(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var unshippedItems = db.Query<Object>(
                    @"select u.Id as SellerId, o.OrderDate, u.FirstName, u.LastName, u.Username, u.Email, p.Title, po.Quantity, p.Price, o.Total, po.shipped
                      from orders o
                      join productorders po on po.orderid = o.id
                      join products p on p.id = po.ProductId
                      join users u on u.Id = o.UserId
                      where o.orderstatus = 'Complete'
                      and po.shipped = 0
                      and p.UserId = @userId",
                      new { userId }).ToList();

                return unshippedItems;
            }
            throw new Exception("Could not find sales for this month.");
        }
    }
}
