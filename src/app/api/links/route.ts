import { base } from "../config";

export async function POST(request: Request) {
  console.log(
    "==================================================================================================================="
  );
  try {
    const data = await request.formData();
    const links = JSON.parse(data.get("links"));

    const id = links.id;
    let fields = {};

    links.fields.forEach((item) => {
      fields[item.name] = JSON.stringify({ label: item.label, url: item.url });
    });

    let records = await base("users").update([
      {
        id,
        fields,
      },
    ]);

    let users = await base("users")
      .select({
        filterByFormula: "{username} = '" + user.username + "'",
      })
      .all();

    let user = null;

    users.forEach((value) => {
      user = value.fields;
      user.id = value.getId();
    });

    return Response.json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
}
