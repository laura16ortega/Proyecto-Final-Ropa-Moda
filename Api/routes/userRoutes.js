const router = require("express").Router();
const { getAllUsers, getUser, deleteUser, updatedUser,updatePassword, forgotPassword, resetPassword } = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../services/JwtServices");



router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/:id",verifyTokenAndAdmin, getUser);
router.post("/forgotPassword", forgotPassword)
router.delete("/find/:id", verifyTokenAndAuthorization, deleteUser);
router.patch("/updateUser", verifyTokenAndAuthorization, updatedUser);
router.patch("/password/update", verifyTokenAndAuthorization, updatePassword)
router.put("/resetPassword/:resetToken", resetPassword)











module.exports = router;