import { useLocation } from 'react-router-dom';

type NavLinksProps = {
  scrollToSection: (id: string) => void;
};

export const NavLinks = ({ scrollToSection }: NavLinksProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/pricing';

  // Links for the pricing page (sections on the page)
  const pricingLinks = [
    { label: "Features", action: () => scrollToSection("features") },
    { label: "How It Works", action: () => scrollToSection("how-it-works") },
    { label: "Benefits", action: () => scrollToSection("benefits") },
    { label: "For Spas", action: () => scrollToSection("for-spas") },
    { label: "FAQ", action: () => scrollToSection("faq") },
  ];

  // Links for other pages - only keep Emma Pricing
  const otherLinks = [
    { label: "Emma Pricing", href: "/" }
  ];

  const links = isHomePage ? pricingLinks : otherLinks;

  return (
    <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 w-full md:w-auto font-mono uppercase text-sm">
      {links.map((link, index) => (
        <li key={index}>
          {link.href ? (
            <a
              href={link.href}
              className="text-brutal-black hover:text-brutal-pink transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <button
              onClick={link.action}
              className="text-brutal-black hover:text-brutal-pink transition-colors"
            >
              {link.label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
