import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert(i18n.language === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 
          i18n.language === 'fr' ? 'Votre message a été envoyé avec succès!' :
          'Your message has been sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isRTL = i18n.language === 'ar';

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {t('contact.form.title')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {t('contact.form.send')}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {t('contact.info.title')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Mail className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{t('contact.info.email')}</h4>
                    <a href="mailto:ahmed@daghlisart.com" className="text-amber-600 hover:text-amber-700">
                      ahmed@daghlisart.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Phone className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{t('contact.info.phone')}</h4>
                    <a href="tel:+33612345678" className="text-amber-600 hover:text-amber-700">
                      +33 6 12 34 56 78
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <MapPin className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{t('contact.info.location')}</h4>
                    <p className="text-gray-600">Paris, France</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-amber-600" size={24} />
                <h3 className="text-2xl font-bold text-gray-800">
                  {t('contact.info.hours')}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">{t('contact.info.weekdays')}</span>
                  <span className="text-gray-600">{t('contact.info.weekdaysTime')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">{t('contact.info.weekend')}</span>
                  <span className="text-gray-600">{t('contact.info.weekendTime')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">{t('contact.info.sunday')}</span>
                  <span className="text-gray-600">{t('contact.info.sundayTime')}</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {t('shipping.title')}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {t('shipping.france.title')}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• {t('shipping.france.standard')}</li>
                    <li>• {t('shipping.france.express')}</li>
                    <li>• {t('shipping.france.pickup')}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {t('shipping.international.title')}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• {t('shipping.international.europe')}</li>
                    <li>• {t('shipping.international.worldwide')}</li>
                    <li>• {t('shipping.international.insurance')}</li>
                    <li>• {t('shipping.international.customs')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Legal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Informations Légales
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <p>• {t('legal.returns')}</p>
                <p>• {t('legal.warranty')}</p>
                <p>• {t('legal.privacy')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

