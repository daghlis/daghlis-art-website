import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Eye } from 'lucide-react';

const Gallery = ({ onAddToCart }) => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const artworks = [
    {
      id: 1,
      title: {
        ar: 'غروب الصحراء',
        en: 'Desert Sunset',
        fr: 'Coucher de Soleil du Désert'
      },
      category: 'landscapes',
      price: 1250, // EUR
      year: 2024,
      size: '80x60 cm',
      available: true,
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      title: {
        ar: 'وجوه من التراث',
        en: 'Faces of Heritage',
        fr: 'Visages du Patrimoine'
      },
      category: 'portraits',
      price: 1125, // EUR
      year: 2023,
      size: '70x50 cm',
      available: true,
      image: '/api/placeholder/400/300'
    },
    {
      id: 3,
      title: {
        ar: 'تجريد معاصر',
        en: 'Contemporary Abstract',
        fr: 'Abstrait Contemporain'
      },
      category: 'abstract',
      price: 875, // EUR
      year: 2024,
      size: '60x40 cm',
      available: false,
      image: '/api/placeholder/400/300'
    },
    {
      id: 4,
      title: {
        ar: 'ذكريات الطفولة',
        en: 'Childhood Memories',
        fr: 'Souvenirs d\'Enfance'
      },
      category: 'portraits',
      price: 1500, // EUR
      year: 2023,
      size: '90x70 cm',
      available: true,
      image: '/api/placeholder/400/300'
    },
    {
      id: 5,
      title: {
        ar: 'أمواج الحنين',
        en: 'Waves of Nostalgia',
        fr: 'Vagues de Nostalgie'
      },
      category: 'abstract',
      price: 1000, // EUR
      year: 2024,
      size: '65x45 cm',
      available: true,
      image: '/api/placeholder/400/300'
    },
    {
      id: 6,
      title: {
        ar: 'جبال الأطلس',
        en: 'Atlas Mountains',
        fr: 'Montagnes de l\'Atlas'
      },
      category: 'landscapes',
      price: 950, // EUR
      year: 2024,
      size: '75x55 cm',
      available: true,
      image: '/api/placeholder/400/300'
    }
  ];

  const categories = [
    { id: 'all', label: t('gallery.all') },
    { id: 'landscapes', label: t('gallery.landscapes') },
    { id: 'portraits', label: t('gallery.portraits') },
    { id: 'abstract', label: t('gallery.abstract') }
  ];

  const filteredArtworks = selectedCategory === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === selectedCategory);

  const handleAddToCart = (artwork) => {
    const cartItem = {
      id: artwork.id,
      title: artwork.title[i18n.language] || artwork.title.en,
      price: artwork.price,
      image: artwork.image,
      size: artwork.size,
      year: artwork.year
    };
    onAddToCart(cartItem);
  };

  const isRTL = i18n.language === 'ar';

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Artworks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative group">
                <img
                  src={artwork.image}
                  alt={artwork.title[i18n.language] || artwork.title.en}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedArtwork(artwork)}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
                  >
                    <Eye size={20} />
                    {i18n.language === 'ar' ? 'عرض' : i18n.language === 'fr' ? 'Voir' : 'View'}
                  </button>
                </div>
                
                {!artwork.available && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t('gallery.sold')}
                  </div>
                )}
                
                {artwork.available && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t('gallery.available')}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {artwork.title[i18n.language] || artwork.title.en}
                </h3>
                
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>{artwork.year} • {artwork.size}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-amber-600">
                    €{artwork.price.toLocaleString()}
                  </div>
                  
                  {artwork.available && (
                    <button
                      onClick={() => handleAddToCart(artwork)}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-300 flex items-center gap-2"
                    >
                      <ShoppingCart size={20} />
                      {t('gallery.addToCart')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Artwork Modal */}
        {selectedArtwork && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-4 right-4 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold z-10"
                >
                  ×
                </button>
                
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div>
                    <img
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title[i18n.language] || selectedArtwork.title.en}
                      className="w-full rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {selectedArtwork.title[i18n.language] || selectedArtwork.title.en}
                      </h2>
                      <p className="text-gray-600">{selectedArtwork.year} • {selectedArtwork.size}</p>
                    </div>

                    <div className="text-3xl font-bold text-amber-600">
                      €{selectedArtwork.price.toLocaleString()}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {i18n.language === 'ar' ? 'الوصف' : i18n.language === 'fr' ? 'Description' : 'Description'}
                        </h4>
                        <p className="text-gray-600">
                          {i18n.language === 'ar' 
                            ? 'لوحة فنية معاصرة تجمع بين الأصالة والحداثة، مرسومة بتقنية عالية وألوان زيتية فاخرة.'
                            : i18n.language === 'fr'
                            ? 'Œuvre d\'art contemporaine alliant authenticité et modernité, peinte avec une technique raffinée et des couleurs à l\'huile de luxe.'
                            : 'A contemporary artwork that combines authenticity with modernity, painted with high technique and luxurious oil colors.'
                          }
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {i18n.language === 'ar' ? 'التقنية' : i18n.language === 'fr' ? 'Technique' : 'Technique'}
                        </h4>
                        <p className="text-gray-600">
                          {i18n.language === 'ar' ? 'ألوان زيتية على قماش' : i18n.language === 'fr' ? 'Huile sur toile' : 'Oil on canvas'}
                        </p>
                      </div>
                    </div>

                    {selectedArtwork.available && (
                      <button
                        onClick={() => {
                          handleAddToCart(selectedArtwork);
                          setSelectedArtwork(null);
                        }}
                        className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={20} />
                        {t('gallery.addToCart')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

