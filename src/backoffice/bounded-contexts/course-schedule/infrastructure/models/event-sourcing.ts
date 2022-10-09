import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  recordId: {
    type: String,
    required: true,
  },

  entity: {
    type: String,
    required: true,
  },

  action: {
    type: String,
    required: true,
  },

  data: Object,
});

export const EventSourcingModel = mongoose.model('EventSourcingModel', schema);
