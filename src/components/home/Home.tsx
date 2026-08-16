"use client";
import React from "react";
import Common from "./Common";

function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 h-[80vh]">
      <div className="text-center">
        <h1 className="text-4xl font-medium tracking-tight sm:text-6xl font-rowdies">
          Welcome to Your App
        </h1>
        <p className="mt-6 text-lg text-muted-foreground font-mono">
          Start building something amazing with Next.js and TypeScript
        </p>
      </div>
      <Common />
    </div>
  );
}

export default Home;
