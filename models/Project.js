const { Schema, model, SchemaType } = require('mongoose');

const ProjectSchema = new Schema({
  instances: { type: Array, required: true },
  schema: { type: Array, required: true },
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, required: true },
});

ProjectSchema.pre('save', async function (next) {
  this.createdAt = new Date();
  return next()
});

module.exports = model('Project', ProjectSchema);
