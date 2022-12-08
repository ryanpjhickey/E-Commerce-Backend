const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [Product]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Category and Tag data
});
// be sure to include its associated Product data

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
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
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // .then((product) => {
    //   // find all associated tags from Product
    //   return Product.findAll({ where: { product_id: req.params.id } });
    // })
    // .then((productTags) => {
    //   // get list of current tag_ids
    //   const productTagIds = productTags.map(({ tag_id }) => tag_id);
    //   // create filtered list of new tag_ids
    //   const newProductTags = req.body.tagIds
    //     .filter((tag_id) => !productTagIds.includes(tag_id))
    //     .map((tag_id) => {
    //       return {
    //         product_id: req.params.id,
    //         tag_id,
    //       };
    //     });
    //   // figure out which ones to remove
    //   const productTagsToRemove = productTags
    //     .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    //     .map(({ id }) => id);

    //   // run both actions
    //   return Promise.all([
    //     Product.destroy({ where: { id: productTagsToRemove } }),
    //     Product.bulkCreate(newProductTags),
    //   ]);
    // })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No tag found with this id' });
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
