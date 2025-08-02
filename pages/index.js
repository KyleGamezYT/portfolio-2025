import React from "react";
import Head from "next/head";
import config from "../config";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Head>
        <title>{config.name} | Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="p-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold">{config.name}</h1>
        <p className="text-gray-400">{config.bio}</p>
      </header>

      <main className="p-6 space-y-16">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-300 max-w-2xl">{config.about}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-900 p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium">Project One</h3>
              <p className="text-gray-400">Short description of the project goes here.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium">Project Two</h3>
              <p className="text-gray-400">Another quick project overview.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Community Involvement</h2>
          <p className="text-gray-300">I'm currently staff in the following Roblox communities:</p>
          <ul className="list-disc list-inside text-gray-400">
            <li>
              <a
                href="https://discord.gg/gvro"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GVRO (Greenville Roleplay Operation)
              </a>
            </li>
            <li>
              <a
                href="https://discord.gg/gvreflection"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GVReflection
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <div className="flex space-x-6 text-white">
            {config.socials.instagram && (
              <a
                href={config.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
            {config.socials.discord && (
              <a
                href={config.socials.discord}
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>
            )}
            {config.socials.roblox && (
              <a
                href={config.socials.roblox}
                target="_blank"
                rel="noopener noreferrer"
              >
                Roblox
              </a>
            )}
            {config.socials.tiktok && (
              <a
                href={config.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok
              </a>
            )}
          </div>
        </section>
      </main>

      <footer className="p-4 border-t border-gray-700 text-gray-600 text-sm text-center">
        &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
      </footer>
    </div>
  );
}
