const route=require("express").Router();
const Sequelize = require("sequelize");
//creating connection
const sequelizeInstance = 
new Sequelize("sushpa", "root", "root", {
  host: "localhost",
  dialect: "mysql", 
});
sequelizeInstance.authenticate().then((success)=>console.log("connection is established"))
.catch((error)=>console.log("error in connection"));

const USER=sequelizeInstance.define("user_info",{
    id:
    {  type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    name:
    {
        type:Sequelize.STRING
    },
    email:
    {
        type:Sequelize.STRING
    }
    

},{timestamps:false});


const COMMENTS=sequelizeInstance.define("comments",{
    c_id:
    {  type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    type:
    {
        type:Sequelize.STRING
    },
    description:
    {
        type:Sequelize.STRING
    }
    

},{timestamps:false});

USER.belongsToMany(COMMENTS, {
    through: "USER_COMMMENTS",
    as: "COMMMENTS",
    foreignKey: "user_id",
  });
  COMMENTS.belongsToMany(USER, {
    through: "USER_COMMMENTS",
    as: "USER",
    foreignKey: "c_id",
  });

sequelizeInstance.sync();

// route.get('/home', (req, res)=> {
//     res.send('<html><body><h1>Hello From Node</h1></body></html>');
//     });

    route.get('/news', (req, res)=> {
        res.send('<html><body><h1>Hello From News</h1></body></html>');
        });

    // route.get('/home11', (req, res)=> {
    //     res.send('<html><body><h1>Hello From Node111</h1></body></html>');
    //     });
    

// route.post("/", (req, res)=> {
//     USER.create(req.body).then((data)=>{res.send("user is created")})
//     .catch((error)=>console.log(error));
// });


route.get("/:name", (req, res)=> {
    USER.findAll({where:{name:req.params.name}}).then((data)=>{res.send(data)})
    .catch((error)=>console.log(error));
});

route.get("/byId/:id", (req, res)=> {
    USER.findByPk(req.params.id).then((data)=>{res.send(data)})
    .catch((error)=>console.log(error));
});


route.put("/:id", (req, res)=> {
    USER.update(req.body,{
        where: { id: req.params.id }}).then((data)=>{res.send(data)})
    .catch((error)=>console.log(error));
});

route.delete("/:id", (req, res)=> {
    USER.destroy({where: { id: req.params.id }}).then((data)=>{res.send(data)})
    .catch((error)=>console.log(error));
});

route.get("/getUsers", (req, res)=> {
    sequelizeInstance.query("select * from user_infos"
    ,{type:sequelizeInstance.QueryTypes.SELECT}).then((response)=>{res.status(200).json(response)})
      .catch((error)=>console.log(error));
  });













    

    module.exports=route;