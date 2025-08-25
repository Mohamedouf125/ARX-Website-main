'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';

// Type Definitions
interface CategoryOptions {
  women: boolean;
  gents: boolean;
  kids: boolean;
  family: boolean;
}

interface FormData {
  companyName: string;
  postalAddress: string;
  website: string;
  phone: string;
  fax: string;
  responsiblePerson: string;
  position: string;
  mobile: string;
  email: string;
  agencyBrandName: string;
  franchiseOwner: string;
  countryOfOrigin: string;
  branchesInEgypt: string;
  branchesOutsideEgypt: string;
  clothes: CategoryOptions;
  accessories: CategoryOptions;
  shoesLeather: CategoryOptions;
  perfumesBeauty: boolean;
  restaurants: boolean;
  jewellsWatches: boolean;
  furniture: string;
  services: string;
  others: string;
  productPrice: string;
  targetedCustomers: CategoryOptions;
  customerIncome: string;
  requiredLocation: string;
  shopNo: string;
  floorNo: string;
  areaNo: string;
  requiredArea: string;
  otherConditions: string;
}

interface CategoryItem {
  key: keyof CategoryOptions;
  arLabel: string;
  enLabel: string;
}

const LeasingApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    postalAddress: '',
    website: '',
    phone: '',
    fax: '',
    responsiblePerson: '',
    position: '',
    mobile: '',
    email: '',
    agencyBrandName: '',
    franchiseOwner: '',
    countryOfOrigin: '',
    branchesInEgypt: '',
    branchesOutsideEgypt: '',
    clothes: { women: false, gents: false, kids: false, family: false },
    accessories: { women: false, gents: false, kids: false, family: false },
    shoesLeather: { women: false, gents: false, kids: false, family: false },
    perfumesBeauty: false,
    restaurants: false,
    jewellsWatches: false,
    furniture: '',
    services: '',
    others: '',
    productPrice: '',
    targetedCustomers: { women: false, gents: false, kids: false, family: false },
    customerIncome: '',
    requiredLocation: '',
    shopNo: '',
    floorNo: '',
    areaNo: '',
    requiredArea: '',
    otherConditions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryChange = (
    category: 'clothes' | 'accessories' | 'shoesLeather' | 'targetedCustomers',
    subcategory: keyof CategoryOptions,
    checked: boolean
  ): void => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: checked
      }
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryItems: CategoryItem[] = [
    { key: 'women', arLabel: 'نسائي', enLabel: 'Women' },
    { key: 'gents', arLabel: 'رجالي', enLabel: 'Gents' },
    { key: 'kids', arLabel: 'أطفال', enLabel: 'Kids' },
    { key: 'family', arLabel: 'عائلي', enLabel: 'Family' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">
            طلب إستئجار موقع
          </h1>
          <h2 className="text-xl text-gray-600">
            Leasing Application Form
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
              Company Information / معلومات الشركة
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">إسم الشركة</span> / Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">الموقع الإلكتروني</span> / Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">العنوان البريدي</span> / Postal Address
                </label>
                <textarea
                  value={formData.postalAddress}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange('postalAddress', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">التليفون</span> / Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">الفاكس</span> / Fax
                </label>
                <input
                  type="tel"
                  value={formData.fax}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('fax', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Person */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
              Contact Person / الشخص المسؤول
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">إسم المسئول</span> / Responsible Person
                </label>
                <input
                  type="text"
                  value={formData.responsiblePerson}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('responsiblePerson', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">الوظيفة</span> / Position
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">الموبايل</span> / Mobile
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('mobile', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">البريد الإلكتروني</span> / Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Brand Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
              Brand Information / معلومات العلامة التجارية
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">إسم الوكالة / العلامة التجارية</span> / Agency / Brand Name
                </label>
                <input
                  type="text"
                  value={formData.agencyBrandName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('agencyBrandName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span dir="rtl">هل انتم أصحاب الإمتياز؟</span> / Franchise Owner?
                  </label>
                  <select
                    value={formData.franchiseOwner}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange('franchiseOwner', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select / اختر</option>
                    <option value="yes">Yes / نعم</option>
                    <option value="no">No / لا</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span dir="rtl">بلد المنشأ</span> / Country of Origin
                  </label>
                  <input
                    type="text"
                    value={formData.countryOfOrigin}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('countryOfOrigin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">عدد الفروع داخل مصر ومواقعها</span> / Branches in Egypt
                </label>
                <textarea
                  value={formData.branchesInEgypt}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange('branchesInEgypt', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">عدد الفروع خارج مصر ومواقعها</span> / Branches Outside Egypt
                </label>
                <textarea
                  value={formData.branchesOutsideEgypt}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange('branchesOutsideEgypt', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Business Categories */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
              Business Categories / تصنيف النشاط
            </h3>

            <div className="space-y-4">
              {/* Clothes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  <span dir="rtl">أزياء</span> / Clothes
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categoryItems.map(item => (
                    <label key={item.key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.clothes[item.key]}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => 
                          handleCategoryChange('clothes', item.key, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm">
                        <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  <span dir="rtl">إكسسوارات</span> / Accessories
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categoryItems.map(item => (
                    <label key={item.key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.accessories[item.key]}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => 
                          handleCategoryChange('accessories', item.key, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm">
                        <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shoes & Leather */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  <span dir="rtl">أحذية وجلديات</span> / Shoes & Leather
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categoryItems.map(item => (
                    <label key={item.key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.shoesLeather[item.key]}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => 
                          handleCategoryChange('shoesLeather', item.key, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm">
                        <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Other Categories */}
              <div className="grid md:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.perfumesBeauty}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleInputChange('perfumesBeauty', e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">
                    <span dir="rtl">عطور وتجميل</span> / Perfumes & Beauty
                  </span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.restaurants}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleInputChange('restaurants', e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">
                    <span dir="rtl">مطاعم</span> / Restaurants
                  </span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.jewellsWatches}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      handleInputChange('jewellsWatches', e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">
                    <span dir="rtl">مجوهرات وساعات</span> / Jewells & Watches
                  </span>
                </label>
              </div>

              {/* Specify Fields */}
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span dir="rtl">مفروشات / أجهزة</span> / Furniture
                  </label>
                  <input
                    type="text"
                    value={formData.furniture}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('furniture', e.target.value)}
                    placeholder="Please specify..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span dir="rtl">خدمات</span> / Services
                  </label>
                  <input
                    type="text"
                    value={formData.services}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('services', e.target.value)}
                    placeholder="Please specify..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span dir="rtl">أخرى</span> / Others
                  </label>
                  <input
                    type="text"
                    value={formData.others}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('others', e.target.value)}
                    placeholder="Please specify..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Target Market */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
              Target Market / السوق المستهدف
            </h3>

            {/* Product Price */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                <span dir="rtl">سعر المنتج</span> / Product Price
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'low', arLabel: 'منخفض', enLabel: 'Low' },
                  { value: 'average', arLabel: 'متوسط', enLabel: 'Average' },
                  { value: 'high', arLabel: 'مرتفع', enLabel: 'High' }
                ].map(item => (
                  <label key={item.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="productPrice"
                      value={item.value}
                      checked={formData.productPrice === item.value}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('productPrice', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">
                      <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Targeted Customers */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                <span dir="rtl">الشريحة المستهدفة</span> / Targeted Customers
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categoryItems.map(item => (
                  <label key={item.key} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.targetedCustomers[item.key]}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => 
                        handleCategoryChange('targetedCustomers', item.key, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">
                      <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Customer Income */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                <span dir="rtl">فئة دخل الشريحة المستهدفة</span> / Income Level
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'average', arLabel: 'متوسط', enLabel: 'Average' },
                  { value: 'above-average', arLabel: 'فوق المتوسط', enLabel: 'Above Average' },
                  { value: 'high', arLabel: 'مرتفع', enLabel: 'High' }
                ].map(item => (
                  <label key={item.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="customerIncome"
                      value={item.value}
                      checked={formData.customerIncome === item.value}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('customerIncome', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">
                      <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className=" rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-blue-200">
              Location Information / معلومات الموقع
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">الموقع المطلوب (اسم المول)</span> / Required Location (Mall Name)
                </label>
                <input
                  type="text"
                  value={formData.requiredLocation}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('requiredLocation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span dir="rtl">محل رقم</span> / Shop No.
                  </label>
                  <input
                    type="text"
                    value={formData.shopNo}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('shopNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span dir="rtl">رقم الدور</span> / Floor No.
                  </label>
                  <input
                    type="text"
                    value={formData.floorNo}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('floorNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span dir="rtl">منطقة رقم</span> / Area No.
                  </label>
                  <input
                    type="text"
                    value={formData.areaNo}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('areaNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span dir="rtl">المساحة المطلوبة (م²)</span> / Required Area (m²)
                  </label>
                  <input
                    type="number"
                    value={formData.requiredArea}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('requiredArea', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span dir="rtl">شروط خاصة بالمحل</span> / Other Conditions
                </label>
                <textarea
                  value={formData.otherConditions}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange('otherConditions', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special requirements..."
                />
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className=" rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b ">
              Required Documents / الوثائق المطلوبة
            </h3>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-700 mr-2">•</span>
                <div>
                  <span dir="rtl" className="font-medium">ملف الشركة</span>
                  <span className="text-gray-600"> / Company&apos;s Profile</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-700 mr-2">•</span>
                <div>
                  <span dir="rtl" className="font-medium">ملف الوكالة / العلامة التجارية</span>
                  <span className="text-gray-600"> / Brand Presentation</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-700 mr-2">•</span>
                <div>
                  <span dir="rtl" className="font-medium">صور من المحلات الحالية</span>
                  <span className="text-gray-600"> / Shop Photos</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center py-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                px-8 py-3 bg-blue-600 text-white font-medium rounded-md
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-colors duration-200
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <span dir="rtl">إرسال الطلب</span> / Submit Application
                </>
              )}
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm text-gray-500 mt-4">
            <p dir="rtl">يرجى التأكد من ملء جميع الحقول المطلوبة</p>
            <p>Please ensure all required fields are completed</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeasingApplicationForm;