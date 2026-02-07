import express from "express";
import cors from "cors";
import servicesRoutes from './routes/services.routes.js';
const app = express();
app.set('json spaces', 2);
app.use(cors());
app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use('/api/services', servicesRoutes);
app.get("/", (req, res) => {
  res.send("Egypt Gov API is running...");
});
export default app;