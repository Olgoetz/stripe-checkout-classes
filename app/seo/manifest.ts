import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Buchungstool für Online-Fitness-Kurse",
    short_name: "Buchungstool",
    description: "Buchungstool für Online-Fitness-Kurse mit Michaela Süßbauer",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
