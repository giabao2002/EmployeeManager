const Joi = require('joi');
const { Role, RoleValidation } = require('../Models/Role');
const { Employee } = require('../Models/Employee');

exports.getRoles = (req, res) => {
  Role.find().exec(function (err, role) {
    res.send(role);
  });
};

exports.createRole = (req, res) => {
  Joi.validate(req.body, RoleValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newRole = {
        RoleName: req.body.RoleName,
      };

      Role.create(newRole, function (err, role) {
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          res.send(role);
          console.log("Vai trò mới đã lưu");
        }
      });
    }
  });
};

exports.updateRole = (req, res) => {
  Joi.validate(req.body, RoleValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updateRole = {
        RoleName: req.body.RoleName,
      };

      Role.findByIdAndUpdate(req.params.id, updateRole, function (err, role) {
        if (err) {
          res.send("Error");
        } else {
          res.send(updateRole);
        }
      });
    }
  });
};

exports.deleteRole = async (req, res) => {
  try {
    const employeesWithRole = await Employee.find({
      role: { $in: [req.params.id] },
    });

    console.log("======Nhân viên với vai trò này:", employeesWithRole);

    if (employeesWithRole.length === 0) {
      const deletedRole = await Role.findByIdAndRemove(req.params.id);

      if (deletedRole) {
        console.log("Vai trò đã được xóa");
        return res.status(200).send(deletedRole);
      } else {
        return res.status(404).send("Vai trò không tồn tại");
      }
    } else {
      return res
        .status(403)
        .send(
          "Vai trò này được liên kết với nhân viên nên bạn không thể xóa vai trò này"
        );
    }
  } catch (err) {
    console.error("Lỗi:", err);
    return res.status(500).send("Có lỗi xảy ra");
  }
};
