import express from "express";
import cors from "cors";
import servicesRoutes from "./src/routes/services.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/services", servicesRoutes);

app.get("/", (req, res) => {
  res.send("Egypt Gov API is running...");
});

export default app;