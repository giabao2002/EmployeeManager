const { Employee, EmployeePersonalInfoValidation } = require("../Models/Employee");
const Joi = require("joi");
let multer;
try {
  multer = require("multer");
} catch (error) {
  console.error("Multer module not found. Please install it using 'npm install multer'");
  process.exit(1);
}
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../frontend/public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

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
  upload.single('Photo')(req, res, function (err) { // Change 'Photo' to 'Photo'
    if (err) {
      console.log("============ERROR=========", err)
      return res.status(500).send("Error uploading file");
    }

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
          Photo: req.file ? req.file.filename : req.body.Photo,
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
  });
};

module.exports = {
  getPersonalInfoById,
  updatePersonalInfo,
};
