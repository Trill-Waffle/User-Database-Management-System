import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Path of the current file
const __filename = fileURLToPath(import.meta.url);
// Find the directory the current file is in
const __dirname = path.dirname(__filename);
// Define the file path for user data
const filePath = path.join(__dirname, 'user-data.json');

// Function to retrieve all users
export async function getAllUsers() {
    try {
        const data = await readFile(filePath, 'utf-8');
        const users = JSON.parse(data).users;
        return users;
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        return null;
    }
}

// Function to retrieve user details by ID
export async function getUserById(id) {
    try {
        const data = await readFile(filePath, 'utf-8');
        const users = JSON.parse(data).users;
        const user = users.find(user => user.id === id);
        return user || null;
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        return null;
    }
}
function generateRandomId() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}


export async function createUser(newUser) {
    try {
        if (!newUser.username || !newUser.password) {
            throw new Error('Both username and password are required');
        }

        const data = await readFile(filePath, 'utf-8');
        const usersData = JSON.parse(data);

        const existingUser = usersData.users.find(user => user.username === newUser.username);
        if (existingUser) {
            throw new Error('A user with that username already exists');
        }

        const id = generateRandomId();
        const userToCreate = { ...newUser, id, role: 'user' };

        usersData.users.push(userToCreate);
        await writeFile(filePath, JSON.stringify(usersData, null, 2), 'utf-8');
        return userToCreate;
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        return null;
    }
}

// Function to update user details
export async function updateUser(id, updatedUser) {
    try {
        const data = await readFile(filePath, 'utf-8');
        const usersData = JSON.parse(data);
        const userIndex = usersData.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return null;
        }

        usersData.users[userIndex] = { ...usersData.users[userIndex], ...updatedUser };
        await writeFile(filePath, JSON.stringify(usersData, null, 2), 'utf-8');
        return usersData.users[userIndex];
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        return null;
    }
}

// Function to delete a user
export async function deleteUser(id) {
    try {
        const data = await readFile(filePath, 'utf-8');
        const usersData = JSON.parse(data);
        const userIndex = usersData.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return null;
        }

        const [deletedUser] = usersData.users.splice(userIndex, 1);
        await writeFile(filePath, JSON.stringify(usersData, null, 2), 'utf-8');
        return deletedUser;
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        return null;
    }
}

// Function to assign a role to a user
export async function assignRole(id, role) {
    try {
        const data = await readFile(filePath, 'utf-8');
        const usersData = JSON.parse(data);
        const user = usersData.users.find(user => user.id === id);

        if (!user) {
            return null;
        }

        user.role = role;
        await writeFile(filePath, JSON.stringify(usersData, null, 2), 'utf-8');
        return user;
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        return null;
    }
}