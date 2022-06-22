import Dailies from "../models/Dailies.js"

class DailiesController {

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
            const dailies = await Dailies.findOne({name: req.body.name})
            const completed = dailies.completed   //ToDo
            console.log(completed)

            Dailies.findOneAndUpdate(
                {name: req.body.name},
                {$set: {completed: !completed}},
                {
                    returnDocument: "after"
                },
                function (err, result) {
                    res.json(result)
                })
        }
        catch(e) {
            console.log("Update dailies\n" + e)
        }

    }

    async getDailies(req,res){
        try {
            const Dailies = await Dailies.findOne({userNickname: req.params.userNickname})
            if (Dailies == null) {
                console.log("404")
            }
            res.json(Dailies)
            console.log(Dailies)
        } catch (e){
            res.json(e.message)
        }
    }

}
export default new DailiesController()