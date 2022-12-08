"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var User = require("../models/UserModel");

var _require = require("../services/authServices"),
    encrypt = _require.encrypt;

var _require2 = require("../services/JwtServices"),
    generateToken = _require2.generateToken;

var crypto = require("crypto");

var jwt = require("jsonwebtoken");

var Token = require("../models/TokenModel");

var sendEmail = require("../services/sendMailServices");

var CryptoJS = require("crypto-js"); //Get All Users


var getAllUsers = function getAllUsers(request, response) {
  var query, users;
  return regeneratorRuntime.async(function getAllUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = request.query["new"];
          _context.prev = 1;

          if (!query) {
            _context.next = 8;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(User.find().sort({
            _id: -1
          }).limit(1));

        case 5:
          _context.t0 = _context.sent;
          _context.next = 11;
          break;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(User.find());

        case 10:
          _context.t0 = _context.sent;

        case 11:
          users = _context.t0;
          response.status(200).json(users);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t1 = _context["catch"](1);
          response.status(500).json({
            message: _context.t1
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 15]]);
}; //Get a User


var getUser = function getUser(request, response) {
  var user, _user$_doc, password, others;

  return regeneratorRuntime.async(function getUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findById(request.params.id));

        case 3:
          user = _context2.sent;
          _user$_doc = user._doc, password = _user$_doc.password, others = _objectWithoutProperties(_user$_doc, ["password"]);
          response.status(200).json(others);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          response.status(500).json({
            message: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; //Update a User


var updatedUser = function updatedUser(request, response) {
  var user, fullName, email, phone_number, _updatedUser;

  return regeneratorRuntime.async(function updatedUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findById(request.body.userId));

        case 2:
          user = _context3.sent;

          if (!user) {
            _context3.next = 21;
            break;
          }

          _context3.prev = 4;
          fullName = user.fullName, email = user.email, phone_number = user.phone_number;
          user.email = email;
          user.fullName = request.body.fullName || fullName;
          user.phone_number = request.body.phone_number || phone_number;
          _context3.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          _updatedUser = _context3.sent;
          console.log(user);
          response.status(200).json({
            message: "User Update Succesfully",
            _id: _updatedUser._id,
            fullName: _updatedUser.fullName,
            email: _updatedUser.email,
            phone_number: _updatedUser.phone_number
          });
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](4);
          response.status(400).json({
            message: _context3.t0
          });

        case 19:
          _context3.next = 22;
          break;

        case 21:
          response.status(400).json({
            message: "No user"
          });

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 16]]);
}; //Delete a User


