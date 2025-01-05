const { Employee } = require("../Models/Employee");
const Joi = require("joi");

const getPersonalInfoById = (req, res) => {
  console.log("personal-info", req.params.id);
  Employee.findById(req.params.id)
    .populate({
      path: "role position department",
    })
    .select("-salary -education -familyInfo -workExperience")
    .exec(function (err, employee) {
      if (err) {
        return res.status(500).send("Error occurred while fetching personal info");
      }
      res.send(employee);
    });
};

const updatePersonalInfo = (req, res) => {
  Joi.validate(req.body, EmployeePersonalInfoValidation, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    } else {
      let newEmployee = {
        BloodGroup: req.body.BloodGroup,
        ContactNo: req.body.ContactNo,
        DOB: req.body.DOB,
        Email: req.body.Email,
        EmergencyContactNo: req.body.EmergencyContactNo,
        Gender: req.body.Gender,
        Hobbies: req.body.Hobbies,
        PANcardNo: req.body.PANcardNo,
        PermanetAddress: req.body.PermanetAddress,
        PresentAddress: req.body.PresentAddress,
      };
      Employee.findByIdAndUpdate(
        req.params.id,
        { $set: newEmployee },
        function (err, numberAffected) {
          if (err) {
            return res.status(500).send("Error occurred while updating personal info");
          }
          console.log(numberAffected);
          res.send(newEmployee);
        }
      );
    }
  });
};

module.exports = {
  getPersonalInfoById,
  updatePersonalInfo,
};
