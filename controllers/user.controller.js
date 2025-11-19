const User = require('../models/user.model');


exports.getAllUsers = (req, res) => { 
User.getAll((err, results) => { 
if (err) return res.status(500).json({ error: err.message });
res.json(results);
});
};


exports.getUserById = (req, res) => { 
const { id } = req.params;
 User.getById(id, (err, result) => {
 if (err) return res.status(500).json({ error: err.message });
if (result.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
 res.json(result[0]);
 });
};


exports.createUser = (req, res) => {
   
const data = req.body;
User.create(data, (err, result) => {
if (err) return res.status(500).json({ error: err.message });
res.status(201).json({ 
id: result.insertId,
...data, 
message: 'User berhasil ditambahkan' 
 });
 });
};


exports.updateUser = (req, res) => {
const { id } = req.params;
const data = req.body;
 User.update(id, data, (err, result) => {
  if (err) return res.status(500).json({ error: err.message });
  if (result.affectedRows === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
  res.json({ message: 'User berhasil diupdate' });
 });
};

exports.deleteUser = (req, res) => {
const { id } = req.params;
User.delete(id, (err, result) => {
if (err) return res.status(500).json({ error: err.message });
if (result.affectedRows === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
res.json({ message: 'User berhasil dihapus' });
});
};