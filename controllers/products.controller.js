const Product = require('../models/products.model.js');

const productsController = {
  // GET all products
  getAllProducts: (req, res) => {
    Product.findAll((error, products) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Error retrieving products',
          error: error.message
        });
      }
      
      res.json({
        success: true,
        data: products,
        message: 'Products retrieved successfully'
      });
    });
  },

  // GET product by ID
  getProductById: (req, res) => {
    const { id } = req.params;
    
    Product.findById(id, (error, product) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Error retrieving product',
          error: error.message
        });
      }
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.json({
        success: true,
        data: product,
        message: 'Product retrieved successfully'
      });
    });
  },

  // POST create new product - PERBAIKI BAGIAN INI
  createProduct: (req, res) => {
    // TAMBAHKAN VALIDASI req.body
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required'
      });
    }

    const { nama, deskripsi, harga, foto } = req.body;

    // Validation
    if (!nama || !harga) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required'
      });
    }

    Product.create({
      nama,
      deskripsi: deskripsi || '',
      harga: parseFloat(harga),
      foto: foto || 'images/default.jpg'
    }, (error, newProduct) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Error creating product',
          error: error.message
        });
      }

      res.status(201).json({
        success: true,
        data: newProduct,
        message: 'Product created successfully'
      });
    });
  },

  // PUT update product - PERBAIKI JUGA
  updateProduct: (req, res) => {
    const { id } = req.params;
    
    // VALIDASI req.body
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required'
      });
    }

    const { nama, deskripsi, harga, foto } = req.body;

    // Check if product exists first
    Product.findById(id, (error, existingProduct) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Error checking product',
          error: error.message
        });
      }

      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      const updateData = {
        nama: nama || existingProduct.nama,
        deskripsi: deskripsi || existingProduct.deskripsi,
        harga: harga ? parseFloat(harga) : existingProduct.harga,
        foto: foto || existingProduct.foto
      };

      Product.update(id, updateData, (error, updatedProduct) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
          });
        }

        res.json({
          success: true,
          data: updatedProduct,
          message: 'Product updated successfully'
        });
      });
    });
  },

  // DELETE product
  deleteProduct: (req, res) => {
    const { id } = req.params;

    Product.delete(id, (error, deletedProduct) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Error deleting product',
          error: error.message
        });
      }

      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.json({
        success: true,
        data: deletedProduct,
        message: 'Product deleted successfully'
      });
    });
  }
};

module.exports = productsController;