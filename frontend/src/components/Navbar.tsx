import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, Instagram, User, Heart, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery.trim()}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isHome = location.pathname === "/";
  const navBackground = (!isHome || scrolled)
    ? "bg-foreground/95 backdrop-blur-lg shadow-lg py-3"
    : "bg-transparent py-5";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between relative">

        {/* HAMBURGER - LEFT on mobile */}
        <div className="md:hidden flex items-center z-50">
          <button
            className="text-primary-foreground p-2 -ml-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* LOGO - CENTER on mobile, LEFT on desktop */}
        <Link
          to="/"
          className="group flex items-center transition-all absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-50"
        >
          <img
            src="/logo.png"
            alt="Mr Blends Logo"
            className="h-14 md:h-20 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* DESKTOP LINKS - CENTER-ish */}
        <div className="hidden md:flex items-center gap-8 ml-8">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-body text-sm font-medium tracking-wide uppercase transition-all relative group ${location.pathname === link.href
                ? "text-secondary"
                : "text-primary-foreground/80 hover:text-secondary"
                }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full ${location.pathname === link.href ? "w-full" : ""
                }`}></span>
            </Link>
          ))}
        </div>

        {/* ICONS - RIGHT (Desktop & Mobile) */}
        <div className="flex items-center gap-1 md:gap-4 ml-auto z-50">

          {/* Search Bar - Desktop Only for aesthetic preservation */}
          <div className={`hidden md:flex items-center transition-all duration-300 overflow-hidden ${isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}>
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50 border border-white/20 rounded-full py-1.5 px-4 outline-none focus:border-secondary transition-all"
                autoFocus={isSearchOpen}
              />
            </form>
          </div>

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hidden md:block p-2 text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          {/* Icons for both mobile and desktop */}
          <Link
            to="/wishlist"
            className="p-2 text-primary-foreground/80 hover:text-secondary transition-colors"
            title="Wishlist"
          >
            <Heart className="h-5 w-5 md:h-6 md:w-6" />
          </Link>

          <Link
            to="/cart"
            className="relative p-2 text-primary-foreground hover:text-secondary transition-all"
          >
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] font-bold h-4 w-4 md:h-5 md:w-5 rounded-full flex items-center justify-center border-2 border-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to={userInfo ? "/" : "/login"}
            onClick={userInfo ? handleLogout : undefined}
            className="p-2 bg-foreground/10 text-primary-foreground/90 rounded-full hover:bg-foreground/20 transition-all border border-white/10"
            title={userInfo ? "Logout" : "Login"}
          >
            {userInfo ? <LogOut className="h-5 w-5" /> : <User className="h-5 w-5" />}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-foreground transition-all duration-300 overflow-hidden ${open ? "max-h-[500px] border-t border-white/10 opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="px-6 py-8 space-y-6">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search pickles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 text-primary-foreground placeholder:text-primary-foreground/40 border border-white/10 rounded-xl py-3 px-10 outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/40" />
          </form>

          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`block text-xl font-heading font-semibold tracking-wide ${location.pathname === link.href
                ? "text-secondary"
                : "text-primary-foreground/80"
                }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6 border-t border-white/10 flex gap-4">
            <a href="https://instagram.com/mr_blends__" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full text-primary-foreground/60 hover:text-secondary transition-colors">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
