var express = require("express"),
  mongoose = require("mongoose"),
  Joi = require("joi"),
  app = express();
jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require('path');

const roleRoutes = require("./src/Routes/roleRoutes");
const departmentRoutes = require("./src/Routes/departmentRoutes");
const projectBidRoutes = require("./src/Routes/projectBidRoutes");
const employeeRoutes = require("./src/Routes/employeeRoutes");
const salaryRoutes = require("./src/Routes/salaryRoutes");
const personalInfoRoutes = require("./src/Routes/personalInfoRoutes");
const educationRoutes = require("./src/Routes/educationRoutes");
const familyInfoRoutes = require("./src/Routes/familyInfoRoutes");
const workExperienceRoutes = require("./src/Routes/workExperienceRoutes");
var { Employee } = require("./src/Models/Employee");
var {
  verifyAdmin,
  verifyAdminHR,
  verifyEmployee,
  verifyHR,
} = require("./src/middleware/auth");
var {
  LeaveApplication,
  LeaveApplicationValidation,
} = require("./src/Models/LeaveApplication");
var { Complaint, ComplaintValidation } = require("./src/Models/Complaint");
var { Reward, RewardValidation } = require("./src/Models/Reward");
//connecting to mongodb
let mongoURI = process.env.DATABASEURL;
//seting up jwt token
let jwtKey = process.env.JWTKEY;
//seting up jwt token
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
//verify token
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose
  .connect(mongoURI, { useUnifiedTopology: true })
  .then(() => console.log("Kết nối db thành công"))
  .catch((err) => console.log("Lỗi kết nối db:", err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hệ thống quản lý nhân viên API");
});

app.get("/api", (req, res) => {
  res.send("Hệ thống quản lý nhân viên API");
});

app.use("/api/role", roleRoutes); // Sử dụng role routes
app.use("/api/department", departmentRoutes); // Sử dụng department routes
app.use("/api/admin/project-bid", projectBidRoutes);
app.use("/api/employee", employeeRoutes); // Sử dụng employee routes
app.use("/api/salary", salaryRoutes);
app.use("/api/personal-info", personalInfoRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/family-info", familyInfoRoutes);
app.use("/api/work-experience", workExperienceRoutes);

app.get("/api/employee-salary/:id", verifyEmployee, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate({ path: "salary" })
      .select("FirstName LastName MiddleName DateOfJoining TerminateDate");

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    const rewards = await Reward.find({ employee: req.params.id }).exec();

    const result = {
      ...employee._doc,
      rewards,
    };

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/admin-salary", (req, res) => {
  Employee.find()
    .populate({
      path: "salary",
    })
    .select("FirstName LastName MiddleName")
    .exec(function (err, company) {
      let filteredCompany = company.filter(
        (data) => data["salary"].length == 1
      );
      res.send(filteredCompany);
    });
});

app.get("/api/employee-salary/:id/:year/:month?", verifyEmployee, async (req, res) => {
  try {
    const { id, year, month } = req.params;
    const employee = await Employee.findById(id)
      .populate({ path: "salary" })
      .select("FirstName LastName MiddleName DateOfJoining TerminateDate");

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    const rewards = await Reward.find({ employee: id }).exec();
    const filteredRewards = rewards.filter(reward => {
      const rewardDate = new Date(reward.Date);
      return rewardDate.getFullYear() === parseInt(year) && (!month || rewardDate.getMonth() + 1 === parseInt(month));
    });

    const totalRewards = filteredRewards.reduce((total, reward) => {
      if(reward.Type == 1){
        return total + reward.Amount;
      } else {
        return total - reward.Amount;
      }
    }, 0);

    const salary = employee.salary[0];
    const finalSalary = salary.BasicSalary - (salary.BasicSalary *  salary.TaxDeduction / 100) + totalRewards;

    const result = {
      ...employee._doc,
      ...salary._doc,
      FinalSalary: finalSalary,
      Month: month || "All",
      Year: year
    };

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//----------------------LeaveApplication---------------------
app.get("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  Employee.findById(req.params.id)
    .populate({
      path: "leaveApplication",
    })
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send(employee);
      }
    });
});

app.post("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newLeaveApplication;
          newLeaveApplication = {
            Leavetype: req.body.Leavetype,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate,
            Reasonforleave: req.body.Reasonforleave,
            Status: req.body.Status,
            employee: req.params.id,
          };

          LeaveApplication.create(
            newLeaveApplication,
            function (err, leaveApplication) {
              if (err) {
                console.log(err);
                res.send("Error");
              } else {
                employee.leaveApplication.push(leaveApplication);
                employee.save(function (err, data) {
                  if (err) {
                    console.log(err);
                    res.send("err");
                  } else {
                    console.log(data);
                    res.send(leaveApplication);
                  }
                });
                console.log("new leaveApplication Saved");
              }
            }
          );
        }
      });
    }
  });
});

