const jwt = require('jsonwebtoken');

const verifyAdmin = (req , res , next) => {
  const token = req.header('Authorization')?.replace("Bearer", '',);

  if(!token){
    return res.status(401).json({message:'Access Denied, token is missing'});

  }

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(decoded.role !== "admin"){
      return res.status(403).json({message:'Access Denied admin only'})
    }

    req.user = decoded;
    next();
  }catch(error){
    res.status(401).json({message:'Invalid token', error})
  }
} ;


module.exports = {verifyAdmin};