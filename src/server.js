const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql");
const cors = require("cors");



app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: 'avb',
  port: '3307'
});
app.use(bodyParser.json());

// app.post('/api/saveUser', (req, res) => {
//   const { fullname, email, tel } = req.body;

//   const sql = 'INSERT INTO user (name, email, tel) VALUES (?, ?, ?)';
//   db.query(sql, [fullname, email, tel], (err, result) => {
//     if (err) {
//       console.error('Error saving user:', err); // Add this line
//       res.status(500).send('Error saving user');
//     } else {
//       console.log('User saved successfully');
//       res.status(200).send('User saved successfully');
//     }
//   });
// });
// app.post('/login', jsonParser,function (req, res, next) {
//   connection.execute(
//     'SELECT * FROM user WHERE email=?',
//     [req.body.email],
//     function (err, users, fields) {
//       if (err) {
//         res.json({ status: 'error', message: err });
//         return
//       }if(users.length == 0){
//         res.json({status: 'error', message: 'no user found' });
//         return
//       }
//         if(isLogin){
//           //token คือ jwt.sign(payload มีiat=issue at timeหรือ เวลาสร้างด้วย, secretOrPrivateKey, [options, callback])
//           var token = jwt.sign({ email: users[0].email }, secret);
//           //โครงสร้าง res.json(body)
//           res.json({status : 'ok',message:'login success',token})
//         }else{
//           res.json({status : 'error',message:'login failed'})
//         }

//     });
// })

// app.post('/authen', jsonParser,function (req, res, next) {
//   try{
//     const token = req.headers.authorization.split(' ')[1]
//     var decoded = jwt.verify(token, secret);console.log(decoded)
//     if(!decoded.email)
//     {
//       res.json({status :'error',message:err.message})
//       return
//     }
//     res.json({status :'ok',decoded})
//   }catch(err){
//     res.json({status :'error',message:err.message})
//   }
// })

