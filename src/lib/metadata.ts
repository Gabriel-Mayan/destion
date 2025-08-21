import { Metadata } from "next";

const metadata: Metadata = {
  title: "Destion | Chat em Tempo Real",
  description:
    "O Destion é um aplicativo de chat em tempo real que conecta pessoas de forma rápida, segura e intuitiva. Converse instantaneamente e mantenha-se conectado.",
  keywords: [
    "chat em tempo real",
    "aplicativo de chat",
    "mensagens instantâneas",
    "chat seguro",
    "conversas online",
    "chat em grupo",
    "comunicação digital",
    "Destion",
    "mensageria",
    "bate-papo online",
  ],
  openGraph: {
    title: "Destion | Chat em Tempo Real",
    description: "Converse instantaneamente com amigos, grupos e comunidades usando o Destion, um app de chat rápido e seguro.",
    url: "https://www.destion.app",
    siteName: "Destion",
    images: [
      {
        url: "https://www.destion.app/assets/preview.png",
        width: 1200,
        height: 630,
        alt: "Logo do Destion com fundo moderno representando comunicação em tempo real",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Destion | Chat em Tempo Real",
    description: "Destion é o aplicativo de mensagens que conecta você em tempo real, com privacidade e facilidade.",
    images: ["https://www.destion.app/assets/preview.png"],
  },
  metadataBase: new URL("https://www.destion.app"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: "https://www.destion.app",
  },
};

export default metadata;
