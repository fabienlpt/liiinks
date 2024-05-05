import { base } from "../config";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const links = JSON.parse(data.get("links"));

    const id = links.id;
    let fields: { [key: string]: string } = {};

    links.fields.forEach(
      (item: { name: string; label: string; url: string }) => {
        fields[item.name] = JSON.stringify({
          label: item.label,
          url: item.url,
        });
      }
    );

    let records = await base("users").update([
      {
        id,
        fields,
      },
    ]);

    let user = null;

    records.forEach((value) => {
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
