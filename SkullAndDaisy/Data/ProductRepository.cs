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

        public Product AddProduct(string title, string description, int productTypeId, decimal price, int quantity, int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
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

        public Product GetProduct(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
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
            using (var db = new SqlConnection(ConnectionString))
            {
                var products = db.Query<Product>("Select * from Products").ToList();

                return products;
            }
        }

        public Product UpdateProduct(Product productToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
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
            using (var db = new SqlConnection(ConnectionString))
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
    }
}
