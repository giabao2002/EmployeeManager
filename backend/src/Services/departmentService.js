const Joi = require('joi');
const { Department, DepartmentValidation } = require('../Models/Department');
const { Employee } = require('../Models/Employee');

exports.getDepartments = (req, res) => {
  Department.find()
    .populate('company')
    .exec((err, departments) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(departments);
    });
};

exports.createDepartment = (req, res) => {
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) {
      return res.status(400).send(err.details[0].message);
    }
    const newDepartment = { DepartmentName: req.body.DepartmentName };
    Department.create(newDepartment, (err, department) => {
      if (err) {
        return res.status(500).send('Error');
      }
      res.send(department);
    });
  });
};

exports.updateDepartment = (req, res) => {
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) {
      return res.status(400).send(err.details[0].message);
    }
    const updateDepartment = { DepartmentName: req.body.DepartmentName };
    Department.findByIdAndUpdate(req.params.id, updateDepartment, (err, department) => {
      if (err) {
        return res.status(500).send('Error');
      }
      res.send(updateDepartment);
    });
  });
};

exports.deleteDepartment = (req, res) => {
  Employee.find({ department: req.params.id }, (err, employees) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (employees.length > 0) {
      return res.status(403).send('Phòng ban này đang tồn tại nhân viên nên không thể xóa phòng ban này');
    }
    Department.findByIdAndRemove(req.params.id, (err, department) => {
      if (err) {
        return res.status(500).send('Error');
      }
      res.send(department);
    });
  });
};
