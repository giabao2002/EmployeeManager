const Joi = require("joi");
const { Employee } = require("../Models/Employee");
const { WorkExperience, WorkExperienceValidation } = require("../Models/WorkExperience");

exports.getWorkExperience = (req, res) => {
  Employee.findById(req.params.id)
    .populate({ path: "workExperience" })
    .select("FirstName LastName MiddleName")
    .exec((err, employee) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(employee);
      }
    });
};

exports.createWorkExperience = (req, res) => {
  Joi.validate(req.body, WorkExperienceValidation, (err) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, (err, employee) => {
        if (err) {
          res.status(500).send(err);
        } else {
          const newWorkExperience = {
            CompanyName: req.body.CompanyName,
            Designation: req.body.Designation,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate,
          };

          WorkExperience.create(newWorkExperience, (err, workExperience) => {
            if (err) {
              res.status(500).send(err);
            } else {
              employee.workExperience.push(workExperience);
              employee.save((err) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.send(workExperience);
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.updateWorkExperience = (req, res) => {
  const {id, ...workExperience} = req.body;
  Joi.validate(workExperience, WorkExperienceValidation, (err) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      const newWorkExperience = {
        CompanyName: req.body.CompanyName,
        Designation: req.body.Designation,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate,
      };

      WorkExperience.findByIdAndUpdate(req.body.id, newWorkExperience, (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(newWorkExperience);
        }
      });
    }
  });
};

exports.deleteWorkExperience = (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (err) {
      res.status(500).send(err);
    } else {
      WorkExperience.findByIdAndRemove(req.params.id2, (err, workExperience) => {
        if (err) {
          res.status(500).send(err);
        } else {
          Employee.update(
            { _id: req.params.id },
            { $pull: { workExperience: req.params.id2 } },
            (err) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send(workExperience);
              }
            }
          );
        }
      });
    }
  });
};
