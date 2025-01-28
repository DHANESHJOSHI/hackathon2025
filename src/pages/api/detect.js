import { detectThreats } from '../../lib/aiService';
import connectDB from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const { data } = req.body;
      const result = await detectThreats(data);
      res.status(200).json({ result });
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Error detecting threats' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}