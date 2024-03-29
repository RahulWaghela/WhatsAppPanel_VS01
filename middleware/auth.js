const jwt = require('jsonwebtoken');
const {alluserOfourPanel} = require("../model/schema");
const fs=require('fs');
const path=require('path');
const sessionFilePath=path.join(__dirname,'../views/session.ejs')

const auth = async (req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token, process.env.JSON_TOKEN);
        // console.log(verifyuser);

        const user = await alluserOfourPanel.findOne({ _id: verifyuser._id });
        //  console.log(user);

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        // res.status(401).send(`${error}`)
        fs.readFile(`${sessionFilePath}`,function(err,data){
            res.writeHead(200,{'Content-type':'Text/html'});
            res.write(data)
            res.end()
          })
    }
}

// middleware/breadcrumbs.js

 const generateBreadcrumbs = (req, res, next) => {
  // You can generate breadcrumbs based on the current URL or any other logic you prefer
  // For demonstration, let's assume static breadcrumbs
  const breadcrumbs = [
      { text: 'Home', url: '/' },
      { text: 'Contact', url: '/contact' }
      // Add more breadcrumbs as needed
  ];

  // Add breadcrumbs to res.locals to make them available in views
  res.locals.breadcrumbs = breadcrumbs;
  next();
};

module.exports = generateBreadcrumbs;
module.exports = auth;