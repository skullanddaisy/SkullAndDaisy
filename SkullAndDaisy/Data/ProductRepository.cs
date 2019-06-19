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

        public Product AddProduct(string title, string description, string imageUrl, int productTypeId, decimal price, int quantity, int userId)
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
                                [ImageUrl],
                                [UserId])
                    output inserted.*
                            VALUES
                                (@productTypeId,
                                 @price,
                                 @quantity,
                                 @title,
                                 @description,
                                 @imageUrl,
                                 @userId)";

                var parameters = new
                {
                    ProductTypeId = productTypeId,
                    Price = price,
                    Quantity = quantity,
                    Title = title,
                    Description = description,
                    ImageUrl = imageUrl,
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

        public IEnumerable<Product> GetLatestProducts()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var latestProducts = db.Query<Product>(@"SELECT TOP(20)
                                                        *
                                                        FROM
                                                        Products
                                                        ORDER BY
                                                        Id desc").ToList();
                return latestProducts;
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
                        [ProductTypeId] = @productTypeId,
                        [Description] = @description,
                        [Quantity] = @quantity,
                        [UserId] = @userId
                     WHERE id = @id";

                var rowAffected = db.Execute(updateQuery, productToUpdate);

                if (rowAffected == 1)
                {
                    return productToUpdate;
                }
                throw new Exception("Could not update product");
            }
        }

        public Product DeleteProduct(int productId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deletedProduct = db.QueryFirstOrDefault<Product>(
                    @"Delete from Products
                        Output deleted.*
                        Where Id = @productId",
                        new { productId });

                if (deletedProduct != null)
                {
                    return deletedProduct;
                }
            }

            throw new Exception("Product did not delete.");
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
