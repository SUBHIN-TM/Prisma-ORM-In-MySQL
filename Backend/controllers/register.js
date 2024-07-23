// import User from '../models/user.js';
import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



const register = async (req, res) => {
    try {
        console.log("register page");
        console.log(req.body);
        const { userName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log('User Already Exists');
            return res.status(400).json({ message: 'User Already Exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                userName,
                email,
                password: hashedPassword
            }
        });

        console.log("user created", newUser);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

// const register = async (req, res) => {
//     try {
//         console.log("register page");
//         console.log(req.body);
//         const { userName, email, password } = req.body;
//         const exitstingUser=await User.findOne({where:{email}});
//         if(exitstingUser){
//             console.log('User Already Exists');
//             return res.status(400).json({message: 'User Already Exists'});
//         }
//         const hashedPassword=await bcrypt.hash(password,10);
//         const newUser=await User.create({userName,email,password:hashedPassword});
//         console.log("user created",newUser.dataValues);
//         res.status(201).json({message:'User registered succesfully',user:newUser})
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'internal server error' });
//     }
// };





export default register;
