const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const addComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(addComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
