import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Egypt Gov API is working!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/locations', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*');
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Export for Vercel Serverless
export default app;

// Local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}