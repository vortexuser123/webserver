const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src":["'self'"],
      "img-src":["'self'","data:"],
      "object-src":["'none'"]
    }
  },
  referrerPolicy: { policy: 'no-referrer' },
  crossOriginResourcePolicy: { policy: 'same-site' }
}));
app.use(cors({ origin:false }));

app.disable('x-powered-by');
app.use((_req,res,next)=>{
  res.setHeader('Strict-Transport-Security','max-age=63072000; includeSubDomains; preload');
  res.setHeader('Permissions-Policy','geolocation=(), microphone=()');
  next();
});

app.get('/', (_req,res)=>res.send('Secure by default ✔'));
app.listen(4010,()=>console.log('Hardened app on https://localhost:4010 (behind TLS proxy)'));
