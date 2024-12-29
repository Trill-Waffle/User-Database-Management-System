import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, assignRole } from '../modules/user-tools.js';
import logger from '../logger.js';
import { userSchema } from '../modules/validation.js';


const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        if (users) {
            logger.info('Fetched all users');
            res.status(200).json(users);
        } else {
            logger.warn('No users found');
            res.status(404).send('No users found');
        }
    } catch (err) {
        logger.error(`Error fetching users: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

userRouter.get('/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (user) {
            logger.info(`Fetched user with ID: ${req.params.id}`);
            res.status(200).json(user);
        } else {
            logger.warn(`User with ID ${req.params.id} not found`);
            res.status(404).send('User not found');
        }
    } catch (err) {
        logger.error(`Error fetching user with ID ${req.params.id}: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

userRouter.post('/register', async (req, res) => {
    try {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        
        const createdUser = await createUser(value);
        if (createdUser) {
            logger.info(`Created new user: ${createdUser.username}`);
            res.status(201).json(createdUser);
        } else {
            logger.warn('Failed to create user');
            res.status(400).send('Failed to create user');
        }
    } catch (err) {
        logger.error(`Error creating user: ${err.message}`);
        if (err.message === 'Both username and password are required' || err.message === 'A user with that username already exists') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

userRouter.put('/:id', async (req, res) => {
    try {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedUser = await updateUser(req.params.id, value);
        if (updatedUser) {
            logger.info(`Updated user with ID: ${req.params.id}`);
            res.status(200).json(updatedUser);
        } else {
            logger.warn(`User with ID ${req.params.id} not found`);
            res.status(404).send('User not found');
        }
    } catch (err) {
        logger.error(`Error updating user with ID ${req.params.id}: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

userRouter.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await deleteUser(req.params.id);
        if (deletedUser) {
            logger.info(`Deleted user with ID: ${req.params.id}`);
            res.status(200).json(deletedUser);
        } else {
            logger.warn(`User with ID ${req.params.id} not found`);
            res.status(404).send('User not found');
        }
    } catch (err) {
        logger.error(`Error deleting user with ID ${req.params.id}: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

userRouter.put('/:id/:role', async (req, res) => {
    try {
        const { id, role } = req.params;
        const userWithRole = await assignRole(id, role);
        if (userWithRole) {
            logger.info(`Assigned role ${role} to user with ID: ${id}`);
            res.status(200).json(userWithRole);
        } else {
            logger.warn(`User with ID ${id} not found`);
            res.status(404).send('User not found');
        }
    } catch (err) {
        logger.error(`Error assigning role to user with ID ${id}: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

export default userRouter;
