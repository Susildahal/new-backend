import express from 'express';
import rateLimit from 'express-rate-limit';
const app=express()

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 2, // limit each IP to 2 requests per 24 hours
  msg: "Too many requests from this IP, please try again tomorrow.", // <-- use `message`, not `msg`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});




 const loginlimiter=rateLimit({
    windowMs:24 * 60 * 60 * 1000,
    max:7,
    msg:"Too many requests from this IP, please try again tomorrow.",
    standardHeaders: true, 
    legacyHeaders: false
 });
 


 const global=rateLimit({
    windowMs:5*60*1000,
    max:200,
    msg:"Too many requests from this IP, please try again  in sum time .",
    standardHeaders: true, 
    legacyHeaders: false
 });
 app.use(global)

 export {limiter,loginlimiter,global};