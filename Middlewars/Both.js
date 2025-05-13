  const Both =async (req, res, next) => {
    if(req.roll && req.roll ==="superadmin" || req.roll ==="manager"){
      console.log(" this was from admin" , req.roll)
        next()
    }else {
        return res.status(403).json({success:false ,msg:" Only manager and superadmin can access this to make a achivement"})
    }
  
 }
 export default Both;

 