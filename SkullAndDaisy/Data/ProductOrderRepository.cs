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
                    select Id, ProductId, OrderId, Quantity
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
                    select Id, ProductId, OrderId, Quantity
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

        public ProductOrder GetSingleByIds(int orderId, int productId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var singleProductOrder = db.QueryFirstOrDefault<ProductOrder>(@"
                    select Id, ProductId, OrderId, Quantity, Shipped
                    from ProductOrders
                    where OrderId = @orderId and ProductId = @productId",
                    new { orderId, productId });

                if (singleProductOrder != null)
                {
                    return singleProductOrder;
                }
            }

            throw new Exception("Found no Product Orders");
        }

        public ProductOrder AddProductOrder(int productId, int orderId, int quantity, bool shipped)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newProductOrder = db.QueryFirstOrDefault<ProductOrder>(@"
                    Insert into ProductOrders(orderId, productId, quantity, shipped)
                    Output inserted.*
                    Values(@orderId, @productId, @quantity, @shipped)",
                    new {orderId, productId, quantity, shipped});

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

        public ProductOrder UpdateProductOrder(int id, int productId, int orderId, int quantity, bool shipped)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updatedProductOrder = db.QueryFirstOrDefault<ProductOrder>(@"
                    update ProductOrders
                    set ProductId = @productId,
                    OrderId = @orderId,
                    Quantity = @quantity,
                    Shipped = @shipped
                    output inserted.*
                    where Id = @id",
                    new { productId, orderId, quantity, shipped, id });

                if (updatedProductOrder != null)
                {
                    return updatedProductOrder;
                }
            }

            throw new Exception("Product Order did not update");
        }
    }
}
