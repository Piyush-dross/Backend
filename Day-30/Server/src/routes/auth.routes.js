import { Router } from "express";
import { registerUser } from "../controller/auth.Controller.js";
import {body,validationResult} from "express-validator"


const authRouter=Router()

/**
 * /api/auth/register
 */

authRouter.post("/register",
    [
        body("username").isString().withMessage("username should be String"),
        body("email").isEmail().withMessage("Should be valid email address"),
        // body("password").isLength({ min: 6 ,max:12}).withMessage("Password must be at least 6 characters long"),
        body("password").custom((value)=>{
                if(value.length<6){
                    throw new Error("password should be atleast 6 characters long")
                }
                const passwordRegex=/^(?=.*[A-Z])(?=.*\d).+$/
                if(!passwordRegex.test(value)){
                    throw new Error ("password should contain at least one uppercase letter and one number")
                }
                return true
        }),
        // body('userid').isMongoId(),
        (req,res,next)=>{
            const errors=validationResult(req)
            if(errors.isEmpty()){
                return next()
            }
            res.status(400).json({
                errors:errors.array()
            })
        }
    ]
    ,registerUser)

export default authRouter