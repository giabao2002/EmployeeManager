const Joi = require("joi");
const { Employee } = require("../Models/Employee");
const { Education, EducationValidation } = require("../Models/Education");

exports.getEducation = (req, res) => {
  Employee.findById(req.params.id)
    .populate({ path: "education" })
    .select("FirstName LastName MiddleName")
    .exec((err, employee) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(employee);
      }
    });
};

exports.addEducation = (req, res) => {
  Joi.validate(req.body, EducationValidation, (err, result) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, (err, employee) => {
        if (err) {
          res.status(500).send(err);
        } else {
          const newEducation = {
            SchoolUniversity: req.body.SchoolUniversity,
            Degree: req.body.Degree,
            Grade: req.body.Grade,
            PassingOfYear: req.body.PassingOfYear,
          };

          Education.create(newEducation, (err, education) => {
            if (err) {
              res.status(500).send(err);
            } else {
              employee.education.push(education);
              employee.save((err, data) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.send(education);
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.updateEducation = (req, res) => {
  console.log("Body: ", req.body)
  const { id, ...education } = req.body;
  Joi.validate(education, EducationValidation, (err, result) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      const newEducation = {
        SchoolUniversity: req.body.SchoolUniversity,
        Degree: req.body.Degree,
        Grade: req.body.Grade,
        PassingOfYear: req.body.PassingOfYear,
      };

      Education.findByIdAndUpdate(req.body.id, newEducation, (err, education) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(newEducation);
        }
      });
    }
  });
};

exports.deleteEducation = (req, res) => {
  Employee.findById({ _id: req.params.id }, (err, employee) => {
    if (err) {
      res.status(500).send(err);
    } else {
      Education.findByIdAndRemove({ _id: req.params.id2 }, (err, education) => {
        if (err) {
          res.status(500).send(err);
        } else {
          Employee.update(
            { _id: req.params.id },
            { $pull: { education: req.params.id2 } },
            (err, numberAffected) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send(education);
              }
            }
          );
        }
      });
    }
  });
};
