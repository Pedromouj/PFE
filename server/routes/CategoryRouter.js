const express = require("express");
const {
  insertController,
  fetchAllCategory,
  UpdateController,
  deleteCategoryController,
  chartCategoryController,
  LatestCategoriesController,
} = require("../controllers/CategoryController");
const CategoryRouter = express.Router();

// Define user routes
CategoryRouter.post("/create/category", insertController);
CategoryRouter.get("/allCategories/:userId", fetchAllCategory);
CategoryRouter.get("/latestCategories/:userId", LatestCategoriesController);
CategoryRouter.put("/update/category", UpdateController);
CategoryRouter.get(
  "/category/charts-expense/:user_id",
  chartCategoryController
);
CategoryRouter.delete(
  "/delete/category/:idCategory/:user_id",
  deleteCategoryController
);
module.exports = CategoryRouter;
