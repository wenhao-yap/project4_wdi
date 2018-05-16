const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (dbPool) => {
	return{
    create: (user, callback) => {
      const checkDuplicate = 'Select * FROM users WHERE username = $1';
      const values = [user.username];
      dbPool.query(checkDuplicate,values,(err,results) => {
        if(err){console.error(err);}
        if(results.rowCount > 0){
          callback(err,{duplicate:true});
        }
        else{
          bcrypt.hash(user.password,3,(err2,hashPass)=>{
            if(err2){console.error(err2);}
            const queryString = 'INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING id'
            const values = [
              user.username,
              user.email,
              hashPass
            ];  
            dbPool.query(queryString,values, (err3, results3) => {
              if(err3){console.error(err3);}
              callback(err, {duplicate:false});
            });
          })
        }
      })
    },

    login: (user, callback) => {
      const queryString = 'SELECT password,id,username from users WHERE username=$1';
      const values = [user.username];
      dbPool.query(queryString,values,(err,results) => {
        if(err){console.error(err);}
        if(results.rowCount == 0){
          callback(err, {userNotFound:true});
        } else {
          bcrypt.compare(user.password,results.rows[0].password,(err2, results2) => {
            if(results2){
              let payload = {
                id: results.rows[0].id,
                username:results.rows[0].username,
                loggedIn:true
              }
              console.log(payload);
              let token = jwt.sign(payload,'what-is-love',{expiresIn:'3h'});
              callback(err2,{token:token});
            }
            else{
              callback(err2,{invalidCredentials:true});
            }
          })
        }
      })
    }    
	}
}