const prisma = require("../config/prisma");
const SuccessHandler = require("../utils/SuccessHandler");
const ErrorHandler = require("../utils/ErrorHandler");

//Add Category
const addCategory = async (req, res) => {
  // #swagger.tags = ['product']

  try {
    const categories = [
      "Electronics",
      "Detergents",
      "Clothing",
      "Smart Phones",
    ];

    const data = await prisma.category.createMany({
      data: categories.map((name) => ({ name })),
    });

    return SuccessHandler({ message: `New Category added`, data }, 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

//Fetch Category
const fetchCategory = async (req, res) => {
  // #swagger.tags = ['product']

  try {
    const data = await prisma.category.findMany();

    return SuccessHandler({ message: `New Category added`, data }, 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
//Add Product
const addProduct = async (req, res) => {
  // #swagger.tags = ['product']

  try {
    const { name, price, categoryId } = req.body;

    const data = await prisma.product.create({
      data: { name, price, categoryId },
    });

    return SuccessHandler(
      { message: `Products fetched successfully`, data },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

//Fetch Product
const fetchProducts = async (req, res) => {
  // #swagger.tags = ['product']

  try {
    const { page = 1, limit = 2 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const data = await prisma.product.findMany({
      skip,
      take: limitNumber,
      include: { category: true },
    });

    return SuccessHandler(
      { message: `Products fetched successfully`, data },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
module.exports = {
  addCategory,
  fetchCategory,
  addProduct,
  fetchProducts,
};
