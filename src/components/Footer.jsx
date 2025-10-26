import { FaInstagram, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full px-6 py-10 text-center border-t border-black/10 bg-white/60 backdrop-blur-sm mt-32">
      {/* Text */}
      <p className="mb-1 text-sm text-black/70">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-black">Centauri Interactive</span>. All rights reserved.
      </p>
      <p className="mb-6 text-sm text-black/60">
        Built by <span className="font-semibold text-black">Dane & Austin Persek</span>
      </p>

      {/* Icons */}
      <div className="flex justify-center gap-6 text-xl">
        <a
          href="#"
          aria-label="Instagram"
          className="text-black/50 hover:text-black transition-colors duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          aria-label="Twitter"
          className="text-black/50 hover:text-black transition-colors duration-300"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          aria-label="TikTok"
          className="text-black/50 hover:text-black transition-colors duration-300"
        >
          <FaTiktok />
        </a>
        <a
          href="#"
          aria-label="YouTube"
          className="text-black/50 hover:text-black transition-colors duration-300"
        >
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
