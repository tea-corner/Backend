import User from "../models/users.js"

class UserController{
    //test hmm? not work. WTF??
    async create(req,res){
        try{
            const userPost = req.body
            const user = await User.create(userPost)
            console.log(userPost)
            res.json(user)
        }catch (e) {
            res.json(e.message)
        }
    }
    async getAllUsers(req,res){
        try{
            const users = await User.find()
            res.json(users)
        }catch (e) {
            res.json(e.message)
        }
    }
}

export default new UserController()