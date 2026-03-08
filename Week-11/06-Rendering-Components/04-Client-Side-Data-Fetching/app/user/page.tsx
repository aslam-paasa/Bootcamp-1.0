/**
 * Client Side Data Fetching:
 * > We're back to the waterfall problem!
 * > Request flow with "use client":
 *   [Browser] → [Next.js Server] → [Browser] → [Backend API] → [Browser]
 *       ↓              ↓              ↓           ↓             ↓
 *      Request      Sends basic    Receives    Fetches data   Updates UI
 *      page         HTML & JS      page        via useEffect   with data
*/

"use client";

import { useState, useEffect } from "react";

interface UserData {
  name: string;
  email: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetch("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>Name: {userData?.name || "No name available"}</div>
          <div>Email: {userData?.email || "No email available"}</div>
        </div>
      </div>
    </div>
  );
}
