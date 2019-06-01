using Dapper;
using Microsoft.Extensions.Options;
using SkullAndDaisy.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace SkullAndDaisy.Data
{
    public class PaymentTypeRepository
    {
        readonly string _connectionString;

        public PaymentTypeRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<PaymentType> GetAllPaymentTypesForUser(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var paymentTypesForUser = db.Query<PaymentType>(@"
                    Select * 
                    From PaymentTypes
                    Where userId = @userId",
                    new { userId }).ToList();

                return paymentTypesForUser;
            }
        }

        public PaymentType GetSinglePaymentType(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var paymentType = db.QueryFirstOrDefault<PaymentType>(@"
                    Select * from PaymentTypes
                    Where id = @id",
                    new { id });

                return paymentType;
            }
        }

        public PaymentType AddNewPaymentType(string name, int accountNumber, int userId, bool isActive)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[PaymentTypes](
                               [Name],
                               [AccountNumber],
                               [UserId],
                               [IsActive])
                    Output inserted.*
                    Values(@name, @accountNumber, @userId, @isActive)";

                var parameters = new
                {
                    Name = name,
                    AccountNumber = accountNumber,
                    UserId = userId,
                    IsActive = isActive
                };

                var newPaymentType = db.QueryFirstOrDefault<PaymentType>(insertQuery, parameters);

                if (newPaymentType != null)
                {
                    return newPaymentType;
                }
            }

            throw new Exception("Could not create a payment type");
        }

        public PaymentType UpdatePaymentType(PaymentType paymentTypeToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                        Update PaymentTypes
                        Set name = @name,
                            accountNumber = @accountNumber,
                            userId = @userId
                        Where id = @id";

                var rowsAffected = db.Execute(updateQuery, paymentTypeToUpdate);

                if (rowsAffected == 1)
                    return paymentTypeToUpdate;
            }

            throw new Exception("Could not update payment type");
        }

        public bool DeletePaymentType(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deleteQuery = @"
                    Update PaymentTypes
                    Set isActive = 0
                    Where id = @id";

                var parameters = new { Id = id };

                var rowsAffected = db.Execute(deleteQuery, parameters);

                if (rowsAffected == 1)
                {
                    return true;
                }

                throw new Exception("Could not delete payment type");
            }
        }
    }
}
