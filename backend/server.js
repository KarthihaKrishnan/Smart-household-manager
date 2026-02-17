import app from './src/app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
    process.exit(1); 
  }
  console.log(`Server is running on port ${PORT}`);
});