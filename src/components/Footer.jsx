import { useTranslation } from 'react-i18next';
import { Heart, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-amber-400">
              {t('footer.brand')}
            </h3>
            <p className="text-gray-300 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-amber-400">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  {t('nav.gallery')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-amber-400">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-amber-400" />
                <a href="mailto:ahmed@daghlisart.com" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  ahmed@daghlisart.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-amber-400" />
                <a href="tel:+33612345678" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  +33 6 12 34 56 78
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-amber-400" />
                <span className="text-gray-300">
                  {i18n.language === 'ar' ? 'باريس، فرنسا' : i18n.language === 'fr' ? 'Paris, France' : 'Paris, France'}
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-amber-400">
              {t('footer.newsletter')}
            </h4>
            <p className="text-gray-300 mb-4 text-sm">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={t('contact.form.email')}
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-400"
              />
              <button className="bg-amber-600 text-white px-4 py-2 rounded-r-lg hover:bg-amber-700 transition-colors duration-300">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Daghlis Art. {t('footer.rights')}.
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <span>{t('footer.madeWith')}</span>
            <Heart className="text-red-500 mx-1" size={16} />
            <span>{t('footer.madeIn')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

