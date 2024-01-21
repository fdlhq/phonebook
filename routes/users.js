var express = require('express');
var router = express.Router();
const models = require('../models')
const fs = require('fs')
const path = require('path')


router.get('/', async function(req, res, next) {
  try {
    const users = await models.User.findAll();
    res.json(users)
  } catch (err) {
    console.log(err)
    res.json({err})
  }
});

router.post('/', async function(req, res, next) {
  try {
    const { name, phone } =  req.body
    const user = await models.User.create({ name, phone });
    res.json(user)
  } catch (err) {
    console.log(err)
    res.json({err})
  }
});

router.put('/id', async function(req, res, next) {
  try {
    const { name, phone } =  req.body
    const user = await models.User.update({ name, phone }, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    });
    res.json(user[1])
  } catch (err) {
    console.log(err)
    res.json({err})
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const user = await models.User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(user)
  } catch (err) {
    console.log(err)
    res.json({err})
  }
});

router.put('/:id/avatar', async function(req, res) {
  let avatar;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  avatar = req.files.avatar;
  let fileName = Date.now() + '_' + avatar.name
  uploadPath = path.join(__dirname, '..', 'public', 'images', fileName);

  avatar.mv(uploadPath, async function(err) {
    if (err)
      return res.status(500).send(err);
        try {
            const profile = await models.User.findOne({ where: { id: req.params.id } });
            if (profile.avatar) {
                const filePath = path.join(__dirname, '..', 'public', 'images', profile.avatar);
                try { fs.unlinkSync(filePath) } catch {
                    const User = await models.User.update({ avatar: fileName }, {
                        where: {
                            id: req.params.id
                        },
                        returning: true,
                        plain: true
                    });
                    return res.status(201).json(User[1])
                }
            }
            const User = await models.User.update({ avatar: fileName }, {
              where: {
                  id: req.params.id
              },
              returning: true,
              plain: true
          });
          res.status(201).json(User[1])
      } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
      });
  });

module.exports = router;
