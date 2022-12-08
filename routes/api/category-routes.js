const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]

  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // .then((category) => {
    //   // find all associated tags from Product
    //   return Product.findAll({ where: { category_id: req.params.id } });
    // })
    // .then((categoryTags) => {
    //   // get list of current tag_ids
    //   const categoryTagIds = categoryTags.map(({ tag_id }) => tag_id);
    //   // create filtered list of new tag_ids
    //   const newCategoryTags = req.body.tagIds
    //     .filter((tag_id) => !categoryTagIds.includes(tag_id))
    //     .map((tag_id) => {
    //       return {
    //         category_id: req.params.id,
    //         tag_id,
    //       };
    //     });
    //   // figure out which ones to remove
    //   const categoryTagsToRemove = categoryTags
    //     .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    //     .map(({ id }) => id);

    //   // run both actions
    //   return Promise.all([
    //     Product.destroy({ where: { id: categoryTagsToRemove } }),
    //     Product.bulkCreate(newCategoryTags),
    //   ]);
    // })
    .then((updatedCategoryTags) => res.json(updatedCategoryTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
