"use client";
import Header from "@/components/header";
import { AuthContext } from "@/lib/AuthContext";
import axios from "axios";
import { useContext } from "react";

export default function Links() {
  const { user } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    let inputs = Array.from(e.target.querySelectorAll("input"));
    let data = [];
    inputs.forEach((input) => {
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
      id: user?.id,
      fields: Object.values(data),
    };

    let formData = new FormData();
    formData.append("links", JSON.stringify(toSend));
    await axios.post("/api/links", formData);
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Header />
      <div className="w-[80%] bg-white rounded-xl my-12">
        <form
          onSubmit={handleSubmit}
          className="w-2/3 bg-white rounded mx-auto"
        >
          <h1 className="mb-8">Changer mes liens</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-4">
              <label>
                <p>Label Behance</p>
                <input
                  className="border border-black rounded-sm"
                  name="behance-label"
                  value={"Behance"}
                  readOnly
                />
              </label>
              <label>
                <p>Lien Behance</p>
                <input
                  className="border border-black rounded-sm"
                  name="behance-url"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label>
                <p>Label Facebook</p>
                <input
                  className="border border-black rounded-sm"
                  name="facebook-label"
                  value={"Facebook"}
                  readOnly
                />
              </label>
              <label>
                <p>Lien Facebook</p>
                <input
                  className="border border-black rounded-sm"
                  name="facebook-url"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label>
                <p>Label Twitter</p>
                <input
                  className="border border-black rounded-sm"
                  name="twitter-label"
                  value={"Twitter"}
                  readOnly
                />
              </label>
              <label>
                <p>Lien Twitter</p>
                <input
                  className="border border-black rounded-sm"
                  name="twitter-url"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label>
                <p>Label LinkedIn</p>
                <input
                  className="border border-black rounded-sm"
                  name="linkedIn-label"
                  value={"LinkedIn"}
                  readOnly
                />
              </label>
              <label>
                <p>Lien Linkedin</p>
                <input
                  className="border border-black rounded-sm"
                  name="linkedIn-url"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label>
                <p>Label Instagram</p>
                <input
                  className="border border-black rounded-sm"
                  name="instagram-label"
                  value={"Instagram"}
                  readOnly
                />
              </label>
              <label>
                <p>Lien Instagram</p>
                <input
                  className="border border-black rounded-sm"
                  name="instagram-url"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label>
                <p>Label Lien 1</p>
                <input
                  className="border border-black rounded-sm"
                  name="firstLink-label"
                  defaultValue={"Lien 1"}
                />
              </label>
              <label>
                <p>Lien Lien 1</p>
                <input
                  className="border border-black rounded-sm"
                  name="firstLink-url"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label>
                <p>Label Lien 2</p>
                <input
                  className="border border-black rounded-sm"
                  name="secondLink-label"
                  defaultValue={"Lien 2"}
                />
              </label>
              <label>
                <p>Lien Lien 2</p>
                <input
                  className="border border-black rounded-sm"
                  name="secondLink-url"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label>
                <p>Label Lien 3</p>
                <input
                  className="border border-black rounded-sm"
                  name="thirdLink-label"
                  defaultValue={"Lien 3"}
                />
              </label>
              <label>
                <p>Lien Lien 3</p>
                <input
                  className="border border-black rounded-sm"
                  name="thirdLink-url"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label>
                <p>Label Lien 4</p>
                <input
                  className="border border-black rounded-sm"
                  name="fourthLink-label"
                  defaultValue={"Lien 4"}
                />
              </label>
              <label>
                <p>Lien Lien 4</p>
                <input
                  className="border border-black rounded-sm"
                  name="fourthLink-url"
                />
              </label>
            </div>
            <div className="flex gap-4">
              <label>
                <p>Lien Label Lien 5</p>
                <input
                  className="border border-black rounded-sm"
                  name="fifthLink-label"
                  defaultValue={"Lien 5"}
                />
              </label>
              <label>
                <p>Lien Lien 5</p>
                <input
                  className="border border-black rounded-sm"
                  name="fifthLink-url"
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
  );
}
