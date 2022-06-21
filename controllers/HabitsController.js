
import Habit from "../models/Habits.js";

class HabitsController {

    async createHabit(req,res) {
        try {
            const habitPost = req.body
            const newHabit = await Habit.create(habitPost)
            console.log(habitPost)
            res.json(newHabit)
        } catch (e) {
            res.json(e.message)
        }
    }

    //TODO дописать функцию, когда привычка не выполнена
    async updateHabit(req, res) {
       try {
           const h = await Habit.findOne({name: req.body.name})
           console.log(h)
           const counter = h.counter + 1
           if (counter === h.duration) {
               //Привычка завершилась, надо удалить
               Habit.findOneAndDelete({name: req.body.name}, function (err, result) {
                   console.log("delete habit \n" + result)
                   res.json(null)
               })
           } else {
               Habit.findOneAndUpdate(
                   {name: req.body.name},
                   {$set: {counter: counter}},
                   {
                       returnDocument: "after"
                   },
                   function (err, result) {
                       res.json(result)
                   }
               )
           }

       } catch(e) {
        console.log("Update Habit\n" + e)
       }
    }

    async getHabit(req,res){
        try {
            const inventory = await Habit.findOne({userNickname: req.params.userNickname})
            if (inventory == null) {
                console.log("404")
            }
            res.json(inventory)
            console.log(inventory)
        } catch (e){
            res.json(e.message)
        }
    }

}
export default new HabitsController()