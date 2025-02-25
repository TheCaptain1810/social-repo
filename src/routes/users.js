const express = require("express");
const UserRepo = require("../repos/user-repo");

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await UserRepo.find();
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserRepo.findById(id);
  if (!user) {
    return res.sendStatus(404);
  }
  return res.send(user);
});

router.post("/users", async (req, res) => {
  const { username, bio } = req.body;
  const response = await UserRepo.insert(username, bio);

  res.send("User inserted successfully");
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;

  try {
    await UserRepo.update(id, username, bio);
    res.send("User updated successfully");
  } catch (err) {
    return res.sendStatus(404);
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const response = await UserRepo.delete(id);

  if (!response) {
    return res.sendStatus(404);
  }
  res.send("User deleted successfully");
});

module.exports = router;
