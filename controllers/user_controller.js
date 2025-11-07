const mongoose = require("mongoose");
const Users = require("../models/users");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  let { email, password, nama, level } = req.body;

  password = bcrypt.hash(password, 10, async (err, encrypted) => {
    if (err) {
      return res.status(500).send("Error hashing password");
    }

    try {
      const user = await Users.create({
        email: email,
        password: encrypted,
        nama: nama,
        level: level,
      });
      res.sendStatus(201);
    } catch (e) {
      res.status(500).send(`Error in regiter new user: ${e.message}`);
    }
  });
};

const changePassword=async (req,res)=>{
  const {id_user,newPassword}=req.body

  try{

    const existingUser=await Users.findById(new mongoose.Types.ObjectId(id_user))
    
    const encryptedPassword=bcrypt.hash(newPassword,10);

    existingUser.password=encryptedPassword;

    res.sendStatus(200);

  }catch(e){
    res.status(500).send(`Error in change password: ${e.message}`);

  }
}

const login= async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user=await Users.findOne({email:email},{_id:1,email:1,password:1,nama:1,level:1})

        if(!user){
            res.status(404).send("User not found")
        }

        bcrypt.compare(password, user.password,(err,same)=>{
            if(err){
                return res.status(500).send("Error comparing password");
            }
            if(!same){
                return res.status(401).send("Incorrect password");
            }
            res.status(200).json(user)
        })
    }catch(e){
        res.status(500).send("Error on login from database")
    }

    // db.query(
    //   `SELECT id_user,email,nama,password,level from user where email=?`,
    //   [email],
    //   (err, result) => {
    //     if (err) {
    //       return res.status(500).send("Error retrieving user from database");
    //     }
  
    //     if (result.length === 0) {
    //       return res.status(404).send("User not found");
    //     }
  
    //     const user = result[0];
    //     bcrypt.compare(password, user.password, (err, same) => {
    //       if (err) {
    //         return res.status(500).send("Error comparing password");
    //       }
  
    //       if (!same) {
    //         return res.status(401).send("Incorrect passowrd");
    //       }
  
    //       return res.sendStatus(200)
    //     });
    //   }
    // );
  }

module.exports={createUser,login,changePassword}
