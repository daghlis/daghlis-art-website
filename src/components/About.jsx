import { useTranslation } from 'react-i18next';
import { Award, Palette, Users, Clock } from 'lucide-react';

const About = () => {
  const { t, i18n } = useTranslation();

  const achievements = [
    {
      icon: Award,
      title: t('about.awards'),
      description: t('about.awardsDesc'),
      number: '5+'
    },
    {
      icon: Palette,
      title: t('about.soloExhibitions'),
      description: t('about.soloExhibitionsDesc'),
      number: '12'
    },
    {
      icon: Users,
      title: t('about.groupExhibitions'),
      description: t('about.groupExhibitionsDesc'),
      number: '30+'
    },
    {
      icon: Clock,
      title: t('about.experience'),
      description: t('about.experienceDesc'),
      number: '15+'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Artist Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop"
                alt="Ahmed Daghlis"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-400 rounded-full opacity-15"></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Description */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('about.description')}
              </p>
            </div>

            {/* Philosophy */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                {t('about.philosophy')}
              </h3>
              <blockquote className="text-gray-600 italic text-lg leading-relaxed border-l-4 border-yellow-400 pl-6">
                "{t('about.philosophyText')}"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="mt-20">
          <h3 className="text-3xl font-serif font-bold text-gray-900 text-center mb-12">
            {t('about.achievements')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-yellow-600" />
                  </div>
                  
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {achievement.number}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {achievement.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education & Recent Exhibitions */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              {i18n.language === 'ar' ? 'التعليم' : i18n.language === 'en' ? 'Education' : 'Éducation'}
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-semibold text-gray-900">
                  {i18n.language === 'ar' ? 'ماجستير الفنون الجميلة' : i18n.language === 'en' ? 'Master of Fine Arts' : 'Maîtrise en Beaux-Arts'}
                </h4>
                <p className="text-gray-600">
                  {i18n.language === 'ar' ? 'جامعة القاهرة - 2015' : i18n.language === 'en' ? 'Cairo University - 2015' : 'Université du Caire - 2015'}
                </p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-semibold text-gray-900">
                  {i18n.language === 'ar' ? 'بكالوريوس الفنون التشكيلية' : i18n.language === 'en' ? 'Bachelor of Visual Arts' : 'Licence en Arts Visuels'}
                </h4>
                <p className="text-gray-600">
                  {i18n.language === 'ar' ? 'كلية الفنون الجميلة - 2010' : i18n.language === 'en' ? 'Faculty of Fine Arts - 2010' : 'Faculté des Beaux-Arts - 2010'}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Exhibitions */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              {i18n.language === 'ar' ? 'المعارض الأخيرة' : i18n.language === 'en' ? 'Recent Exhibitions' : 'Expositions Récentes'}
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-semibold text-gray-900">
                  {i18n.language === 'ar' ? 'ألوان من الشرق' : i18n.language === 'en' ? 'Colors from the East' : 'Couleurs de l\'Orient'}
                </h4>
                <p className="text-gray-600">
                  {i18n.language === 'ar' ? 'دبي - 2024' : i18n.language === 'en' ? 'Dubai - 2024' : 'Dubaï - 2024'}
                </p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-semibold text-gray-900">
                  {i18n.language === 'ar' ? 'تراث معاصر' : i18n.language === 'en' ? 'Contemporary Heritage' : 'Patrimoine Contemporain'}
                </h4>
                <p className="text-gray-600">
                  {i18n.language === 'ar' ? 'بيروت - 2023' : i18n.language === 'en' ? 'Beirut - 2023' : 'Beyrouth - 2023'}
                </p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-semibold text-gray-900">
                  {i18n.language === 'ar' ? 'وجوه من بلادي' : i18n.language === 'en' ? 'Faces from My Country' : 'Visages de Mon Pays'}
                </h4>
                <p className="text-gray-600">
                  {i18n.language === 'ar' ? 'عمان - 2023' : i18n.language === 'en' ? 'Amman - 2023' : 'Amman - 2023'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

