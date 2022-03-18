# GoBarber

Let your user make an appointment with a barber and don't lose control of your schedule.

## Instalation

First you need the Docker instaled in your machine and than run:

```bash
cp .env.example .env

docker-compose up -d
```

### Email Service
You're going to need a service to receive email notifications. One suggestion is use the [Ethereal Email](https://ethereal.email/). Create an free email account and put the `.env` with the credentials.

```js
/*
You will see in the Ethereal Email:

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'shanon.kuhic58@ethereal.email',
        pass: 'Cva8mEnrdTxCRryczf'
    }
});
*/


//So, update the .env variables with the corresponding values.
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=shanon.kuhic58@ethereal.email
MAIL_PASS=Cva8mEnrdTxCRryczf
```

### Bug report

We are using Sentry service to catch bugs and exceptions. You'll need to create an account on [Sentry.io](https://sentry.io/) and create a project. Copy the DSN url and update the `SENTRY_DSN` variable on `.env` file. See [here](https://docs.sentry.io/product/sentry-basics/dsn-explainer/#where-to-find-your-dsn) how to find the DSN of an existing project.

### Execution

It's everything ok? So, now we can execute the application.

```bash
yarn migrate && yarn queue && yarn dev
```
