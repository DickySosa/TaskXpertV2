import express from 'express';
import cors from 'cors';
import { myDataSource } from './dbConfig/dbConfig';
import { usersCrud } from './services/user.service';
import { tasksCrud } from './services/task.service';
const {createUser, getAllUsers, getUser, updateUser, deleteUser} = usersCrud
const {createTask, getAllTasks, getTask, updateTask, deleteTask} = tasksCrud


const app = express();
app.use(express.json());
app.use(cors());

myDataSource
  .initialize()
  .then(() => {
    console.log('Connected to postgres database');
  })
  .catch((err) => {
    console.error('Error connecting to postgres database', err);
  });

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

// Users
app.post('/v1/api/user', createUser);
app.get('/v1/api/users', getAllUsers);
app.get('/v1/api/user/:id', getUser);
app.put('/v1/api/user/:id', updateUser)
app.delete('/v1/api/user/:id',deleteUser)

// Tasks
app.post('/v1/api/task', createTask);
app.get('/v1/api/tasks', getAllTasks);
app.get('/v1/api/task/:id', getTask);
app.put('/v1/api/task/:id', updateTask)
app.delete('/v1/api/task/:id',deleteTask)