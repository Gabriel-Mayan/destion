import AuthenticatedHeader from "@components/Bases/Layout/AuthenticatedHeader";

export default function AuthenticatedLayout({ children }: any) {
  return (
    <main>
      <AuthenticatedHeader />
      {children}
    </main>
  );
}
