const { Salary, SalaryValidation } = require("../Models/Salary");
const { Employee } = require("../Models/Employee");
const Joi = require("joi");

exports.getAllSalaries = (req, res) => {
  Employee.find()
    .populate({ path: "salary" })
    .select("FirstName LastName MiddleName EmployeeCode")
    .exec((err, company) => {
      let filteredCompany = company.filter((data) => data["salary"].length == 1);
      res.send(filteredCompany);
    });
};

exports.getSalaryByEmployeeCode = (req, res) => {
  console.log(req.params.employeeCode);
  Employee.find({ EmployeeCode: req.params.employeeCode })
    .populate({ path: "salary" })
    .select("FirstName LastName MiddleName")
    .exec((err, company) => {
      let filteredCompany = company.filter((data) => data["salary"].length == 1);
      res.send(filteredCompany);
    });
};

exports.getSalaryById = (req, res) => {
  Employee.find({ _id: req.params.id })
    .populate({ path: "salary" })
    .select("FirstName LastName MiddleName EmployeeCode")
    .exec((err, company) => {
      let filteredCompany = company.filter((data) => data["salary"].length == 1);
      res.send(filteredCompany);
    });
};

exports.createSalary = (req, res) => {
  Joi.validate(req.body, SalaryValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, (err, employee) => {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          if (employee.salary.length == 0) {
            let newSalary = {
              BasicSalary: req.body.BasicSalary,
              BankName: req.body.BankName,
              AccountNo: req.body.AccountNo,
              AccountHolderName: req.body.AccountHolderName,
              IFSCcode: req.body.IFSCcode,
              TaxDeduction: req.body.TaxDeduction,
              ReceivingDate: parseInt(req.body.ReceivingDate),
            };

            Salary.create(newSalary, (err, salary) => {
              if (err) {
                console.log(err);
                res.send("Error");
              } else {
                employee.salary.push(salary);
                employee.save((err, data) => {
                  if (err) {
                    console.log(err);
                    res.send("err");
                  } else {
                    console.log(data);
                    res.send(salary);
                  }
                });
                console.log("Lương mới đã lưu");
              }
            });
          } else {
            res.status(403).send("Thông tin lương của nhân viên này đã tồn tại");
          }
        }
      });
    }
  });
};

exports.updateSalary = (req, res) => {
  Joi.validate(req.body, SalaryValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newSalary = {
        BasicSalary: req.body.BasicSalary,
        BankName: req.body.BankName,
        AccountNo: req.body.AccountNo,
        AccountHolderName: req.body.AccountHolderName,
        IFSCcode: req.body.IFSCcode,
        TaxDeduction: req.body.TaxDeduction,
        ReceivingDate: parseInt(req.body.ReceivingDate),
      };

      Salary.findByIdAndUpdate(req.params.id, newSalary, (err, salary) => {
        if (err) {
          res.send("Error");
        } else {
          res.send(newSalary);
        }
      });
    }
    console.log("put");
  });
};

exports.deleteSalary = (req, res) => {
  Employee.findById({ _id: req.params.id }, (err, employee) => {
    console.log("Lương nhân viên: ", employee.salary[0]);
    if (err) {
      res.send("Error");
      console.log(err);
    } else {
      Salary.findByIdAndRemove({ _id: employee.salary[0] }, (err, salary) => {
        if (!err) {
          console.log("Lương đã xóa");
          Employee.update(
            { _id: req.params.id },
            { $pull: { salary: employee.salary[0] } },
            (err, numberAffected) => {
              console.log(numberAffected);
              res.send(salary);
            }
          );
        } else {
          console.log(err);
          res.send("Error");
        }
      });
      console.log("delete");
    }
  });
};
