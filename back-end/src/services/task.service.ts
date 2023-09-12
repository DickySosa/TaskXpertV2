import { myDataSource } from "../dbConfig/dbConfig";
import { Task } from "../entity/task/task.entity";
import { Request, Response } from 'express';


const TASK_REPOSITORY = myDataSource.getRepository(Task)

export const createTask =async (req:Request, res:Response) => {
    const {taskName,date,responsable, description} = req.body
    try {
        const task = await TASK_REPOSITORY.save({
            taskName, date, responsable,description
        })
        TASK_REPOSITORY.save(task)
        res.status(200).json({message:"Task saved in Database"});
    } catch (error) {
        console.log('ERROR >>>> ', error)
        res.status(500).json({message:"Error ocurred while saving task in Database"});
    }
}
export const getAllTasks =async (req:Request, res:Response) => {
    try {
        const tasks = await TASK_REPOSITORY.find()
        res.status(200).json(tasks);
    } catch (error) {
        console.log('ERROR >>>> ', error)
        res.status(500).json({message:"Error ocurred while saving task in Database"});
    }
}
export const getTask =async (req:Request, res:Response) => {
    try {
        const taskId = parseInt(req.params.id)
        const task = await TASK_REPOSITORY.findOneBy({
            id: taskId
        })
        if(task){
         res.status(200).json(task)
        } else {
            res.status(404).json({message: 'task was not found'})
        }
    } catch (error) {
        console.log('ERROR >>>> ', error)
        res.status(500).json({message: 'Unable to get task'})
    }
}
export const updateTask =async (req:Request, res:Response) => {
    const {taskName,date,responsable, description} = req.body
    const taskId = parseInt(req.params.id)
    try {
        const task = await TASK_REPOSITORY.save({
            id: taskId,taskName, date, responsable, description
        })
        TASK_REPOSITORY.save(task)
        res.status(200).json({message:"task updated correctly"});
    } catch (error) {
        console.log('ERROR >>>> ', error)
        res.status(500).json({message:"Error ocurred while updating task in Database"});
    }
}
export const deleteTask =async (req:Request, res:Response) => {
    try {
        const gameId = parseInt(req.params.id)
        const game = await TASK_REPOSITORY.delete({
          id: gameId
        })
        if (game.affected === 1) {
          res.json({message:"task delete successfully"});
        } else {
          res.status(404).json({message:"task does not exist"});
        }
        console.log(game);
      } catch (error) {
        console.log("Error ocurred while deleting task >>>>", error);
        res.status(500).json({message: "Error ocurred while deleting game"});
      }
}

export const tasksCrud = {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}