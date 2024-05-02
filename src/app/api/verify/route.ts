import { base } from "../config";

export const GET = async (request: Request) => {
  try {
    const email = request.url.includes("?")
      ? request.url.split("?")[1].split("=")[1]
      : null;

    const records = await base("users")
      .select({
        filterByFormula: `{email} = "${email}"`,
      })
      .all();

    const responseBody = JSON.stringify(records);
    return new Response(responseBody, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
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
};
