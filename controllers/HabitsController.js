
import Habit from "../models/Habits.js";
import User from "../models/Users.js";
import cron from "node-cron";


class HabitsController {

    constructor() {
        cron.schedule('00 00 * * *', function () {
            Habit.updateMany({}, {dayCount: 0}, function(err, result) {
                console.log("habits is updating, dayCount = 0")
            })
        })
    }

    async createHabit(req,res) {
        try {
            const habitPost = req.body
            const newHabit = await Habit.create(habitPost)
            console.log(habitPost)
            res.json(newHabit)
        } catch (e) {
            res.json(e.message)
        }
    } //createHabit

    //TODO дописать функцию, когда привычка не выполнена
    async updateHabit(req, res) {
       try {
           const h = await Habit.findOne({name: req.query.name, userNickname: req.query.nickname})
           console.log(h)
           const user = await User.findOne({userNickname: req.query.nickname})

           let counter = h.counter
           let balance = user.balance
           let hp = user.hp
           let exp = user.exp
           let level = user.level

           let dayCount = h.dayCount

           if (dayCount >= 1) { //наверное надо что-то поменять
               res.json({
                   habit: h,
                   balance: balance,
                   hp: hp,
                   exp: exp,
                   level: level
               })
               return
           }

           if (req.query.completed) {
               counter = counter + 1
               exp = exp + h.difficult
               balance = balance + h.difficult
               if (exp % 30 === 0) { //FIXME нужно сделать значение при котором level удет обновляться
                   level++
                   exp = 0
               }

               const result = await User.updateOne(
                   {userNickname: req.query.nickname},
                   {$set: {
                            balance: balance,
                            hp: hp,
                            exp: exp,
                            level: level
                        }
                   }) //updateOne

               console.log(result)
           } else {
               counter = counter - 1
               if (counter < 0) counter = 0

               balance = (balance - h.difficult < 0) ? 0 : balance - h.difficult

               /*
               если ph кончилось, то мы проигрываем, обновляем его, а остальные показатели обнуляем
               level остаетс неизменным(но это под вопросом еще).
               TODO нужно удаить предметы из инвентаря
                */
               hp = hp - h.difficult
               exp = (exp - h.difficult < 0) ? 0 : exp - h.difficult
               if (hp <= 0) {
                   hp = 50
                   balance = 0
                   exp = 0
               } //if

               const result = await User.updateOne(
                   {userNickname: req.query.nickname},
                   {$set: {
                           balance: balance,
                           hp: hp,
                           exp: exp,
                           level: level
                       }
                   }) //updateOne

               console.log(result)
           } //else
           if (counter === h.duration) { //Привычка завершилась, надо удалить

               await Habit.findOneAndDelete({name: req.query.name}, function (err, result) {
                   console.log("delete habit \n" + result)
                   res.json({
                       habit: null,
                       balance: balance
                   })
               }) //finOneAndUpdate

           } else {
                Habit.findOneAndUpdate(
                    {name: req.query.name, userNickname: req.query.nickname},
                   {$set: {counter: counter, dayCount: dayCount + 1}},
                   {
                       returnDocument: "after"
                   },
                   function (err, result) {
                       res.json({habit: result,
                           balance: balance,
                           hp: hp,
                           exp: exp,
                           level: level
                       })
                   }
               ) //findOneAndUpdate
           } //else

       } catch(e) {
        console.log("Update Habit\n" + e)
       }
    } //updateHabit

    async getHabits(req,res){
        try {
            Habit.find({userNickname: req.query.nickname}, function (err, docs) {
                if (err) console.log(err)
                res.json(docs)
            })

        } catch (e){
            res.json(e.message)
        }
    } //getHabit

}
export default new HabitsController()