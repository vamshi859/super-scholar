import express from 'express';
import passport from 'passport';
import bycrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import Users from "../models/auth.js";


export const signup = async (req,res) => {
    const {email,password} = req.body;
    try {
        const existinguser = await Users.findOne({email});
        if(existinguser){
            return res.status(404).json({message: "User already exists."})
          }
          
        const hashedPassword = await bycrypt.hash(password,12)
        const user =await Users.create({email,password:hashedPassword});
        const token = jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).json({result:user,token})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const existinguser = await Users.findOne({email});
        if(!existinguser){
        return res.status(404).json({message:"User does not exist."})
        }
        const isPasswordCrt = await bycrypt.compare(password,existinguser.password);
        if(!isPasswordCrt){
        return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({email:existinguser.email,id:existinguser._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).json({result:existinguser,token})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}