using Dapper;
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
        const string ConnectionString = "Server=localhost;Database=SkullAndDaisy;Trusted_Connection=True;";

        public IEnumerable<User> GetAllUsers()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var users = db.Query<User>("Select * from Users").ToList();

                return users;
            }
        }

        public User AddUser(string firstName, string lastName, string username, string email, string password, DateTime dateCreated)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[Users](
                        [FirstName],
                        [LastName],
                        [Username],
                        [Email],
                        [Password],
                        [DateCreated])
                    Output inserted.*
                    Values(@firstname, @lastname, @username, @email, @password, @datecreated)";

                var parameters = new
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Username = username,
                    Email = email,
                    Password = password,
                    DateCreated = dateCreated
                };

                var newUser = db.QueryFirstOrDefault<User>(insertQuery, parameters);

                if (newUser != null)
                {
                    return newUser;
                }
            }

            throw new Exception("Could not create leaper");
        }
    }
}
