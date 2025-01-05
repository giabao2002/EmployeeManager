const Joi = require('joi');
const { Project, ProjectValidation } = require('../Models/Project');

const getAllProjects = (req, res) => {
  Project.find().exec((err, project) => {
    if (err) {
      console.log(err);
      res.send("err");
    } else {
      res.send(project);
    }
  });
};

const createProject = (req, res) => {
  Joi.validate(req.body, ProjectValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let project = {
        ProjectTitle: req.body.ProjectTitle,
        ProjectURL: req.body.ProjectURL,
        ProjectDesc: req.body.ProjectDesc,
        EstimatedTime: req.body.EstimatedTime,
        EstimatedCost: req.body.EstimatedCost,
        ResourceID: req.body.ResourceID,
        Status: req.body.Status,
        Remark: req.body.Remark,
      };
      Project.create(project, (err, project) => {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          res.send(project);
          console.log("Dự án mới đã lưu");
        }
      });
    }
  });
};

const updateProject = (req, res) => {
  Joi.validate(req.body, ProjectValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updateProject = {
        ProjectTitle: req.body.ProjectTitle,
        ProjectURL: req.body.ProjectURL,
        ProjectDesc: req.body.ProjectDesc,
        EstimatedTime: req.body.EstimatedTime,
        EstimatedCost: req.body.EstimatedCost,
        ResourceID: req.body.ResourceID,
        Status: req.body.Status,
        Remark: req.body.Remark,
      };

      Project.findByIdAndUpdate(req.params.id, updateProject, (err, Project) => {
        if (err) {
          res.send("Error");
        } else {
          res.send(updateProject);
        }
      });
    }
    console.log("put");
  });
};

const deleteProject = (req, res) => {
  Project.findByIdAndRemove({ _id: req.params.id }, (err, project) => {
    if (err) {
      console.log("Error");
      res.send("err");
    } else {
      console.log("Dự án đã xóa");
      res.send(project);
    }
  });
  console.log("delete");
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
