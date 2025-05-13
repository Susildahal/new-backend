const ismanager=(req,resp,next)=>{
    if(req.user && req.user.roll ==="manager"){
        next()      
    }  else{
        return resp.status(403).json({ success: false, msg: "Access denied: Only manager allowed" });
    }               
}

export default ismanager;