import express from "express";
import cors from "cors";
import healthRoutes from './routes/health.routes.js';
import groceryRoutes from './routes/grocery.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request method: ${req.method}, Request path: ${req.path}`);
  next(); 
}); 

app.use('/api/health', healthRoutes);
app.use('/api/grocery-items', groceryRoutes);
app.use('/api/tasks', tasksRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found"});
});

export default app;



