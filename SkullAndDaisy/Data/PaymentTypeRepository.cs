using Dapper;
using SkullAndDaisy.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SkullAndDaisy.Data
{
    public class PaymentTypeRepository
    {
        const string ConnectionString = "Server=localhost;Database=SkullAndDaisy;Trusted_Connection=True;";

        public IEnumerable<PaymentType> GetAllPaymentTypesForUser(int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
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
            using (var db = new SqlConnection(ConnectionString))
            {
                var paymentType = db.QueryFirstOrDefault<PaymentType>(@"
                    Select * from PaymentTypes
                    Where id = @id",
                    new { id });

                return paymentType;
            }
        }

        public PaymentType AddNewPaymentType(string name, int accountNumber, int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[PaymentTypes](
                               [Name],
                               [AccountNumber],
                               [UserId])
                    Output inserted.*
                    Values(@name, @accountNumber, @userId)";

                var parameters = new
                {
                    Name = name,
                    AccountNumber = accountNumber,
                    UserId = userId
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
            using (var db = new SqlConnection(ConnectionString))
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
    }
}
