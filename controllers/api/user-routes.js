const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const addUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = addUser.id;
      req.session.username = addUser.username;
      req.session.loggedIn = true;

      res.json(addUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'Username not found, try signing up' });
      return;
    }

    const checkPassword = user.checkPassword(req.body.password);

    if (!checkPassword) {
      res.status(400).json({ message: 'Password did not work, try again.' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'Logged in' });
    });
  } catch (err) {
    res.status(400).json({ message: "Username not found, try signing up" });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
