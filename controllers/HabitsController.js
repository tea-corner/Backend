
import Habit from "../models/Habits.js";
import Users from "../models/Users.js";
import User from "../models/Users.js";
import express from "express";

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
           const h = await Habit.findOne({name: req.body.name, userNickname: req.params.nickname})
           const user = await User.findOne({userNickname: req.params.nickname})
           console.log(user)
           let counter = h.counter
           if (req.body.completed) {
               counter = counter + 1
               const result = await User.updateOne({userNickname: req.params.nickname}, {$set: {balance: user.balance + 5}})
               console.log(result)
           } else {
               counter = counter - 1
               if (counter < 0) counter = 0
               let b = user.balance - 5
               if (b < 0) b = 0
               const result = await User.updateOne({userNickname: req.params.nickname}, {$set: {balance: b}})
               console.log(result)
           }
           if (counter === h.duration) {
               //Привычка завершилась, надо удалить
               await Habit.findOneAndDelete({name: req.body.name}, function (err, result) {
                   console.log("delete habit \n" + result)
                   res.json(null)
               })
           } else {
               await Habit.findOneAndUpdate(
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
            const h = await Habit.findOne({userNickname: req.params.userNickname})
            if (h == null) {
                console.log("404")
            }
            res.json(h)
            console.log(h)
        } catch (e){
            res.json(e.message)
        }
    }

}
export default new HabitsController()