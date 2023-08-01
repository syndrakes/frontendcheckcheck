const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares =  jsonServer.defaults();
const cors = require("cors")


server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(cors());


server.get("/employees/edit/:employeeID", (req, res) => {
  const employeeID = parseInt(req.params.employeeID, 10);
  const employees = router.db
  .get("employees")
  .find({ id: employeeID})
  .value();

  if(!employees) {
    return res.status(404).json({error: "Employee not found"});
  }

  res.json(employees);
})

server.use(router);

const PORT = 5000;
server.listen(PORT, () => {
  console.log("Server running at 5000")
})