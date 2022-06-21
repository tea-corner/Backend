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

    //Проверка на нахождение нового user в bd
    async getUserOne(req,res){
        try {
            const user = await User.findOne({nickname: "Lorex2"})
            if (user === null) {
                console.log("OK")
                res.json(user)
            } else {
                console.log("this user in db")
            }
        } catch (e){
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
    async deleteUser(req,res){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.json(user)
        } catch(e) {

        }

    }
}

export default new UserController()