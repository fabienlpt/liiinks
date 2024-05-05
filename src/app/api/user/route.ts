import { MailerService } from "@/mailer/mailer.service";
import { base, makeToken } from "../config";
import {
  EnumMailTemplate,
  getMailSubject,
} from "@/mailer/models/mail-template.enum";

export async function GET(request: Request) {
  try {
    const username = request.url.includes("?")
      ? request.url.split("?")[1].split("=")[1]
      : null;

    const records = await base("users")
      .select({
        filterByFormula: `{username} = "${username}"`,
      })
      .all();
    let user: any = null;

    records.forEach((value) => {
      user = value.fields;
      user.links = [];
      user.socialMedias = [];
      user.id = value.getId();

      const socialMediasColumns = [
        "behance",
        "linkedIn",
        "instagram",
        "facebook",
        "twitter",
      ];

      socialMediasColumns.forEach((columnName) => {
        const columnValue = user[columnName];
        if (columnValue) {
          try {
            const linkObject = JSON.parse(columnValue);
            if (!linkObject.url) {
              return;
            }
            user.socialMedias.push(linkObject);
          } catch (error) {
            console.error(
              `Erreur lors de l'analyse de la colonne ${columnName} en tant qu'objet JSON :`,
              error
            );
          }
        }
      });

      const linksColumns = [
        "firstLink",
        "secondLink",
        "thirdLink",
        "fourthLink",
        "fifthLink",
      ];
      linksColumns.forEach((columnName) => {
        const columnValue = user[columnName];
        if (columnValue) {
          try {
            const linkObject = JSON.parse(columnValue);
            if (!linkObject.url) {
              return;
            }
            user.links.push(linkObject);
          } catch (error) {
            console.error(
              `Erreur lors de l'analyse de la colonne ${columnName} en tant qu'objet JSON :`,
              error
            );
          }
        }
      });
    });

    return Response.json({
      user,
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données depuis Airtable:",
      error
    );
    return new Response(
      "Une erreur s'est produite lors de la récupération des données depuis Airtable.",
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = data as any;

    user.facebook = JSON.stringify({ label: "Facebook", url: "" });
    user.twitter = JSON.stringify({ label: "Twitter", url: "" });
    user.instagram = JSON.stringify({ label: "Instagram", url: "" });
    user.linkedIn = JSON.stringify({ label: "LinkedIn", url: "" });
    user.behance = JSON.stringify({ label: "Behance", url: "" });
    user.firstLink = JSON.stringify({ label: "Lien1", url: "" });
    user.secondLink = JSON.stringify({ label: "Lien2", url: "" });
    user.thirdLink = JSON.stringify({ label: "Lien3", url: "" });
    user.fourthLink = JSON.stringify({ label: "Lien4", url: "" });
    user.fifthLink = JSON.stringify({ label: "Lien5", url: "" });

    const records = await base("users").create(user);

    const responseBody = JSON.stringify(records);

    const mailerService = new MailerService();

    const token = makeToken(data.email);

    const params = {
      link: process.env.NEXT_PUBLIC_APP_URL + "/login?token=" + token,
      username: data.username,
    };

    await mailerService.sendEmail(
      EnumMailTemplate.Create_account_ok,
      data.email,
      getMailSubject(EnumMailTemplate.Create_account_ok),
      params
    );
    return new Response(responseBody, {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la création des données dans Airtable:",
      error
    );
    return new Response(
      "Une erreur s'est produite lors de la création des données dans Airtable.",
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
