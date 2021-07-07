var express = require('express');
var app = express();
const moment = require('moment');
let m = moment();
const hbs = require('hbs');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
const Project = require('../models/project_model');
const bcrypt = require('bcryptjs');
exports.create = (req, res) => {
  /*Validation request*/
  if (!req.body.clientEmail || !req.body.client || !req.body.projectName) {
    return res.status(400).send({
      message: 'Required field can not be empty',
    });
  }
  /*create project*/
  const project = new Project({
    projectName: req.body.projectName,
    client: req.body.client,
    clientEmail: req.body.clientEmail,
    projectDetails: req.body.projectDetails,
    lastDate: req.body.lastDate,
    isSubmitted: req.body.isSubmitted,
    projectValue: req.body.projectValue
  })
  /*Save project to database*/
  project.save().then((data) => {
    res.status(200).render('alert', {
      var: 'Project Created successfully'
    });
  })
}
/**
 * Find all projects
 */
exports.findAll = (req, res) => {
  Project.find()
    .sort({ name: -1 })
    .then((projects) => {
      res.status(200).render('projects', {
        array: projects,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error Occured',
      });
    });
};

/*Find a project by id */
exports.findOne = (req, res) => {
  Project.findById(req.params.id).then((project) => {
    if (!project) {
      return res.status(404).send({
        message: 'project not found with the given Id',
      })
    }
    res.status(200).render('projectById', {
      project: project,
    });
  }).catch((err) => {
    return res.status(500).send({
      message: 'Error retrieving project with given id :' + req.params.id,
    });
  });
}
/*update a project with a given Id */
exports.UpdateProject = (req, res) => {
  /*Validation request*/
  if (!req.body.clientEmail || !req.body.client || !req.body.projectName) {
    return res.status(400).send({
      message: 'Required field can not be empty',
    });
  }

  Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: 'no project found',
        });
      }
      res.status(200).render('alert', { var: 'project updated succsessfully' });
    })
    .catch((err) => {
      return res.status(404).send({
        message: 'error while updating the post',
      });
    });
};

/**
 * Delete a project with the specified id in the request
 */
exports.delete = (req, res) => {
  Project.findByIdAndRemove(req.params.id)
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: 'project not found ',
        });
      }
      res.render('alert', { var: 'project Deleted succsessfully' });
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Could not delete project ',
      });
    });
};