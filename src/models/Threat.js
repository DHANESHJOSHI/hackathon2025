import mongoose from 'mongoose';

const threatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['ddos', 'malware', 'phishing', 'bruteforce', 'anomaly', 'zero-day'],
    required: true
  },
  severity: { type: Number, min: 0, max: 10, required: true },
  sourceIp: { type: String, required: true },
  metadata: {
    analysis: mongoose.Schema.Types.Mixed,
    model: { type: String, default: process.env.MODEL_NAME }
  },
  detectedAt: { type: Date, default: Date.now },
  mitigated: { type: Boolean, default: false }
});

export default mongoose.models.Threat || mongoose.model('Threat', threatSchema);