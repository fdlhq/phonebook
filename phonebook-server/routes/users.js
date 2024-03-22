var express = require("express");
var router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

router.get("/", async function (req, res, next) {
  const { page = 1, limit = 20, keyword = "", sort = "ASC" } = req.query;
  try {
    const { count, rows } = await models.User.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${keyword}%` } },
          { phone: { [Op.like]: `%${keyword}%` } },
        ],
      },
      order: [["name", sort]],
      limit,
      offset: (page - 1) * limit,
    });
    const pages = Math.ceil(count / limit);
    res.status(200).json({ phonebook: rows, page, limit, pages, total: count });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const user = await models.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { name, phone } = req.body;
    if (!name && !phone)
      throw (Error.message = "name and phone don't be empty");
    const user = await models.User.create(
      { name, phone },
      {
        returning: true,
        plain: true,
      }
    );
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const { name, phone } = req.body;
    if (!name && !phone)
      throw (Error.message = "name and phone don't be empty");
    const user = await models.User.update(
      { name, phone },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      }
    );
    res.status(201).json(user[1]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const user = await models.User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
});

router.put("/:id/avatar", async function (req, res) {
  let avatar;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  avatar = req.files.avatar;
  let fileName = Date.now() + "_" + avatar.name;
  uploadPath = path.join(__dirname, "..", "public", "images", fileName);

  avatar.mv(uploadPath, async function (err) {
    if (err) return res.status(500).send(err);
    try {
      const profile = await models.User.findOne({
        where: { id: req.params.id },
      });
      if (profile.avatar) {
        const filePath = path.join(
          __dirname,
          "..",
          "public",
          "images",
          profile.avatar
        );
        try {
          fs.unlinkSync(filePath);
        } catch {
          const User = await models.User.update(
            { avatar: fileName },
            {
              where: {
                id: req.params.id,
              },
              returning: true,
              plain: true,
            }
          );
          return res.status(201).json(User[1]);
        }
      }
      const User = await models.User.update(
        { avatar: fileName },
        {
          where: {
            id: req.params.id,
          },
          returning: true,
          plain: true,
        }
      );
      res.status(201).json(User[1]);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

module.exports = router;
