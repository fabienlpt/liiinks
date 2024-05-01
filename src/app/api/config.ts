import Airtable from "airtable";
import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});

export const base = Airtable.base("apprsniTiR59rZXM9");

export const transport = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "no.reply.liiinks@gmail.com",
    pass: "sjey hkat kjuv gzfs",
  },
});

export const emailTemplate = (link: string) => `
  <h2>Hey</h2>
  <p>Here's the login link you just requested:</p>
  <p>${link}</p>
`;

export const makeToken = (email: string) => {
  const expirationDate = new Date();
  expirationDate.setHours(new Date().getHours() + 1);
  const token = jwt.sign({ email, expirationDate }, "shhhhh");

  return token;
};
