import React, { useState } from 'react';
import { Plus, Upload, X, CheckCircle, DollarSign, Building } from 'lucide-react';
import { ItemFormData, User } from '../types/Item';

interface AddItemProps {
  onAddItem: (item: ItemFormData) => void;
  user: User;
}

const AddItem: React.FC<AddItemProps> = ({ onAddItem, user }) => {
  const [formData, setFormData] = useState<ItemFormData>({
    name: '',
    type: '',
    category: 'clothing',
    description: '',
    price: 0,
    coverImage: null,
    additionalImages: [],
    companyName: user.companyName || ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const itemTypes = [
    'Shirt',
    'Pant',
    'Shoes',
    'Sports Gear',
    'Accessories',
    'Jacket',
    'Dress',
    'Shorts',
    'Skirt',
    'Electronics',
    'Books',
    'Home & Garden',
    'Beauty',
    'Toys',
    'Other'
  ];

  const categories = [
    { value: 'clothing', label: 'Clothing' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'sports', label: 'Sports' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'books', label: 'Books' },
    { value: 'toys', label: 'Toys' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'price' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ 
      ...prev, 
      additionalImages: [...prev.additionalImages, ...files] 
    }));
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      if (!formData.coverImage) {
        setFormData(prev => ({ ...prev, coverImage: files[0] }));
        if (files.length > 1) {
          setFormData(prev => ({ 
            ...prev, 
            additionalImages: [...prev.additionalImages, ...files.slice(1)] 
          }));
        }
      } else {
        setFormData(prev => ({ 
          ...prev, 
          additionalImages: [...prev.additionalImages, ...files] 
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.description || formData.price <= 0 || !formData.companyName) {
      alert('Please fill in all required fields and set a valid price.');
      return;
    }

    onAddItem(formData);
    
    // Reset form
    setFormData({
      name: '',
      type: '',
      category: 'clothing',
      description: '',
      price: 0,
      coverImage: null,
      additionalImages: [],
      companyName: user.companyName || ''
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <Plus className="text-blue-400" size={28} />
        <h1 className="text-3xl font-bold text-white">Add New Item</h1>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-900/50 border border-green-500/50 rounded-lg p-4 flex items-center space-x-3 animate-fade-in">
          <CheckCircle className="text-green-400" size={24} />
          <p className="text-green-300 font-medium">Item successfully added!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6 border border-gray-700">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
            Item Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
            placeholder="Enter item name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-semibold text-gray-300 mb-2">
              Item Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
            >
              <option value="">Select item type</option>
              {itemTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-300 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-semibold text-gray-300 mb-2">
            Company Name *
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              placeholder="Enter company name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-300 mb-2">
            Price *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price || ''}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
            Item Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-white placeholder-gray-400"
            placeholder="Describe the item in detail"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Cover Image
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
              dragOver ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
          >
            {formData.coverImage ? (
              <div className="flex items-center space-x-3">
                <img
                  src={URL.createObjectURL(formData.coverImage)}
                  alt="Cover"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium text-white">{formData.coverImage.name}</p>
                  <p className="text-sm text-gray-400">
                    {(formData.coverImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, coverImage: null }))}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-400 mb-2">Drag and drop your cover image here, or</p>
                <label className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Additional Images
          </label>
          <div className="space-y-3">
            {formData.additionalImages.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 bg-gray-700 p-3 rounded-lg">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Additional ${index + 1}`}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-white">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAdditionalImage(index)}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            
            <label className="block w-full border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200">
              <Upload className="mx-auto text-gray-400 mb-2" size={24} />
              <span className="text-gray-400">Add more images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;