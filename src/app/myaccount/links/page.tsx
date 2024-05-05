"use client";
import Preview from "@/components/preview";
import { AuthContext } from "@/lib/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useContext } from "react";

export default function Links() {
  const { user } = useContext(AuthContext);

  async function handleSubmit(e: any) {
    e.preventDefault();
    let inputs = Array.from(e.target.querySelectorAll("input"));
    let data: any = [];
    inputs.forEach((input: any) => {
      let split = input.name.split("-");
      let name = split[1];
      let link = split[0];

      if (!data[link]) {
        data[link] = {
          name: link,
        };
      }

      data[link][name] = input.value;
    });

    let toSend = {
      id: user?.id ?? "",
      fields: Object.values(data),
    };

    let formData = new FormData();
    formData.append("links", JSON.stringify(toSend));
    await axios.post("/api/links", formData);
  }

  return (
    <div className="min-h-screen flex">
      <div
        className="w-[70%] mx-auto pr-8 flex flex-col items-center justify-center pl-8 pt-4"
        style={{
          background: user?.backgroundGradient,
          color: user?.mainColor,
          fontFamily: user?.fontChoice,
        }}
      >
        {user ? (
          <Preview
            avatar={user.avatar}
            username={user.username}
            bio={user.bio}
            socialMedias={user.socialMedias}
            links={user.links}
            color={user.mainColor}
          />
        ) : (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Loading...
          </h2>
        )}
      </div>
      <div className="w-[30%] bg-white rounded-xl p-4 flex flex-col items-center">
        <Link href="/" className="hover:text-gray-400 text-2xl font-bold">
          Liiinks
        </Link>

        <div className="w-full bg-white rounded-xl my-12">
          <div className="flex items-center justify-around w-full">
            <Link
              href="/myaccount"
              className="hover:text-gray-400 w-1/2 text-center border border-t-0 border-l-0 rounded-b-lg p-2"
            >
              Préférences
            </Link>

            <Link
              href="/myaccount/links"
              className="hover:text-gray-400 w-1/2 text-center border border-b-0 border-r-0 rounded-t-lg p-2"
            >
              Mes liens
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-2/3 bg-white rounded mx-auto mt-8"
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <label>
                  <p>{user?.behance.label}</p>
                  <input
                    type="hidden"
                    className="border border-black rounded-sm"
                    name="behance-label"
                    value={"Behance"}
                    readOnly
                  />
                </label>
                <label>
                  <input
                    className="border border-black rounded-sm"
                    name="behance-url"
                    defaultValue={user?.behance.url}
                  />
                </label>
              </div>
              <div className="flex gap-4">
                <label>
                  <p>{user?.facebook.label}</p>
                  <input
                    type="hidden"
                    className="border border-black rounded-sm"
                    name="facebook-label"
                    value={"Facebook"}
                    readOnly
                  />
                </label>
                <label>
                  <input
                    className="border border-black rounded-sm"
                    name="facebook-url"
                    defaultValue={user?.facebook.url}
                  />
                </label>
              </div>
              <div className="flex gap-4">
                <label>
                  <p>{user?.twitter.label}</p>
                  <input
                    type="hidden"
                    className="border border-black rounded-sm"
                    name="twitter-label"
                    value={"Twitter"}
                    readOnly
                  />
                </label>
                <label>
                  <input
                    className="border border-black rounded-sm"
                    name="twitter-url"
                    defaultValue={user?.twitter.url}
                  />
                </label>
              </div>
              <div className="flex gap-4">
                <label>
                  <p>{user?.linkedIn.label}</p>
                  <input
                    type="hidden"
                    className="border border-black rounded-sm"
                    name="linkedIn-label"
                    value={"LinkedIn"}
                    readOnly
                  />
                </label>
                <label>
                  <input
                    className="border border-black rounded-sm"
                    name="linkedIn-url"
                    defaultValue={user?.linkedIn.url}
                  />
                </label>
              </div>
              <div className="flex gap-4">
                <label>
                  <p>{user?.instagram.label}</p>
                  <input
                    type="hidden"
                    className="border border-black rounded-sm"
                    name="instagram-label"
                    value={"Instagram"}
                    readOnly
                  />
                </label>
                <label>
                  <input
                    className="border border-black rounded-sm"
                    name="instagram-url"
                    defaultValue={user?.instagram.url}
                  />
                </label>
              </div>
              <div className="flex gap-4">
                <label>
                  <p>Label {user?.firstLink.label}</p>
                  <input
                    className="border border-black rounded-sm"
                    name="firstLink-label"
                    defaultValue={user?.firstLink.label}
                  />
                </label>
                <label>
                  <p>Lien {user?.firstLink.label}</p>
                  <input
                    className="border border-black rounded-sm"
                    name="firstLink-url"
                    defaultValue={user?.firstLink.url}
                  />
                </label>
              </div>
              <div className="flex gap-4">
                <label>
                  <p>Label {user?.secondLink.label}</p>
                  <input
                    className="border border-black rounded-sm"
                    name="secondLink-label"
                    defaultValue={user?.secondLink.label}
                  />
                </label>
                <label>
                  <p>Lien {user?.secondLink.label}</p>
                  <input
                    className="border border-black rounded-sm"
                    name="secondLink-url"
                    defaultValue={user?.secondLink.url}
                  />
                </label>
              </div>
              <div className="flex gap-4">
                <label>
                  <p>Label {user?.thirdLink.label}</p>
                  <input
                    className="border border-black rounded-sm"
                    name="thirdLink-label"
                    defaultValue={user?.thirdLink.label}
                  />
                </label>
                <label>
                  <p>Lien {user?.thirdLink.label}</p>
                  <input
                    className="border border-black rounded-sm"
                    name="thirdLink-url"
                    defaultValue={user?.thirdLink.url}
                  />
                </label>
              </div>
              <div className="flex gap-4">
                <label>
                  <p>Label {user?.fourthLink.label}</p>
                  <input
                    className="border border-black rounded-sm"
                    name="fourthLink-label"
                    defaultValue={user?.fourthLink.label}
                  />
                </label>
                <label>
                  <p>Lien {user?.fourthLink.label}</p>
                  <input
                    className="border border-black rounded-sm"
                    name="fourthLink-url"
                    defaultValue={user?.fourthLink.url}
                  />
                </label>
              </div>
              <div className="flex gap-4">
                <label>
                  <p>Label {user?.fifthLink.label}</p>
                  <input
                    className="border border-black rounded-sm"
                    name="fifthLink-label"
                    defaultValue={user?.fifthLink.label}
                  />
                </label>
                <label>
                  <p>Lien {user?.fifthLink.label}</p>
                  <input
                    className="border border-black rounded-sm"
                    name="fifthLink-url"
                    defaultValue={user?.fifthLink.url}
                  />
                </label>
              </div>
            </div>
            <button
              className="bg-blue-500 py-1 px-4 rounded text-white my-2"
              type="submit"
            >
              Mettre à jour
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
