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
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }
        public IEnumerable<User> GetAllUsers()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>("Select * from Users").ToList();

                var paymentTypes = db.Query<PaymentType>("Select * from PaymentTypes").ToList();

                var products = db.Query<Product>("Select * from Products").ToList();

                var orders = db.Query<Order>("Select * from Orders").ToList();

                foreach (var user in users)
                {
                    user.PaymentTypes = paymentTypes.Where(paymentType => paymentType.UserId == user.Id).ToList();
                    user.Products = products.Where(product => product.UserId == user.Id).ToList();
                    user.Orders = orders.Where(order => order.UserId == user.Id).ToList();
                }

                return users;
            }
        }

        public User GetSingleUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var paymentTypes = db.Query<PaymentType>("Select * from PaymentTypes").ToList();

                var products = db.Query<Product>("Select * from Products").ToList();

                var orders = db.Query<Order>("Select * from Orders").ToList();

                var user = db.QueryFirstOrDefault<User>(@"
                    Select * From users
                    Where id = @id",
                    new { id });

                user.Orders = orders.Where(order => order.UserId == user.Id).ToList();
                user.PaymentTypes = paymentTypes.Where(paymentType => paymentType.UserId == user.Id).ToList();
                user.Products = products.Where(product => product.UserId == user.Id).ToList();

                return user;
            }
        }

        public User AddUser(string firstName, string lastName, string username, string email, string password)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[Users](
                        [FirstName],
                        [LastName],
                        [Username],
                        [Email],
                        [Password])
                    Output inserted.*
                    Values(@firstname, @lastname, @username, @email, @password)";

                var parameters = new
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Username = username,
                    Email = email,
                    Password = password,
                };

                var newUser = db.QueryFirstOrDefault<User>(insertQuery, parameters);

                if (newUser != null)
                {
                    return newUser;
                }
            }

            throw new Exception("Could not create user");
        }

        public User UpdateUser(User userToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                        Update Users
                        Set firstName = @firstname,
                            lastName = @lastname,
                            username = @username,
                            email = @email,
                            password = @password
                        Where id = @id";

                var rowsAffected = db.Execute(updateQuery, userToUpdate);

                if (rowsAffected == 1)
                    return userToUpdate;
            }

            throw new Exception("Could not update user");
        }

        public bool DeleteUserAccount(User userToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                    Update Users
                    Set firstname = null,
                        lastname = null,
                        email = null,
                        password = null
                    Where id = @id";

                var rowsAffected = db.Execute(updateQuery, userToUpdate);

                if (rowsAffected == 1)
                    return true;
            }

            throw new Exception("Could not delete account");
        }
    }
}
