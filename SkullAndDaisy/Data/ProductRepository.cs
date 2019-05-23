using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SkullAndDaisy.Data
{
    public class ProductRepository
    {
        const string ConnectionString = "Server=localhost;Database=SkullAndDaisy;Trusted_Connection=True;";

        public Product AddProduct(string title, int productTypeId, decimal price, int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    INSERT INTO [dbo].[Products]
                                ([ProductTypeId],
                                [Price],
                                [Title],
                                [UserId])
                    output inserted.*
                            VALUES
                                (@productTypeId,
                                 @price,
                                 @title,
                                 @userId)";

                var parameters = new
                {
                    ProductTypeId = productTypeId,
                    Price = price,
                    Title = title,
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

        public IEnumerable<Product> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var products = db.Query<Product>("Select * from Products").ToList();

                return products;
            }
        }

        public Product UpdateProduct(int id, string title, string description, int quantity, int productTypeId, decimal price, int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateQuery = @"
                UPDATE [dbo].[Products]
                     SET[ProductTypeId] = @productTypeId,
                        [Price] = @price,
                        [Title] = @title,
                        [Description] = @description,
                        [Quantity] = @quantity,
                        [UserId] = @userId
                     WHERE id = @id";

                var parameters = new
                {
                    Id = id,
                    ProductTypeId = productTypeId,
                    Price = price,
                    Title = title,
                    UserId = userId
                };

                var newProduct = db.QueryFirstOrDefault<Product>(updateQuery, parameters);

                if (newProduct != null)
                {
                    return newProduct;
                }
                throw new Exception("Could not update product");
            }
        }

        public Product DeleteProduct(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var deleteQuery = @"
                DELETE FROM [dbo].[Products]
                WHERE id = 1";

                var parameters = new
                {
                    Id = id
                };

                var productToDelete = db.QueryFirstOrDefault<Product>(deleteQuery, parameters);

                if (productToDelete != null)
                {
                    return productToDelete;
                }
                throw new Exception("Could not delete product");
            }
        }
    }
}
