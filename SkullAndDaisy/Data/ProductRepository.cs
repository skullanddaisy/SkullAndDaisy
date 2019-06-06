using Dapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SkullAndDaisy.Data
{
    public class ProductRepository
    {
        readonly string _connectionString;

        public ProductRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public Product AddProduct(string title, string description, int productTypeId, decimal price, int quantity, int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var insertQuery = @"
                    INSERT INTO [dbo].[Products]
                                ([ProductTypeId],
                                [Price],
                                [Quantity],
                                [Title],
                                [Description],
                                [UserId])
                    output inserted.*
                            VALUES
                                (@productTypeId,
                                 @price,
                                 @quantity,
                                 @title,
                                 @description,
                                 @userId)";

                var parameters = new
                {
                    ProductTypeId = productTypeId,
                    Price = price,
                    Quantity = quantity,
                    Title = title,
                    Description = description,
                    UserId = userId
                };

                var newProduct = db.QueryFirstOrDefault<Product>(insertQuery, parameters);

                if (newProduct != null)
                {
                    return newProduct;
                }
                throw new Exception("Could not create product");
            }

        }
        // Get single product method
        public Product GetProduct(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var singleProduct = db.QueryFirstOrDefault<Product>(@"
                    Select * From Products
                    WHERE id = @id",
                    new { id });

                return singleProduct;
            }
        }

        public IEnumerable<Product> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var products = db.Query<Product>("Select * from Products").ToList();

                return products;
            }
        }

        public Product UpdateProduct(Product productToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                UPDATE [dbo].[Products]
                     SET[Price] = @price,
                        [Title] = @title,
                        [Description] = @description,
                        [Quantity] = @quantity
                     WHERE id = @id";

                var rowAffected = db.Execute(updateQuery, productToUpdate);

                if (rowAffected == 1)
                {
                    return productToUpdate;
                }
                throw new Exception("Could not update product");
            }
        }

        public bool DeleteProduct(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deleteQuery = @"
                DELETE FROM [dbo].[Products]
                WHERE id = @id";

                var parameter = new
                {
                    Id = id
                };

                var productToDelete = db.Execute(deleteQuery, parameter);

                if (productToDelete == 1)
                {
                    return true;
                }
                throw new Exception("Could not delete product");
            }
        }

        public IEnumerable<Product> FilterProductByType(int productTypeId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var productsFilteredByType = db.Query<Product>(@"
                SELECT * FROM Products
                WHERE ProductTypeId = @productTypeId",
                new { productTypeId }).ToList();

                return productsFilteredByType;
            }
        }

        public IEnumerable<Product> FilterProductsByUser(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var productsFilteredByUser = db.Query<Product>(@"
                SELECT * FROM Products
                WHERE UserId = @userId",
                new { userId }).ToList();

                return productsFilteredByUser;
            }
        }
    }
}
