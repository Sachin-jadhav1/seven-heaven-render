const mongoose = require('mongoose');

const clanSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  tag: { type: String, required: true, unique: true },
  leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['Leader', 'Co-Leader', 'Member'], default: 'Member' },
      joinDate: { type: Date, default: Date.now },
    },
  ],
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  description: String,
  emblem: String,
  settings: {
    type: {
      type: String,
      enum: ['Open', 'InviteOnly', 'Closed'],
      default: 'Open',
    },
    minLevelToJoin: { type: Number, default: 1 },
  },
}, { timestamps: true });

module.exports = mongoose.model('Clan-club', clanSchema);

