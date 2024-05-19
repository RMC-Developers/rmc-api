exports.middlewareForAdminRoute = async (req,res,next)=>{
 
    try {

        
        // add your logic.
        next();
    } catch (error) {
        console.log(error);
        const err = new Error(error.message);
            next(err);
    }
    
}

exports.middlewareForUserRoute = async (req,res,next)=>{
 
    try {

       
        // add your logic.
        next();
        
    } catch (error) {
        console.log(error);
        const err = new Error(error.message);
            next(err);
    }
    
}

exports.middlewareForAdminOneRoute = async (req,res,next)=>{
 
    try {

        
        // add your logic.
        next();
        
    } catch (error) {
        console.log(error);
        const err = new Error(error.message);
            next(err);
    }
    
}

exports.middlewareForUserOneRoute = async (req,res,next)=>{
 
    try {

        
        // add your logic.
        next();
        
    } catch (error) {
        console.log(error);
        const err = new Error(error.message);
            next(err);
    }
    
}


