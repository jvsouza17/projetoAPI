import express from 'express'
import { deleteUserById, getUserById, getUsers, updateUserById } from '../db/users'
import { get } from 'lodash';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updatedUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if(!username){
            return res.sendStatus(400);
        }

        const updatedUser = await updateUserById(id, req.body);
        await updatedUser.save();

        const user = await getUserById(id);

        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}