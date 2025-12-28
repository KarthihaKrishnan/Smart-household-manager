import express from "express";
import healthRoutes from './routes/health.routes.js';
import groceryRoutes from './routes/grocery.routes.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request method: ${req.method}, Request path: ${req.path}`);
  next(); 
}); 

app.use('/api/health', healthRoutes);
app.use('/api', groceryRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found"});
});

export default app;



