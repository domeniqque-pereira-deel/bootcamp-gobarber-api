import Users from '../models/Users';

class UserController {
  async store(req, res) {
    const userExists = await Users.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await Users.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const { email, password, oldPassword } = req.body;
    const user = await Users.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await Users.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (password && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does note match' });
    }

    const { id, name, provider } = await user.update(res.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
