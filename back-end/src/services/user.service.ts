import { myDataSource } from "../dbConfig/dbConfig";
import { User } from "../entity/user/user.entity";
import { Request, Response } from 'express';

const USER_REPOSITORY = myDataSource.getRepository(User)

export const createUser =async (req:Request, res:Response) => {
    const {username,email,password} = req.body
    try {
        const user = await USER_REPOSITORY.save({
            username, email, password
        })
        USER_REPOSITORY.save(user)
        res.status(200).json({message:"User saved in Database"});
    } catch (error) {
        console.log('ERROR >>>> ', error)
        res.status(500).json({message:"Error ocurred while saving user in Database"});
    }
}
export const getAllUsers =async (req:Request, res:Response) => {
    try {
        const users = await USER_REPOSITORY.find()
        res.status(200).json(users);
    } catch (error) {
        console.log('ERROR >>>> ', error)
        res.status(500).json({message:"Error ocurred while saving user in Database"});
    }
}
export const getUser =async (req:Request, res:Response) => {
    try {
        const userId = parseInt(req.params.id)
        const user = await USER_REPOSITORY.findOneBy({
            id: userId
        })
        if(user){
         res.status(200).json(user)
        } else {
            res.status(404).json({message: 'User was not found'})
        }
    } catch (error) {
        console.log('ERROR >>>> ', error)
        res.status(500).json({message: 'Unable to get user'})
    }
}
export const updateUser =async (req:Request, res:Response) => {
    const {username,email,password} = req.body
    const userId = parseInt(req.params.id)
    try {
        const user = await USER_REPOSITORY.save({
            id: userId,username, email, password
        })
        USER_REPOSITORY.save(user)
        res.status(200).json({message:"User updated correctly"});
    } catch (error) {
        console.log('ERROR >>>> ', error)
        res.status(500).json({message:"Error ocurred while updating user in Database"});
    }
}
export const deleteUser =async (req:Request, res:Response) => {
    try {
        const gameId = parseInt(req.params.id)
        const game = await USER_REPOSITORY.delete({
          id: gameId
        })
        if (game.affected === 1) {
          res.json({message:"User delete successfully"});
        } else {
          res.status(404).json({message:"User does not exist"});
        }
        console.log(game);
      } catch (error) {
        console.log("Error ocurred while deleting user >>>>", error);
        res.status(500).json({message: "Error ocurred while deleting game"});
      }
}

export const usersCrud = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}