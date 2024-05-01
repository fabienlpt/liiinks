import { base } from "../config";

export async function GET(request: Request) {
  try {
    const records = await base("users").select({}).all();

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
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const records = await base("users").create(data);

    const responseBody = JSON.stringify(records);
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
