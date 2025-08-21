import "react-toastify/dist/ReactToastify.css";

import Providers from "@components/Providers";

import Metadata from "@lib/metadata";

export const metadata = Metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