app.put("/api/leave-application-emp/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newLeaveApplication;

      newLeaveApplication = {
        Leavetype: req.body.Leavetype,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate,
        Reasonforleave: req.body.Reasonforleave,
        Status: req.body.Status,
        employee: req.params.id,
      };

      LeaveApplication.findByIdAndUpdate(
        req.params.id,
        newLeaveApplication,
        function (err, leaveApplication) {
          if (err) {
            res.send("Error");
          } else {
            res.send(newLeaveApplication);
          }
        }
      );
    }
    console.log("put");
  });
});

app.delete(
  "/api/leave-application-emp/:id/:id2",
  verifyEmployee,
  (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
      if (err) {
        res.send("Error");
        console.log(err);
      } else {
        LeaveApplication.findByIdAndRemove(
          { _id: req.params.id2 },
          function (err, leaveApplication) {
            if (!err) {
              console.log("Đơn xin nghỉ đã xóa");
              Employee.update(
                { _id: req.params.id },
                { $pull: { leaveApplication: req.params.id2 } },
                function (err, numberAffected) {
                  console.log(numberAffected);
                  res.send(leaveApplication);
                }
              );
            } else {
              console.log(err);
              res.send("Error");
            }
          }
        );
        console.log("delete");
      }
    });
  }
);

//---------------------LeaveApplication--------------------
app.get("/api/leave-application-hr/status/:status?", verifyHR, (req, res) => {
  const status = req.params.status;
  let query = {};

  if (status) {
    query.Status = status;
  }

  LeaveApplication.find(query)
    .populate({
      path: "employee",
      select: "FirstName LastName MiddleName EmployeeCode",
    })
    .sort({ _id: -1 }) // Sắp xếp theo _id từ mới nhất tới cũ nhất
    .exec(function (err, leaveApplication) {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send(leaveApplication);
      }
    });
});

app.get(
  "/api/leave-application-hr/employee/:employeeCode",
  verifyHR,
  async (req, res) => {
    try {
      const employeeCode = req.params.employeeCode;
      console.log("Employee Code: ", employeeCode);

      // Tìm kiếm nhân viên dựa trên EmployeeCode
      const employee = await Employee.findOne({
        EmployeeCode: employeeCode,
      }).select("_id");
      if (!employee) {
        return res.status(404).send("No employee found with the given code");
      }

      // Sử dụng _id của nhân viên để tìm kiếm trong LeaveApplication
      const leaveApplications = await LeaveApplication.find({
        employee: employee._id,
      }).populate({
        path: "employee",
        select: "FirstName LastName MiddleName EmployeeCode",
      });

      if (leaveApplications.length === 0) {
        return res
          .status(404)
          .send("No leave applications found for the given employee");
      }

      console.log("Leave Applications: ", leaveApplications);
      res.status(200).json(leaveApplications);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send("Error occurred while searching for leave applications");
    }
  }
);

app.put("/api/leave-application-hr/:id", verifyHR, (req, res) => {
  Joi.validate(req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newLeaveApplication;

      newLeaveApplication = {
        Status: req.body.Status,
      };
      LeaveApplication.findByIdAndUpdate(
        req.params.id,
        {
          $set: newLeaveApplication,
        },
        function (err, numberAffected) {
          console.log(numberAffected);
          res.send(newLeaveApplication);
        }
      );
    }
  });
});

app.delete("/api/leave-application-hr/:id/:id2", verifyHR, (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("Error");
      console.log(err);
    } else {
      LeaveApplication.findByIdAndRemove(
        { _id: req.params.id2 },
        function (err, leaveApplication) {
          if (!err) {
            console.log("Đơn xin nghỉ đã xóa");
            Employee.update(
              { _id: req.params.id },
              { $pull: { leaveApplication: req.params.id2 } },
              function (err, numberAffected) {
                console.log(numberAffected);
                res.send(leaveApplication);
              }
            );
          } else {
            console.log(err);
            res.send("Error");
          }
        }
      );
      console.log("delete");
    }
  });
});

