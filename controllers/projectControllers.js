const Project = require('../models/Project');

exports.setTable = async function (req, res, next) {
  try {
    const projectData = req.body.table;
    const project = new Project(projectData);
    await project.save();
    res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

exports.getTable = async function (req, res, next) {
  try {
    const projectId = req.body.projectId;
    const project = await Project.findById(projectId).exec();
    res.status(200).json(project);
  } catch (error) {
    return next(error);
  }
};

exports.deleteTable = async function (req, res, next) {
  try {
    const projectId = req.body.projectId;
    await Project.findByIdAndDelete(projectId).exec();
    res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

exports.getAllProjects = async function (req, res, next) {
  try {
    const ownerId = req.body.ownerId;
    const projectList = await Project.find({ owner: ownerId })
      .select('title createdAt')
      .exec();
    res.status(200).json(projectList);
  } catch (error) {
    return next(error);
  }
};
