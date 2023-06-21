"use client";

import Navbar from "@/components/navbar";
import React from "react";
import EmptyStateCreate from "@/components/empty-state-create";
import EmptyStateCollection from "@/components/empty-state-collection";

export default function Home() {
  const [savedLogs, setSavedLogs] = React.useState([]);
  return (
    <div>
      <Navbar />

      <div className="px-12 sm:px-24 md:px-48 lg:px-64 xl:px-96">
        <EmptyStateCreate savedLogs={savedLogs} setSavedLogs={setSavedLogs} />
      </div>

      <div className="mt-36 px-12 sm:px-24 md:px-48 lg:px-64 xl:px-96">
        <EmptyStateCollection
          savedLogs={savedLogs}
          setSavedLogs={setSavedLogs}
        />
      </div>
    </div>
  );
}
