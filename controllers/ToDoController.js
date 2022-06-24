import ToDo from "../models/ToDo.js";
import User from "../models/Users.js"
import HabitsController from "./HabitsController.js";
import router from "../routes/routess.js";

class ToDoController {

    async createToDo(req,res) {
        try {
            const toDoPost = req.body
            const newToDo = await ToDo.create(toDoPost)
            console.log(toDoPost)
            res.json(newToDo)
        } catch (e) {
            res.json(e.message)
        }
    }

    async updateToDo(req, res) {
        try {

            const t = await ToDo.findOne({name: req.query.name, userNickname: req.query.nickname})
            const user = await User.findOne({userNickname: req.query.nickname})
            let balance = user.balance
            let hp = user.hp
            let exp = user.exp
            let level = user.level
            exp = exp + 5
            if(exp % 30  === 0){
                level++
                exp = 0
            }
            balance += 5
            const  result = await User.updateOne(
                {userNickname: req.query.nickname},
                {$set: {
                        balance: balance,
                        hp: hp,
                        exp: exp,
                        level: level
                    }
                }) //updateOne
            const del = await ToDo.deleteOne({userNickname: req.query.nickname, name: req.query.name})
            res.json({
                balance: balance,
                hp: hp,
                level: level,
                exp: exp
            })
        } catch(e) {
            console.log("Update todo\n" + e)
        }
    }

    async getToDo(req,res){
        try {
            ToDo.find({userNickname: req.query.nickname}, function (err, docs) {
                if (err) console.log(err)
                res.json(docs)
            })
        } catch (e){
            res.json(e.message)
        }
    }

}
export default new ToDoController()