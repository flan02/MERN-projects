import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthentifiedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId
    try {
        if (!authenticatedUserId) throw createHttpError(401, "User not authenticated")
        const foundUser = await UserModel.findById(authenticatedUserId).select("+email").exec()
        res.status(200).json(foundUser)
    } catch (error) {
        next(error)
    }
}

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    const passwordRaw = req.body.password
    try {
        if (!username || !email || !passwordRaw) throw createHttpError(400, "Missing fields")
        const foundUser = await UserModel.findOne({ username }).exec()
        if (foundUser) throw createHttpError(409, "Username already exists")
        const foundEmail = await UserModel.findOne({ email }).exec()
        if (foundEmail) throw createHttpError(409, "Email already exists")
        const paswordHashed = await bcrypt.hash(passwordRaw, 10)
        const newUser = await UserModel.create({ username, email, password: paswordHashed })
        req.session.userId = newUser._id
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

interface LoginBody {
    username?: string,
    password?: string
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    try {
        if (!username || !password) throw createHttpError(400, "Missing fields")
        const user = await UserModel.findOne({ username }).select("+password +email").exec()
        if (!user) throw createHttpError(401, "Invalid credentials")
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) throw createHttpError(401, "Invalid credentials")
        req.session.userId = user._id
        res.status(201).json(user)
    } catch (error) { next(error) }
}

export const logout: RequestHandler = async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) throw next(err)
            res.status(204).end()
        })
    } catch (error) { next(error) }
}