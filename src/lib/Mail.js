import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { port, host, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      port,
      secure,
      host,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
