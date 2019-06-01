using SkullAndDaisy.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using System;
using System.Linq;
using Microsoft.Extensions.Options;

namespace SkullAndDaisy.Data
{
    public class ProductOrderRepository
    {
        readonly string _connectionString;

        public ProductOrderRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public List<ProductOrder> GetAll()
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var allProductOrders = db.Query<ProductOrder>(@"
                    select Id, ProductId, OrderId
                    from ProductOrders").ToList();

                if (allProductOrders != null)
                {
                    return allProductOrders;
                }
            }

            throw new Exception("Found no Product Orders");
        }

        public List<ProductOrder> GetAllByOrderId(int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var filteredProductOrders = db.Query<ProductOrder>(@"
                    select Id, ProductId, OrderId
                    from ProductOrders
                    where OrderId = @orderId",
                    new { orderId }).ToList();

                if (filteredProductOrders != null)
                {
                    return filteredProductOrders;
                } 
            }

            throw new Exception("Found no Product Orders");
        }

        public ProductOrder AddProductOrder(int productId, int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newProductOrder = db.QueryFirstOrDefault<ProductOrder>(@"
                    Insert into ProductOrders(orderId, productId)
                    Output inserted.*
                    Values(@orderId, @productId)",
                    new {orderId, productId});

                if (newProductOrder != null)
                {
                    return newProductOrder;
                }
            }

            throw new Exception("No ProductOrder created");
        }

        public ProductOrder DeleteProductOrder(int productOrderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deletedProductOrder = db.QueryFirstOrDefault<ProductOrder>(
                    @"delete from ProductOrders
                    output deleted.*
                    where Id = @productOrderId",
                    new { productOrderId });

                if (deletedProductOrder != null)
                {
                    return deletedProductOrder;
                }
            }

            throw new Exception("Product Order did not delete");
        }
    }
}
