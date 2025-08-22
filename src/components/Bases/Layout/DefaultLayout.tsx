import Header from "@components/Bases/Layout/Header";
import Footer from "@components/Bases/Layout/Footer";

export default function DefaultLayout({ children }: any) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
