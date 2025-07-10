import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Palette } from 'lucide-react';

const Hero = () => {
  const { t, i18n } = useTranslation();
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isRTL = i18n.language === 'ar';

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-50 animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-yellow-200 rounded-full opacity-40 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-green-200 rounded-full opacity-50 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200 rounded-full opacity-30 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Art Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
              <Palette className="text-white" size={40} />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className={`text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('hero.subtitle')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => scrollToSection('gallery')}
              className={`group bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('hero.exploreBtn')}
              <ArrowRight className={`group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} size={20} />
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className={`group border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('hero.aboutBtn')}
              <ArrowRight className={`group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''}`} size={20} />
            </button>
          </div>

          {/* Stats or Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">15+</div>
              <div className="text-gray-600">
                {i18n.language === 'ar' ? 'سنوات خبرة' : i18n.language === 'fr' ? 'Années d\'expérience' : 'Years Experience'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
              <div className="text-gray-600">
                {i18n.language === 'ar' ? 'عمل فني' : i18n.language === 'fr' ? 'Œuvres d\'art' : 'Artworks'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">12</div>
              <div className="text-gray-600">
                {i18n.language === 'ar' ? 'معرض فردي' : i18n.language === 'fr' ? 'Expositions solo' : 'Solo Exhibitions'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

