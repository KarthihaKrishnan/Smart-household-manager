import express from "express";
import cors from "cors";
import healthRoutes from './src/routes/health.routes.js';
import groceryRoutes from './src/routes/grocery.routes.js';
import tasksRoutes from './src/routes/tasks.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request method: ${req.method}, Request path: ${req.path}`);
  next(); 
}); 

app.use('/api/health', healthRoutes);
app.use('/api/grocery', groceryRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found"});
});

app.use(errorHandler);

export default app;



