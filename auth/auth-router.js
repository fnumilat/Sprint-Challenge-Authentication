const router = require('express').Router();
const db = require("../data-model/auth_data_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
    const { username } = req.body

    const user = await db.findBy({ username }).first()
    if(user) {
      return res.status(409).json({ message: "User is already taken!"})
    } else {
      const passHashing = bcrypt.hashSync(req.body.password, 16)
      res.status(201).json(await db.add({...req.body, password: passHashing}))
    }

  } catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  const authError = { message: "Invalid credentials!"}
  try {
    const user = await db.findBy({ username: req.body.username}).first()
    if(!user) {
      return res.status(401).json(authError)
    } 

    const passwordValid = await bcrypt.compare(req.body.password, user.password)
    console.log("User logged in:", req.body.password, user.password)

    if(!passwordValid) {
      return res.status(401).json(authError)
    }

    const tokenPayload = {
      userId: user.id
    }

    res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET))

    // res.status(200).json({ message: `You are logged in ${user.username}`})
    res.status(200).json({ message: "You logged in successfuly!"})

  } catch(err) {
    next(err)
  }
});

module.exports = router;