var deleteUser = function deleteUser(request, response) {
  return regeneratorRuntime.async(function deleteUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(request.params.id));

        case 3:
          response.status(200).json({
            message: "User has been deleted succesfully"
          });
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          response.status(500).json({
            message: _context4.t0
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; //Update User Password


var updatePassword = function updatePassword(request, response) {
  var user, _request$body, oldPassword, confirmPassword, newPassword, isPasswordMatched, passHash;

  return regeneratorRuntime.async(function updatePassword$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findById(request.user.id).select("+password"));

        case 3:
          user = _context5.sent;
          _request$body = request.body, oldPassword = _request$body.oldPassword, confirmPassword = _request$body.confirmPassword, newPassword = _request$body.newPassword;

          if (!(!oldPassword || !confirmPassword || !newPassword)) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", response.status(500).json({
            message: "Please provide all parameters"
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(user.comparePassword(oldPassword));

        case 9:
          isPasswordMatched = _context5.sent;

          if (isPasswordMatched) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", response.status(400).json({
            message: "Old password is incorrect"
          }));

        case 12:
          if (!(newPassword !== confirmPassword)) {
            _context5.next = 14;
            break;
          }

          return _context5.abrupt("return", response.status(400).json({
            message: "Passwords does not match"
          }));

        case 14:
          _context5.next = 16;
          return regeneratorRuntime.awrap(encrypt(newPassword));

        case 16:
          passHash = _context5.sent;
          user.password = passHash;
          _context5.next = 20;
          return regeneratorRuntime.awrap(user.save());

        case 20:
          response.status(200).json({
            message: "Password Updated Succesfully",
            user: user
          });
          _context5.next = 26;
          break;

        case 23:
          _context5.prev = 23;
          _context5.t0 = _context5["catch"](0);
          response.status(500).json({
            message: _context5.t0
          });

        case 26:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

var forgotPassword = function forgotPassword(request, response) {
  var email, user, token, resetToken, hashedToken, resetUrl, message, subject, send_to, sent_from;
  return regeneratorRuntime.async(function forgotPassword$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          email = request.body.email;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context6.sent;

          if (user) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", response.status(404).json({
            message: "User not found"
          }));

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(Token.findOne({
            userId: user._id
          }));

        case 9:
          token = _context6.sent;

          if (!token) {
            _context6.next = 13;
            break;
          }

          _context6.next = 13;
          return regeneratorRuntime.awrap(token.deleteOne());

        case 13:
          resetToken = crypto.randomBytes(32).toString("hex") + user._id;
          hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
          console.log("hashedtoken1", hashedToken);
          console.log("resetToken", resetToken); //const hashedToken = await encrypt(resetToken);
          //const cryptoToken = CryptoJS.AES.encrypt(hashedToken, resetToken).toString()

          _context6.next = 19;
          return regeneratorRuntime.awrap(new Token({
            userId: user._id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 30 * (60 * 1000) // 30 minutos

          }).save());

        case 19:
          resetUrl = "".concat(process.env.FRONTEND_URL, "/resetpassword/").concat(resetToken);
          message = "\n            <h2>Hello ".concat(user.fullName, "</h2>\n            <p>Please use the url below to reset your password</p>\n            <p>This reset link is valid for only 30 minutes.</p>\n            \n            <a href=").concat(resetUrl, " clicktracking=off>").concat(resetUrl, "</a>\n\n            <p>Regards....</p>\n            <p>Proyecto Final Henry</p>\n        ");
          subject = "Password Reset Request";
          send_to = user.email;
          sent_from = process.env.EMAIL_USER;
          console.log(user);
          _context6.prev = 25;
          _context6.next = 28;
          return regeneratorRuntime.awrap(sendEmail(subject, message, send_to, sent_from));

        case 28:
          response.status(200).json({
            message: "Reset Email Sent Succesfully"
          });
          _context6.next = 34;
          break;

        case 31:
          _context6.prev = 31;
          _context6.t0 = _context6["catch"](25);
          response.status(500).json({
            message: _context6.t0
          });

        case 34:
          _context6.next = 39;
          break;

        case 36:
          _context6.prev = 36;
          _context6.t1 = _context6["catch"](1);
          response.status(500).json({
            message: _context6.t1
          });

        case 39:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 36], [25, 31]]);
};

var resetPassword = function resetPassword(request, response) {
  var password, resetToken, hashedToken, tokens, userToken, user, passHash;
  return regeneratorRuntime.async(function resetPassword$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          password = request.body.password;
          resetToken = request.params.resetToken;
          _context7.prev = 2;
          hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
          _context7.next = 6;
          return regeneratorRuntime.awrap(Token.find());

        case 6:
          tokens = _context7.sent;
          console.log("tokens", tokens);
          console.log("hashedToken", hashedToken); //comaprar(token, resettoken)

          _context7.next = 11;
          return regeneratorRuntime.awrap(Token.findOne({
            token: hashedToken,
            expiresAt: {
              $gt: Date.now()
            }
          }));

        case 11:
          userToken = _context7.sent;
          console.log(userToken);

          if (!userToken) {
            response.status(404).json({
              message: "Invalid Token"
            });
          }

          _context7.next = 16;
          return regeneratorRuntime.awrap(User.findOne({
            _id: userToken.userId
          }));

        case 16:
          user = _context7.sent;
          _context7.next = 19;
          return regeneratorRuntime.awrap(encrypt(password));

        case 19:
          passHash = _context7.sent;
          user.password = passHash;
          _context7.next = 23;
          return regeneratorRuntime.awrap(user.save());

        case 23:
          response.status(201).json({
            message: "Password Reset Succesfully, Please Login"
          });
          _context7.next = 30;
          break;

        case 26:
          _context7.prev = 26;
          _context7.t0 = _context7["catch"](2);
          console.log(_context7.t0);
          response.status(500).json({
            message: _context7.t0
          });

        case 30:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 26]]);
};

module.exports = {
  getAllUsers: getAllUsers,
  getUser: getUser,
  deleteUser: deleteUser,
  updatedUser: updatedUser,
  updatePassword: updatePassword,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword
};