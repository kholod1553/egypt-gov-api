import express from "express";
import cors from "cors";
import servicesRoutes from './routes/services.routes.js';
const app = express();
app.set('json spaces', 2);
app.use(cors());
app.use(express.json());
app.use('/api', servicesRoutes);
app.get("/", (_req, res) => {
  res.send("Egypt Gov API is running...");
});
export default app;