// app.post('/logfile', jsonParser,function (req, res, next) {
//   const token = req.headers.authorization.split(' ')[1]
//   var decoded = jwt.verify(token, secret);console.log(decoded)
//   connection.execute(
//     'INSERT INTO logfile (email, status ) VALUES (?,?)',
//     [decoded.email,req.body.status],
//     function (err, results, fields) {
//       if (err) {
//         res.json({ status: 'error', message: err })
//         return
//       }
//       res.json({ status: 'ok', message: "Success" })
//     });
// })
app.get("/user/:email", (req, res) => {
  const email = req.params.email;
  db.query("SELECT * FROM user_master WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});
app.post("/bank_create", (req, res) => {
  const bank_email = req.body.bank_email; // Correctly extract from req.body
  const bank_codename = req.body.bank_codename;
  const bank_telephone = req.body.bank_telephone;
  const bank_name = req.body.bank_name;
  const bank_address = req.body.bank_address;
  const bank_latitude = req.body.bank_latitude;
  const bank_longitude = req.body.bank_longitude;
  const bank_image = req.body.bank_image;
  const bank_bronze = req.body.bank_bronze;
  const bank_silver = req.body.bank_silver;
  const bank_gold = req.body.bank_gold;
  const bank_platinum = req.body.bank_platinum;
  const rank_id = '1';

  if (!bank_email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.query(
    "INSERT INTO bank_master (bank_email, bank_codename, bank_telephone, bank_address, bank_name, bank_latitude, bank_longitude, bank_image, bank_bronze, bank_silver, bank_gold, bank_platinum, rank_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      bank_email, bank_codename, bank_telephone, bank_address, bank_name,
      bank_latitude, bank_longitude, bank_image, bank_bronze, bank_silver,
      bank_gold, bank_platinum, rank_id
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
//   app.post("/bank_create", (req,res) => {
//     const bank_email = req.body.email;
//     const bank_codename = '5f6d8g';
//     const bank_telephone = req.body.tel;
//     const bank_name = req.body.profile;
//     const bank_address = req.body.address;
//     const bank_latitude = req.body.lat;
//     const bank_longitude = req.body.long;
//     const bank_image = req.body.image;
//     const bank_bronze = req.body.medals1;
//     const bank_silver = req.body.medals2;
//     const bank_gold = req.body.medals3;
//     const bank_platinum = req.body.medals4;
//     const rank_id = '1';
//     if (!bank_email ) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }
//     db.query(
//       "INSERT INTO bank_master (bank_email,bank_codename , bank_telephone,bank_address,bank_name,bank_latitude,bank_longitude,bank_image,bank_bronze,bank_silver,bank_gold,bank_platinum,rank_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
//       [bank_email,bank_codename , bank_telephone,bank_address,bank_name,bank_latitude , bank_longitude,bank_image,bank_bronze,bank_silver,bank_gold,bank_platinum,rank_id],
//       (err, result) => {
//        if (err) {
//          console.log(err);
//        } else {
//          res.send("Values Inserted");
//        }
//      }
//    );
//  });
app.post("/bank_product", (req, res) => {
  const bank_codename = req.body.bank_codename;
  const product_name = req.body.product_name;
  const product_image = req.body.product_image;
  const product_type = req.body.product_type;
  const product_type2 = req.body.product_type2;
  const product_type3 = req.body.product_type3;
  const product_type4 = req.body.product_type4;
  const product_quantity = req.body.product_quantity;
  const product_details = req.body.product_details;
  const product_price = req.body.product_price;
  db.query(
    "INSERT INTO bank_product ( bank_codename,  product_name, product_image, product_type, product_type2,product_type3,product_type4,product_quantity, product_details, product_price) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      bank_codename, product_name, product_image, product_type, product_type2, product_type3, product_type4, product_quantity, product_details, product_price
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.post("/create", (req, res) => {
  const image = req.body.image;
  const email = req.body.email;
  const fullname = req.body.fullname;
  const tel = req.body.tel;
  const rank_id = '1';
  db.query(
    "INSERT INTO user_master (image,email,fullname , tel,rank_id) VALUES (?,?,?,?,?)",
    [image, email, fullname, tel, rank_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.get("/readimage/:email", async (req, res) => {
  const email = req.params.email;
  db.query("SELECT image FROM user_master WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});
app.get("/showproduct/:email",(req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(400).send("Email parameter is missing.");
  }
  db.query("SELECT bank_product.* FROM bank_product JOIN bank_master ON bank_master.bank_codename = bank_product.bank_codename WHERE bank_email = ? ", [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});

app.get("/showProductUser/:bank_name",(req, res) => {
  const bank_name = req.params.bank_name
  db.query("SELECT bank_product.* FROM   bank_master JOIN bank_product ON bank_master.bank_codename = bank_product.bank_codename where bank_name = ? ",[bank_name], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});
app.get("/showProductUser1/:id",(req, res) => {
  const product_id = req.params.id;
  db.query("SELECT bank_product.* FROM bank_product JOIN bank_master ON bank_master.bank_codename = bank_product.bank_codename  WHERE product_id = ?", [product_id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});

app.get("/showbank", async (req, res) => {
  db.query("SELECT * FROM bank_master ", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});
app.get("/showcodename/:email", async (req, res) => {
  const email = req.params.email;
  db.query("SELECT bank_codename,bank_name FROM bank_master where bank_email = ?",[email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});
app.post("/RegisterUserForBank", (req, res) => {
  const userBank_email = req.body.userBank_email;
  const userBank_bankName = req.body.userBank_bankName;
  const rank_id = '1';
  db.query(
    "INSERT INTO userinbank (userBank_email,userBank_bankName,rank_id) VALUES (?,?,?)",
    [userBank_email, userBank_bankName, rank_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.get("/CheckUserInBank/:email", async (req, res) => {
  const userBank_email = req.params.email;
  db.query("SELECT * FROM userinbank JOIN bank_master ON userinbank.userBank_bankName = bank_master.bank_name where userBank_email = ?",[userBank_email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});
app.get("/showUserInBank/:userBank_bankName", async (req, res) => {
  const userBank_bankName = req.params.userBank_bankName;
  db.query("SELECT * FROM userinbank JOIN user_master JOIN rank_master ON user_master.email = userinbank.userBank_email and rank_master.rank_id =userinbank.rank_id where usnerBak_bankName = ?",[userBank_bankName], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});

app.post("/Review",(req,res)=>{
  const bank_name = "AVB 2";
  const rating = req.body.rating;
  const detail = req.body.detail;
  const product_id = "33";
  const user_name = "ปอปอนด์";
  const user_email = "tharakhon.r@ku.th"
  db.query("INSERT INTO bank_review(bank_name,rating,detail,product_id,user_name,user_email)VALUE(?,?,?,?,?,?)",
  [bank_name,rating,detail,product_id,user_name,user_email],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  }
);
 
});

app.get("/showReview/:bank_name", async (req, res) => {
  //const sortBy = req.query.sort;
  const bank_name = req.params.bank_name;
  db.query("SELECT * FROM bank_review JOIN bank_master JOIN bank_product ON bank_review.bank_name=bank_master.bank_name and bank_product.product_id=bank_review.product_id where bank_review.bank_name = ?",[bank_name], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});


app.post("/Reviewcustom",(req,res) => {
  const user_name = "ฮอลคูล"
  const bank_name= "AVB 2";
  const product_name = "จอบ";
  const product_id = "33";
  const detail = req.body.detail;
  const rating = req.body.rating;
  
  db.query("INSERT INTO review_customer(user_name,bank_name,product_name,product_id,detail,rating)VALUE(?,?,?,?,?,?)",
  [user_name,bank_name,product_name,product_id,detail,rating],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  });
});

app.get("/Showreviewcustom/:bank_name",async(req,res)=>{
  const bank_name = req.params.bank_name;
  db.query("SELECT * FROM review_customer JOIN bank_master JOIN bank_product ON review_customer.bank_name=bank_master.bank_name and bank_product.product_id=review_customer.product_id where review_customer.bank_name = ?",[bank_name], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No data found in the database.");
      }
    }
  });
});
// app.post("/create", async (req,res) => {
//     const {username, email , tel} = req.body;

//     try{
//         connection.query(
//             "INSERT INTO user(username,email, tel) VALUES(?,?,?)",
//             [username, email, tel],
//             (err, results, fields) => {
//                 if(err){
//                     console.log("Error while inserting a user into the database", err);
//                     return res.status(400).send();
//                 }
//                 return res.status(201).json({message:"New user successfully created!"});
//             }
//         )
//     }catch(err){
//         console.log(err);
//         return res.status(500).send();
//     }
// })

// app.get("/read", async (req,res) => {
//     try {
//         connection.query("SELECT * FROM user", (err,results,fields) =>{
//             if(err){
//                 console.log(err);
//                 return res.status(400).send();
//             }
//             res.status(200).json(results)
//         })
//     }catch(err){
//         console.log(err);
//         return res.status(500).send();
//     }

// })

// //Read single user from db
// app.get("/read/single/:email", async (req,res) => {
//     const email = req.params.email;

//     try {
//         connection.query("SELECT * FROM user WHERE email = ?", [email] , (err,results,fields) =>{
//             if(err){
//                 console.log(err);
//                 return res.status(400).send();
//             }
//             res.status(200).json(results)
//         })
//     }catch(err){
//         console.log(err);
//         return res.status(500).send();
//     }

// })

// // UPDATE data
// app.patch("/update/:email", async (req,res) => {
//     const email = req.params.email;
//     const newUsername = req.body.newUsername;
//     const newTel = req.body.newTel;

//     try {
//         connection.query("UPDATE user SET username = ? ,tel = ? WHERE email = ?", [newUsername,newTel,email] , (err,results,fields) =>{
//             if(err){
//                 console.log(err);
//                 return res.status(400).send();
//             }
//             res.status(200).json({message: "User username and tel update successfully"})
//         })
//     }catch(err){
//         console.log(err);
//         return res.status(500).send();
//     }
// })

app.listen(5000, () => console.log('Server is running on port 5000'));
