import Airtable from "airtable";
import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});

export const base = Airtable.base("apprsniTiR59rZXM9");

export const makeToken = (email: string) => {
  const expirationDate = new Date();
  expirationDate.setHours(new Date().getHours() + 1);
  const token = jwt.sign({ email, expirationDate }, "shhhhh");

  return token;
};
