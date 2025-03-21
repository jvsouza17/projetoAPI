import { get } from 'lodash';
import mongoose from 'mongoose';

//SCHEMA

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    authentication: {
        password: { type: String, required: true, select: false},
        salt: { type: String, select: false},
        sessionToken: { type: String, select: false},
    },
});

//MODEL

export const UserModel = mongoose.model('User', UserSchema);

//Read
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({'authentication.sessionToken': sessionToken});
export const getUserById = (id: string) => UserModel.findById(id);

//Create
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user)=> user.toObject());

//Delete
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id})

//Update
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)