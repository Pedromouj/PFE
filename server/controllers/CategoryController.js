const Categories = require("../models/Categories");
const authenticateToken = require("../Tools/authanticateToken");
class CategoryController {
  async fetchAllCategory(req, res) {
    try {
      const { userId } = req.params;
      const categorie = new Categories();
      categorie.setIdUser(userId);
      await authenticateToken(req, res, async () => {
        const data = await categorie.getAllCategory();
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem  in the server" });
    }
  }

  async insertController(req, res) {
    try {
      const { userId, libelle, type } = req.body;
      const categorie = new Categories(userId, libelle, type);
      await authenticateToken(req, res, async () => {
        await categorie.insertCategory();
        res.json({ success: "category inserted successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem  in the server" });
    }
  }

  async UpdateController(req, res) {
    try {
      const { userId, libelle, type, idCategory } = req.body;
      const categorie = new Categories(userId, libelle, type);
      await authenticateToken(req, res, async () => {
        await categorie.UpdateCategory(idCategory);
        res.json({ success: "category updated successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async deleteCategoryController(req, res) {
    try {
      const { idCategory, user_id } = req.params;
      const categorie = new Categories();
      categorie.setIdUser(user_id);
      await categorie.DeleteCategory(idCategory);
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async chartCategoryController(req, res) {
    try {
      const { user_id } = req.params;
      const categorie = new Categories();
      categorie.setIdUser(user_id);
      await authenticateToken(req, res, async () => {
        const data = await categorie.ChartCategory();
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }

  async LatestCategoriesController(req, res) {
    try {
      const { userId } = req.params;
      const categorie = new Categories();
      categorie.setIdUser(userId);
      await authenticateToken(req, res, async () => {
        const data = await categorie.latestCategories();
        res.json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "There's problem in the server" });
    }
  }
}

module.exports = new CategoryController();
