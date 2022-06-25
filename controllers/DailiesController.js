import cron from "node-cron"
import Dailies from "../models/Dailies.js"
import User from "../models/Users.js";

class DailiesController {

    constructor() {
        cron.schedule('00 00 * * *', function () {
            Dailies.updateMany({}, {completed: false}, function(err, result) {
                console.log("dailies is updating, competed = false")
            })
        })
    }

    async createDailies(req, res) {
        try {
            const DailiesPost = req.body
            const newDailies = await Dailies.create(DailiesPost)
            console.log(DailiesPost)
            res.json(newDailies)
        } catch (e) {
            res.json(e.message)
        }
    }

    async updateDailies(req, res) {
        try {
            const d = await Dailies.findOne({name: req.query.name, userNickname: req.query.nickname})
            const user = await User.findOne({userNickname: req.query.nickname})
            let balance = user.balance
            let hp = user.hp
            let exp = user.exp
            let level = user.level
            exp = exp + d.difficult
            if(exp % 30  === 0){
                level++
                exp = 0
            }
            balance += d.difficult
            const  result = await User.updateOne(
                {userNickname: req.query.nickname},
                {$set: {
                        balance: balance,
                        hp: hp,
                        exp: exp,
                        level: level
                    }
                }) //updateOne
            const del = await Dailies.updateOne({userNickname: req.query.nickname, name: req.query.name},{
                $set: {
                    completed: !d.completed
                }
            })
            res.json({
                balance: balance,
                hp: hp,
                level: level,
                exp: exp
            })
        }
        catch(e) {
            console.log("Update dailies\n" + e)
        }

    }

    async getDailies(req,res){
        try {
            Dailies.find({userNickname: req.query.nickname}, function (err, docs) {
                if (err) console.log(err)
                res.json(docs)
            })
        } catch (e){
            res.json(e.message)
        }
    }

}
export default new DailiesController()