import User from "../models/Users.js"
import Inventory from "../models/Inventory.js";

class UserController{

    //регистрация
    async create(req,res){
        try {
            const isDB = await User.findOne( {userNickname: req.body.userNickname} )
            console.log(isDB)
            if (isDB === null) {
                console.log("getUserExam is not DB")
                const newUser = await User.create(req.body)
                res.json(newUser)
            } else {
                console.log("getUserExam in DB")
                res.json(null)
            }
        }catch (e) {
            res.json(e.message)
        }
    }

    //Авторизация
    async getUser(req,res){
        try {
            const user = req.body
            const isDB = await User.findOne( {userNickname: user.userNickname} )
            if (isDB === null) {
                console.log("User not found")
                res.json("User not found")
            } else {
                if (user.password === isDB.password) {
                    res.json(isDB)
                } else {
                    console.log("Invalid password")
                    res.json("Invalid password!")
                    //TODO
                }
            }
        } catch (e){
            res.json(e.message)
        }
    }

    async getAllUsers(req,res){
        try {
            const users = await User.find()
            res.json(users)
        }catch (e) {
            res.json(e.message)
        }
    }
    async deleteUser(req,res){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.json(user)
        } catch(e) {

        }
    }
}

export default new UserController()