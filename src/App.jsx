import { Outlet } from "react-router-dom";
import Container from "./components/Container.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx"; // ✅ import Footer

export default function App() {
  return (
    <>
      {/* Accessibility skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {/* Global header */}
      <Header />

      {/* Main content */}
      <main id="main" className="min-h-[80vh]">
        <Container className="py-12">
          <Outlet />
        </Container>
      </main>

      {/* ✅ Global footer */}
      <Footer />
    </>
  );
}
