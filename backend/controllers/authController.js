const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

exports.register = async (req,res)=>{

  const {name,email,password} = req.body;

  const hashedPassword = await bcrypt.hash(password,10);

  db.query(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name,email,hashedPassword],
    (err,result)=>{

      if(err){
        return res.status(500).json({message:"User already exists"});
      }

      res.json({message:"Account created"});
    }
  );

};

exports.login = (req,res)=>{

  const {email,password} = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err,results)=>{

      if(results.length===0){
        return res.status(401).json({message:"User not found"});
      }

      const user = results[0];

      const valid = await bcrypt.compare(password,user.password);

      if(!valid){
        return res.status(401).json({message:"Wrong password"});
      }

      const token = jwt.sign({id:user.id},SECRET);

      res.json({token});
    }
  );

};