import app from './app.js';
import dotenv from "dotenv";
dotenv.config();

const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
    process.exit(1); 
  }
  console.log(`Server is running on port ${PORT}`);
});