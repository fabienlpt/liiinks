import fs from "fs";
import * as path from "path";
import { EnumMailTemplate } from "./models/mail-template.enum";
import nodeMailer from "nodemailer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class MailerService {
  transport = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "no.reply.liiinks@gmail.com",
      pass: "sjey hkat kjuv gzfs",
    },
  });

  public async sendEmail(
    mailTemplate: EnumMailTemplate,
    to: string,
    subject: string,
    variables: Record<string, string> = {}
  ): Promise<Response> {
    const emailTemplate = this.getEmailTemplate(mailTemplate);
    const emailHtml = this.getEmailHtml(emailTemplate, variables);

    const mailOptions = {
      from: "NO REPLY - LIIINKS <no.reply.liiinks@gmail.com>",
      to,
      subject,
      html: emailHtml,
    };

    await new Promise((resolve, reject) => {
      this.transport.sendMail(mailOptions, (error) => {
        if (error) {
          console.error("Erreur lors de l'envoi de l'e-mail :", error);
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
    return new Response("Magic link sent.", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Get the email template from the mail-templates folder
   */
  private getEmailTemplate(enumMailTemplate: EnumMailTemplate): string {
    const template = fs.readFileSync(
      path.join(__dirname, `./templates/${enumMailTemplate}`),
      {
        encoding: "utf-8",
      }
    );

    if (!template) {
      console.error(
        `[mailer.service.ts] template not found : ${enumMailTemplate}`
      );
    }

    return template ?? "";
  }

  /**
   * Replace the variables in the email template
   */
  private getEmailHtml(
    htmlTemplate: string,
    variables: Record<string, string>
  ): string {
    if (variables) {
      const keys = Object.keys(variables);
      for (const key of keys) {
        if (htmlTemplate.includes(`{{${key}}}`)) {
          htmlTemplate = htmlTemplate.replace(`{{${key}}}`, variables[key]);
        } else {
          console.error(
            `[mailer.service.ts] variable {{${key}}} not found in template`
          );
        }
      }
    }

    return htmlTemplate;
  }
}
