import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()

const login=async (req,res)=>{
    try {
        console.log("Login  section");
        console.log(req.body);
       const {email,password}=req.body;
       const user=await prisma.user.findUnique({
        where:{email},
        include:{ attendance: true }  // This includes all related attendance records
    })
       if(!user){
        console.log("user does not exist");
       return res.status(400).json({message:"User Doesnot exist"})
       }
       const passwordMatch=await bcrypt.compare(password,user.password)
       if(!passwordMatch){
        console.log("wrong password");
       return res.status(400).json({message:'Password wrong'})   
       }
       const payload={id:user.id,email:user.email,userName:user.userName}
       const key=process.env.JWT_KEY
       const token=jwt.sign(payload,key)
       console.log("login successfull",user);
       return res.status(200).json({message:"Login successfull",token})
    } catch (error) {
        console.error("error from login post section",error);
        res.status(500).json({ message: 'Server error',error });
    }

}

export default login;