//------------------------login------------------------
app.post("/api/login", (req, res) => {
  Joi.validate(
    req.body,
    Joi.object().keys({
      email: Joi.string().max(200).required(),
      password: Joi.string().max(100).required(),
    }),
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err.details[0].message);
      } else {
        Employee.findOne(
          { Email: req.body.email },
          "Password _id Account FirstName LastName Status Photo",
          function (err, document) {
            if (err || document == null) {
              res.send("false");
            } else {
              if (document.Password == req.body.password) {
                if (document.Status === "Active") {
                  emp = {
                    _id: document._id,
                    Account: document.Account,
                    FirstName: document.FirstName,
                    LastName: document.LastName,
                    Photo: document.Photo || null
                  };
                  var token = jwt.sign(emp, jwtKey);
                  res.send(token);
                } else {
                  res.status(403).send("Tài khoản đã bị vô hiệu hóa");
                }
              } else {
                res.sendStatus(400);
              }
            }
          }
        );
      }
    }
  );
});

//--------------------------Complaint-------------------------
app.get("/api/complaint", verifyAdmin, (req, res) => {
  Complaint.find()
    .populate("employee")
    .exec(function (err, complaints) {
      if (err) {
        res.send("Error");
      } else {
        res.send(complaints);
      }
    });
});

app.get("/api/employee-complaint/:id", verifyEmployee, (req, res) => {
  const employeeId = req.params.id;

  Complaint.find({ employee: employeeId })
    .populate("employee")
    .exec((err, complaints) => {
      if (err) {
        return res.status(500).send("Có lỗi xảy ra");
      }
      res.send(complaints);
    });
});

app.post("/api/complaint/:id", verifyEmployee, (req, res) => {
  Joi.validate(req.body, ComplaintValidation, (err, result) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      let newComplaint = {
        Title: req.body.Title,
        Description: req.body.Description,
        Date: req.body.Date,
        Status: req.body.Status,
        employee: req.body.employee,
      };

      Complaint.create(newComplaint, function (err, complaint) {
        if (err) {
          res.send("Error");
        } else {
          res.send(complaint);
        }
      });
    }
  });
});

app.put("/api/complaint/:id", verifyAdmin, (req, res) => {
  Joi.validate(req.body, ComplaintValidation, (err, result) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      let updateComplaint = {
        Title: req.body.Title,
        Description: req.body.Description,
        Date: req.body.Date,
        Status: req.body.Status,
        employee: req.body.employee,
      };

      Complaint.findByIdAndUpdate(
        req.params.id,
        updateComplaint,
        function (err, complaint) {
          if (err) {
            res.send("Error");
          } else {
            res.send(updateComplaint);
          }
        }
      );
    }
  });
});

app.delete("/api/complaint/:id", verifyHR, (req, res) => {
  Complaint.findByIdAndRemove(req.params.id, function (err, complaint) {
    if (err) {
      res.send("Error");
    } else {
      res.send(complaint);
    }
  });
});

//--------------------------Reward--------------------------
app.get("/api/reward", verifyAdminHR, (req, res) => {
  Reward.find()
    .populate("employee")
    .exec(function (err, rewards) {
      if (err) {
        res.send("Error");
      } else {
        res.send(rewards);
      }
    });
});


app.get("/api/employee-reward/:id", verifyEmployee, (req, res) => {
  const employeeId = req.params.id;
  console.log('Employee ID: ', employeeId);

  Reward.find({ employee: employeeId })
    .populate("employee")
    .exec((err, rewards) => {
      if (err) {
        return res.status(500).send("Có lỗi xảy ra");
      }
      res.send(rewards);
    });
});

app.post("/api/reward", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, RewardValidation, (err, result) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      let newReward = {
        Type: req.body.Type,
        Description: req.body.Description,
        Date: req.body.Date,
        Amount: req.body.Amount,
        employee: req.body.employee,
      };

      Reward.create(newReward, function (err, reward) {
        if (err) {
          res.send("Error");
        } else {
          res.send(reward);
        }
      });
    }
  });
});

app.put("/api/reward/:id", verifyAdminHR, (req, res) => {
  Joi.validate(req.body, RewardValidation, (err, result) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      let updateReward = {
        Type: req.body.Type,
        Description: req.body.Description,
        Date: req.body.Date,
        Amount: req.body.Amount,
        employee: req.body.employee,
      };

      Reward.findByIdAndUpdate(
        req.params.id,
        updateReward,
        function (err, reward) {
          if (err) {
            res.send("Error");
          } else {
            res.send(updateReward);
          }
        }
      );
    }
  });
});

app.delete("/api/reward/:id", verifyAdminHR, (req, res) => {
  Reward.findByIdAndRemove(req.params.id, function (err, reward) {
    if (err) {
      res.send("Error");
    } else {
      res.send(reward);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
