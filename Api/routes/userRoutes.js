const router = require("express").Router();
const { getAllUsers, getUser, deleteUser, updatedUser,changePass,changePass2 } = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../services/JwtServices");


router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/:id",verifyTokenAndAdmin, getUser);
router.delete("/find/:id", verifyTokenAndAuthorization, deleteUser);
router.patch("/patch/:id", verifyTokenAndAuthorization, updatedUser);
router.put("/add",verifyTokenAndAuthorization ,(req,res)=>{
    res.send('hola')
})








module.exports = router;