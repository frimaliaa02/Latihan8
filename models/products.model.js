const db = require('./db.config.js'); // Path relative dalam folder yang sama

const Product = {
  // Get all products
  findAll: (callback) => {
    const query = 'SELECT * FROM produk ORDER BY id';
    db.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  },

  // Get product by ID
  findById: (id, callback) => {
    const query = 'SELECT * FROM produk WHERE id = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results[0]);
    });
  },

  // Create new product
  create: (productData, callback) => {
    const { nama, deskripsi, harga, foto } = productData;
    const query = 'INSERT INTO produk (nama, deskripsi, harga, foto) VALUES (?, ?, ?, ?)';
    db.query(query, [nama, deskripsi, harga, foto], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      // Get the inserted product
      const insertId = results.insertId;
      Product.findById(insertId, callback);
    });
  },

  // Update product
  update: (id, productData, callback) => {
    const { nama, deskripsi, harga, foto } = productData;
    const query = 'UPDATE produk SET nama = ?, deskripsi = ?, harga = ?, foto = ? WHERE id = ?';
    db.query(query, [nama, deskripsi, harga, foto, id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      Product.findById(id, callback);
    });
  },

  // Delete product
  delete: (id, callback) => {
    // Get product before deleting
    Product.findById(id, (error, product) => {
      if (error) {
        return callback(error, null);
      }
      if (!product) {
        return callback(null, null);
      }
      
      const query = 'DELETE FROM produk WHERE id = ?';
      db.query(query, [id], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, product);
      });
    });
  }
};

module.exports = Product;