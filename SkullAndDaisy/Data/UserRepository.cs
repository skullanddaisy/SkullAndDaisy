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

        public User UpdateUser(User userToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
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
            using (var db = new SqlConnection(ConnectionString))
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
