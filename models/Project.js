const { Schema, model, SchemaType } = require('mongoose');

const ProjectSchema = new Schema({
  instances: { type: Array, required: true },
  propertiesSchema: { type: Array, required: true }, // "schema" collides with mongoose internals, so I changed to propertiesSchema. Would propSchema be a better name?
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  createdAt: { type: Date, required: true },
});

module.exports = model('Project', ProjectSchema);
