import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Save, 
  X, 
  Eye,
  Package,
  DollarSign,
  Users,
  TrendingUp,
  Settings,
  LogOut
} from 'lucide-react';

const AdminPanel = ({ onLogout }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      title: 'غروب الصحراء',
      titleEn: 'Desert Sunset',
      titleFr: 'Coucher de Soleil du Désert',
      category: 'landscapes',
      price: 5000,
      status: 'available',
      image: '/api/placeholder/400/300',
      description: 'لوحة تجسد جمال الصحراء وقت الغروب',
      descriptionEn: 'A painting that embodies the beauty of the desert at sunset',
      descriptionFr: 'Une peinture qui incarne la beauté du désert au coucher du soleil',
      year: 2024,
      medium: 'زيت على قماش',
      mediumEn: 'Oil on Canvas',
      mediumFr: 'Huile sur Toile',
      dimensions: '80x60 cm'
    },
    {
      id: 2,
      title: 'وجوه من التراث',
      titleEn: 'Faces from Heritage',
      titleFr: 'Visages du Patrimoine',
      category: 'portraits',
      price: 4500,
      status: 'available',
      image: '/api/placeholder/400/300',
      description: 'بورتريه يعكس عمق التراث العربي',
      descriptionEn: 'A portrait reflecting the depth of Arab heritage',
      descriptionFr: 'Un portrait reflétant la profondeur du patrimoine arabe',
      year: 2023,
      medium: 'أكريليك على قماش',
      mediumEn: 'Acrylic on Canvas',
      mediumFr: 'Acrylique sur Toile',
      dimensions: '70x50 cm'
    }
  ]);
  
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'أحمد محمد العلي',
      email: 'ahmed@example.com',
      phone: '+971 50 123 4567',
      artworkTitle: 'غروب الصحراء',
      amount: 5000,
      status: 'pending',
      date: '2024-01-15',
      paymentMethod: 'credit_card'
    }
  ]);

  const [showArtworkForm, setShowArtworkForm] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    titleFr: '',
    category: 'landscapes',
    price: '',
    status: 'available',
    description: '',
    descriptionEn: '',
    descriptionFr: '',
    year: new Date().getFullYear(),
    medium: '',
    mediumEn: '',
    mediumFr: '',
    dimensions: '',
    image: null
  });

  const categories = [
    { value: 'landscapes', label: 'المناظر الطبيعية', labelEn: 'Landscapes', labelFr: 'Paysages' },
    { value: 'portraits', label: 'البورتريه', labelEn: 'Portraits', labelFr: 'Portraits' },
    { value: 'abstract', label: 'التجريد', labelEn: 'Abstract', labelFr: 'Abstrait' }
  ];

  const handleAddArtwork = () => {
    setEditingArtwork(null);
    setFormData({
      title: '',
      titleEn: '',
      titleFr: '',
      category: 'landscapes',
      price: '',
      status: 'available',
      description: '',
      descriptionEn: '',
      descriptionFr: '',
      year: new Date().getFullYear(),
      medium: '',
      mediumEn: '',
      mediumFr: '',
      dimensions: '',
      image: null
    });
    setShowArtworkForm(true);
  };

  const handleEditArtwork = (artwork) => {
    setEditingArtwork(artwork);
    setFormData(artwork);
    setShowArtworkForm(true);
  };

  const handleDeleteArtwork = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه اللوحة؟')) {
      setArtworks(artworks.filter(artwork => artwork.id !== id));
    }
  };

  const handleSaveArtwork = () => {
    if (editingArtwork) {
      setArtworks(artworks.map(artwork => 
        artwork.id === editingArtwork.id ? { ...formData, id: editingArtwork.id } : artwork
      ));
    } else {
      const newArtwork = {
        ...formData,
        id: Math.max(...artworks.map(a => a.id)) + 1,
        image: '/api/placeholder/400/300'
      };
      setArtworks([...artworks, newArtwork]);
    }
    setShowArtworkForm(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const stats = {
    totalArtworks: artworks.length,
    availableArtworks: artworks.filter(a => a.status === 'available').length,
    soldArtworks: artworks.filter(a => a.status === 'sold').length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0)
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">لوحة التحكم</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي الأعمال</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalArtworks}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">الأعمال المتاحة</p>
              <p className="text-2xl font-bold text-gray-800">{stats.availableArtworks}</p>
            </div>
            <Eye className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">الطلبات المعلقة</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</p>
            </div>
            <Users className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalRevenue.toLocaleString()} د.إ</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">الطلبات الأخيرة</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-right py-2">العميل</th>
                <th className="text-right py-2">العمل الفني</th>
                <th className="text-right py-2">المبلغ</th>
                <th className="text-right py-2">الحالة</th>
                <th className="text-right py-2">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="border-b">
                  <td className="py-2">{order.customerName}</td>
                  <td className="py-2">{order.artworkTitle}</td>
                  <td className="py-2">{order.amount.toLocaleString()} د.إ</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status === 'pending' ? 'معلق' : 
                       order.status === 'completed' ? 'مكتمل' : 'ملغي'}
                    </span>
                  </td>
                  <td className="py-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderArtworks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الأعمال الفنية</h2>
        <button
          onClick={handleAddArtwork}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة عمل جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map(artwork => (
          <div key={artwork.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={artwork.image} 
              alt={artwork.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{artwork.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{artwork.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-orange-600">
                  {artwork.price.toLocaleString()} د.إ
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  artwork.status === 'available' ? 'bg-green-100 text-green-800' :
                  artwork.status === 'sold' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {artwork.status === 'available' ? 'متاح' : 
                   artwork.status === 'sold' ? 'مباع' : 'غير متاح'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditArtwork(artwork)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 flex items-center justify-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  تعديل
                </button>
                <button
                  onClick={() => handleDeleteArtwork(artwork.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 flex items-center justify-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">إدارة الطلبات</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-3 px-4 font-semibold">رقم الطلب</th>
                <th className="text-right py-3 px-4 font-semibold">العميل</th>
                <th className="text-right py-3 px-4 font-semibold">البريد الإلكتروني</th>
                <th className="text-right py-3 px-4 font-semibold">الهاتف</th>
                <th className="text-right py-3 px-4 font-semibold">العمل الفني</th>
                <th className="text-right py-3 px-4 font-semibold">المبلغ</th>
                <th className="text-right py-3 px-4 font-semibold">الحالة</th>
                <th className="text-right py-3 px-4 font-semibold">التاريخ</th>
                <th className="text-right py-3 px-4 font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">#{order.id}</td>
                  <td className="py-3 px-4">{order.customerName}</td>
                  <td className="py-3 px-4">{order.email}</td>
                  <td className="py-3 px-4">{order.phone}</td>
                  <td className="py-3 px-4">{order.artworkTitle}</td>
                  <td className="py-3 px-4">{order.amount.toLocaleString()} د.إ</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="pending">معلق</option>
                      <option value="completed">مكتمل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderArtworkForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {editingArtwork ? 'تعديل العمل الفني' : 'إضافة عمل فني جديد'}
            </h3>
            <button
              onClick={() => setShowArtworkForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Arabic Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان (عربي) *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>

            {/* English Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان (إنجليزي) *
              </label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>

            {/* French Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان (فرنسي) *
              </label>
              <input
                type="text"
                value={formData.titleFr}
                onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>

            {/* Category and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الفئة *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  السعر (د.إ) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
            </div>

            {/* Status and Year */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الحالة *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="available">متاح</option>
                  <option value="sold">مباع</option>
                  <option value="unavailable">غير متاح</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  السنة *
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الأبعاد *
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="مثال: 80x60 cm"
                required
              />
            </div>

            {/* Medium in Arabic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوسط الفني (عربي) *
              </label>
              <input
                type="text"
                value={formData.medium}
                onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="مثال: زيت على قماش"
                required
              />
            </div>

            {/* Medium in English */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوسط الفني (إنجليزي) *
              </label>
              <input
                type="text"
                value={formData.mediumEn}
                onChange={(e) => setFormData({ ...formData, mediumEn: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Example: Oil on Canvas"
                required
              />
            </div>

            {/* Medium in French */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوسط الفني (فرنسي) *
              </label>
              <input
                type="text"
                value={formData.mediumFr}
                onChange={(e) => setFormData({ ...formData, mediumFr: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Exemple: Huile sur Toile"
                required
              />
            </div>

            {/* Description in Arabic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوصف (عربي) *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="3"
                required
              />
            </div>

            {/* Description in English */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوصف (إنجليزي) *
              </label>
              <textarea
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="3"
                required
              />
            </div>

            {/* Description in French */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الوصف (فرنسي) *
              </label>
              <textarea
                value={formData.descriptionFr}
                onChange={(e) => setFormData({ ...formData, descriptionFr: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows="3"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                صورة العمل الفني
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              {formData.image && (
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSaveArtwork}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              حفظ
            </button>
            <button
              onClick={() => setShowArtworkForm(false)}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800">لوحة التحكم</h1>
          <p className="text-sm text-gray-600">Daghlis Art</p>
        </div>
        
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-right px-6 py-3 flex items-center gap-3 hover:bg-gray-50 ${
              activeTab === 'dashboard' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-700'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            الرئيسية
          </button>
          
          <button
            onClick={() => setActiveTab('artworks')}
            className={`w-full text-right px-6 py-3 flex items-center gap-3 hover:bg-gray-50 ${
              activeTab === 'artworks' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-700'
            }`}
          >
            <Package className="h-5 w-5" />
            الأعمال الفنية
          </button>
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-right px-6 py-3 flex items-center gap-3 hover:bg-gray-50 ${
              activeTab === 'orders' ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-700'
            }`}
          >
            <Users className="h-5 w-5" />
            الطلبات
          </button>
          
          <button
            onClick={onLogout}
            className="w-full text-right px-6 py-3 flex items-center gap-3 hover:bg-gray-50 text-red-600"
          >
            <LogOut className="h-5 w-5" />
            تسجيل الخروج
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'artworks' && renderArtworks()}
        {activeTab === 'orders' && renderOrders()}
      </div>

      {/* Artwork Form Modal */}
      {showArtworkForm && renderArtworkForm()}
    </div>
  );
};

export default AdminPanel;

