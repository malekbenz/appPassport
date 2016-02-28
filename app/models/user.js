var bcrypt   = require('bcrypt-nodejs');
var _ =require('underscore');
// Memory user data
var users = require('./usersData');


// methods ======================

var apiUser = function(){
    return {
      validPassword : validPassword,
      generateHash : generateHash,
      findUser : findUser,
      findById : findById,
      createUser: createUser,
      save:save
    }
    // generating a hash
    function generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    function validPassword(firstPassword, SecondPassword) {
        return bcrypt.compareSync(firstPassword, SecondPassword);
    };

    function findById(id, callback){

      var user = _.find(users, function(user){return user.id == id});
      if (user)
              {
                callback(null,user);
              }
      else
              {
              callback(null,null);
              }
    };

    function findUser(email, callback){
       user = _.find(users, function(user){return user.local.email == email;});
      if (user)
              callback(null,user);
      else
              callback(null,null);
    };

    function createUser(userName, password){

      return {
              local   : {
                      email        : userName,
                      password     : generateHash(password)
                        }
                }
    };
    function save(user, callback){

       user.id = users.length + 1;
       users.push(user);

      if (user)
              callback(null,user);
      else
              callback(null,null);
    };

}

module.exports = apiUser();
