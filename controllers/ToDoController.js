import ToDo from "../models/ToDo.js";


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
            const toDo = await ToDo.findOne({name: req.body.name})
            const completed = toDo.completed
            console.log(completed)
            if (completed) {
                //Задача завершилась, надо удалить
                ToDo.findOneAndDelete({name: req.body.name}, function (err, result) {
                    console.log("delete to-do \n" + result)
                    res.json(null)
                })
            } else {
                // ?????
                // ToDo.findOneAndUpdate(
                //     {name: req.body.name},
                //     {$set: {completed: !completed}},
                //     {
                //         returnDocument: "after"
                //     },
                //     function (err, result) {
                //         res.json(result)
                //     }
                // )
            }

        } catch(e) {
            console.log("Update todo\n" + e)
        }
    }

    async getToDo(req,res){
        try {
            const todo = await ToDo.findOne({userNickname: req.params.userNickname})
            if (todo == null) {
                console.log("404")
            }
            res.json(todo)
            console.log(todo)
        } catch (e){
            res.json(e.message)
        }
    }

}
export default new ToDoController()