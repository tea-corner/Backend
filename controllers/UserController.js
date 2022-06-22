import User from "../models/Users.js"
import Inventory from "../models/Inventory.js";
import Dailies from "../models/Dailies.js";
import Habits from "../models/Habits.js";
import ToDo from "../models/ToDo.js";

class UserController{

    //регистрация
    async create(req,res){
        try {
            const isDB = await User.findOne( {userNickname: req.body.userNickname} )
            console.log(isDB)
            if (isDB === null) {
                console.log("getUserExam is not DB")
                const newUser = await User.create(req.body)
                const inventory = await Inventory.create({userNickname: req.body.userNickname})
                const habits = await Habits.find( {userNickname: req.body.userNickname} )
                const dailies = await Dailies.find( {userNickname: req.body.userNickname} )
                const toDo = await ToDo.find( {userNickname: req.body.userNickname} )

                res.json({
                    user: newUser,
                    habits: habits,
                    dailies: dailies,
                    toDO: toDo,
                    inventory: inventory
                })

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
                    const inventory = await Inventory.findOne({userNickname: isDB.userNickname})
                    const habits = await Habits.find( {userNickname: isDB.userNickname} )
                    const dailies = await Dailies.find( {userNickname: isDB.userNickname} )
                    const toDo = await ToDo.find( {userNickname: isDB.userNickname} )

                    res.json({
                        user: isDB,
                        habits: habits,
                        dailies: dailies,
                        todo: toDo,
                        inventory: inventory
                    })
                } else {
                    console.log("Invalid password")
                    res.json("Invalid password")
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