using Dapper;
using Microsoft.Extensions.Options;
using SkullAndDaisy.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SkullAndDaisy.Data
{
    public class ProductTypeRepository
    {
        readonly string _connectionString;

        public ProductTypeRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }
        public ProductType AddProductType(string name)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var insertQuery = @"
                    INSERT INTO [dbo].[ProductTypes]
                                ([Name])
                    output inserted.*
                            VALUES
                                (@name)";

                var parameters = new
                {
                    Name = name
                };

                var newProductType = db.QueryFirstOrDefault<ProductType>(insertQuery, parameters);

                if (newProductType != null)
                {
                    return newProductType;
                }
                throw new Exception("Could not create productType");
            }

        }
        // Get single product method
        public ProductType GetProductType(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var singleProductType = db.QueryFirstOrDefault<ProductType>(@"
                    Select * From ProductTypes
                    WHERE id = @id",
                    new { id });

                return singleProductType;
            }
        }

        public IEnumerable<ProductType> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var productTypes = db.Query<ProductType>("Select * from ProductTypes").ToList();

                return productTypes;
            }
        }

        public ProductType UpdateProductType(ProductType productTypeToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                UPDATE [dbo].[ProductTypes]
                     SET[Name] = @name
                     WHERE id = @id";

                //var parameters = new
                //{
                //    name = productTypeToUpdate.Name,
                //    id = productTypeToUpdate.Id
                //};

                var rowAffected = db.Execute(updateQuery, productTypeToUpdate);

                if (rowAffected == 1)
                {
                    return productTypeToUpdate;
                }
                throw new Exception("Could not update productType");
            }
        }

        public bool DeleteProductType(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deleteQuery = @"
                DELETE FROM [dbo].[ProductTypes]
                WHERE id = @id";

                var parameter = new
                {
                    Id = id
                };

                var productTypeToDelete = db.Execute(deleteQuery, parameter);

                if (productTypeToDelete == 1)
                {
                    return true;
                }
                throw new Exception("Could not delete productType");
            }
        }
    }
}
