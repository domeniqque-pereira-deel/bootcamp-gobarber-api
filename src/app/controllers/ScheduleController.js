import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const checkUserIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserIsProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    /**
     * Ex: date = 2019-08-23T18:00:00-03:00
     * 2019-08-23 00:00:00
     * 2019-08-23 23:59:59
     */
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
