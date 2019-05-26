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
    }
}
