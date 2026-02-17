const express = require("express");
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 5000;
app.use(express.json());
app.use(cors());

let users = [
  {
    att: '80',
    vid: 108243,
    total_sub: 14,
    bonus: '20',
    name: 'Daksh'
  },
  {
    att: '90',
    vid: 108244,
    total_sub: 16,
    bonus: '25',
    name: 'Rohan'
  },
  {
    att: '85',
    vid: 108245,
    total_sub: 15,
    bonus: '22',
    name: 'Anjali'
  }
];

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.get("/user/:uid", (req, res) => {
  const uid = Number(req.params.uid);

  const user = users.find(u => u.vid === uid);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

app.post("/user", (req, res) => {
  const newStudent = req.body;

  if (!newStudent.name || !newStudent.vid) {
    return res.status(400).json({ message: "Missing fields" });
  }

  users.push(newStudent);
  res.status(201).json(newStudent);
});

app.put("/user/:uid", (req, res) => {
  const uid = Number(req.params.uid);

  const index = users.findIndex(u => u.vid === uid);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

app.delete("/user/:uid",(req,res)=>{
    const uid = Number(req.params.uid);
    const index = users.findIndex(u => u.vid === uid);
    
    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);
    res.json({ message: "User deleted successfully" });
  });

  app.get("/users", (req, res) => {
    res.json(users);
  });

  app.patch("/user/:uid", (req, res) => {
    const uid = Number(req.params.uid);

    const index = users.findIndex(u => u.vid === uid);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
