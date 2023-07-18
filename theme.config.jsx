import React from "react";
// import { DocsThemeConfig } from 'nextra-theme-docs'
import Link from "next/link";
import { Container } from "lucide-react";

const config = {
  logo: (
    <div style={{ display: "flex", gap: 6 }}>
      <Container className="flex" />
      <p>AISandbox</p>
    </div>
  ),
  project: {
    link: "https://github.com/shubhamai/aisandbox",
  },
  docsRepositoryBase:
    "https://github.com/Shubhamai/AISandbox/tree/main/pages/docs",
  sidebar: {
    toggleButton: true,
  },
  footer: {
    text: "AISandbox",
  },
};

export default config;
