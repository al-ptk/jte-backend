const Project = require('../models/Project');
const User = require('../models/User');

// Controllers that don't require table id

exports.getAllTables = async function (req, res, next) {
  try {
    const ownerId = req.user._id;
    const projectList = await Project.find({ owner: ownerId })
      .select('title createdAt')
      .exec();
    res.status(200).json(projectList);
  } catch (error) {
    return next(error);
  }
};

exports.newTable = async function (req, res, next) {
  try {
    const user = await User.findById(req.user._id).exec();
    const { instances, title, schema } = req.body.table;
    Project.create({
      instances: instances,
      title: title,
      propertiesSchema: schema, // "schema" collides with mongoose stuff, so I changed to propertiesSchema. Would propSchema be a better name?
      owner: user.id,
      createdAt: new Date(),
    });
    res.json({ message: 'Project created' });
  } catch (error) {
    return next(error);
  }
};

// Controllers that require table id

exports.getTable = async function (req, res, next) {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId).exec();
    if (!project) {
      return res.status(404).json({ message: 'No project found' });
    }
    res.status(200).json(project);
  } catch (error) {
    return next(error);
  }
};

exports.setTable = async function (req, res, next) {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      req.body.table,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'No project found' });
    }
    res.status(200).json(project);
  } catch (error) {
    return next(error);
  }
};

exports.deleteTable = async function (req, res, next) {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findByIdAndDelete(projectId).exec();
    if (!project) {
      return res.status(404).json({ message: 'No project found' });
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    return next(error);
  }
};
