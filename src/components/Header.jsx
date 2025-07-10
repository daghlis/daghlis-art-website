import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, ShoppingCart } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ cartItemsCount = 0 }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'gallery', href: '#gallery' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold text-gray-900">
              Daghlis Art
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </nav>

          {/* Right side - Cart, Language, Mobile menu */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Shopping Cart */}
            <button
              onClick={() => scrollToSection('#cart')}
              className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-yellow-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-gray-700 hover:text-yellow-600 font-medium transition-colors"
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#cart')}
                className="text-left text-gray-700 hover:text-yellow-600 font-medium transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{t('nav.cart')}</span>
                {cartItemsCount > 0 && (
                  <span className="bg-yellow-600 text-white text-xs rounded-full px-2 py-1">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

