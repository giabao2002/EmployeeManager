const Joi = require("joi");
const { Employee } = require("../Models/Employee");
const { FamilyInfo, FamilyInfoValidation } = require("../Models/FamilyInfo");

exports.getFamilyInfo = (req, res) => {
  Employee.findById(req.params.id)
    .populate({ path: "familyInfo" })
    .select("FirstName LastName MiddleName")
    .exec((err, employee) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(employee);
      }
    });
};

exports.createFamilyInfo = (req, res) => {
  Joi.validate(req.body, FamilyInfoValidation, (err) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, (err, employee) => {
        if (err) {
          res.status(500).send(err);
        } else {
          const newFamilyInfo = {
            Name: req.body.Name,
            Relationship: req.body.Relationship,
            DOB: req.body.DOB,
            Occupation: req.body.Occupation,
          };

          FamilyInfo.create(newFamilyInfo, (err, familyInfo) => {
            if (err) {
              res.status(500).send(err);
            } else {
              employee.familyInfo.push(familyInfo);
              employee.save((err) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.send(familyInfo);
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.updateFamilyInfo = (req, res) => {
  Joi.validate(req.body, FamilyInfoValidation, (err) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      const newFamilyInfo = {
        Name: req.body.Name,
        Relationship: req.body.Relationship,
        DOB: req.body.DOB,
        Occupation: req.body.Occupation,
      };

      FamilyInfo.findByIdAndUpdate(req.params.id, newFamilyInfo, (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(newFamilyInfo);
        }
      });
    }
  });
};

exports.deleteFamilyInfo = (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (err) {
      res.status(500).send(err);
    } else {
      FamilyInfo.findByIdAndRemove(req.params.id2, (err, familyInfo) => {
        if (err) {
          res.status(500).send(err);
        } else {
          Employee.update(
            { _id: req.params.id },
            { $pull: { familyInfo: req.params.id2 } },
            (err) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send(familyInfo);
              }
            }
          );
        }
      });
    }
  });
};
