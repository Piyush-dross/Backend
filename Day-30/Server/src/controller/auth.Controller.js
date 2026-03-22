export async function registerUser(req,res,next){
    res.status(200).json({
        message:"user registered successfully"
    })
    // try{

        // throw new Error("Encountered an error while registring new user")
        // throw new Error("password is to weak")
    //     throw new Error("user already exist,with same emmail")
    // }
    // catch(err){
    //     err.status=409
        // err.status=400
    //     next(err)
    // }

}