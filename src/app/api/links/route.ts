import { base } from "../config";

export async function POST(request: Request) {
  console.log(
    "==================================================================================================================="
  );
  try {
    const data = await request.formData();
    const links = JSON.parse(data.get("links") as string);

    const id = links.id;
    let fields = {};

    links.fields.forEach((item) => {
      fields[item.name] = JSON.stringify({ label: item.label, url: item.url });
    });

    const updatedRecords = await base("users").update([
      {
        id,
        fields,
      },
    ]);

    const updatedUser = updatedRecords[0].fields;

    return Response.json({
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
}
