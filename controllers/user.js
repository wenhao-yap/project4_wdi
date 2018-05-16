/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

const create = (db) => {
  return (request, response) => {
		db.user.create(request.body, (error, queryResult) => {
			if(queryResult.duplicate){
				response.status(401).json({failed:'This user has already been registered.'});
			}
			else if(queryResult.duplicate == false){
				response.status(500).json({success:'New user has been created'});
			}
		})
	}  
};

const login = (db) => {
  return (request, response) => {
    db.user.login(request.body, (error, queryResult) => {
    	if(queryResult.invalidCredentials){
        response.status(401).json({failed:'Unauthorized Access'});
      }
      else if(queryResult.userNotFound){
        response.status(401).json({failed:'User is not found'});
      } 
      else {
    		response.status(200).json({
    			success:'You have logged in',
    			token: queryResult.token});
      }     
    })
  }
};


 /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  create,
  login
} 