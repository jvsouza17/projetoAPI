import express from 'express';

import { deleteUser, getAllUsers, updatedUser } from '../controllers/userCtrl';
import { isAuthenticated, isOwner } from '../middlewares/middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id',isAuthenticated, isOwner, deleteUser);
    router.put('/users/:id', isAuthenticated, isOwner, updatedUser);
}