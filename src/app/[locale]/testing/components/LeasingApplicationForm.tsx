'use client';

import { AnimatedElement } from '../../../../components/animations/AnimationType'; // Updated import
import React, { useState, FormEvent } from 'react';

// Form Types
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

const ModernLeasingForm: React.FC = () => {
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <AnimatedElement type="fadeIn" delay={0.2} duration={0.8}>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">
              طلب إستئجار موقع
            </h1>
            <p className="text-lg text-gray-600">Leasing Application Form</p>
            <div className="mt-4 h-1 w-20 bg-[#DBA426] rounded-full mx-auto"></div>
          </div>
        </AnimatedElement>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Company Information */}
          <AnimatedElement type="slideRight" delay={0.3} duration={0.6}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                Company Information / معلومات الشركة
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="إسم الشركة / Company Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                    required
                  />
                </div>

                <div>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="الموقع الإلكتروني / Website"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                  />
                </div>

                <div className="md:col-span-2">
                  <textarea
                    value={formData.postalAddress}
                    onChange={(e) => handleInputChange('postalAddress', e.target.value)}
                    rows={3}
                    placeholder="العنوان البريدي / Postal Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right resize-none"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="التليفون / Phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={formData.fax}
                    onChange={(e) => handleInputChange('fax', e.target.value)}
                    placeholder="الفاكس / Fax"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Contact Person */}
          <AnimatedElement type="slideLeft" delay={0.3} duration={0.6}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                Contact Person / الشخص المسؤول
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    value={formData.responsiblePerson}
                    onChange={(e) => handleInputChange('responsiblePerson', e.target.value)}
                    placeholder="إسم المسئول / Responsible Person"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="الوظيفة / Position"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="الموبايل / Mobile"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="البريد الإلكتروني / Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                    required
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Brand Information */}
          <AnimatedElement type="slideUp" delay={0.4} duration={0.6}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                Brand Information / معلومات العلامة التجارية
              </h3>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={formData.agencyBrandName}
                    onChange={(e) => handleInputChange('agencyBrandName', e.target.value)}
                    placeholder="إسم الوكالة / العلامة التجارية / Agency / Brand Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <select
                      value={formData.franchiseOwner}
                      onChange={(e) => handleInputChange('franchiseOwner', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:[#DBA426] focus:border-transparent text-right"
                      required
                    >
                      <option value="">هل انتم أصحاب الإمتياز؟ / Franchise Owner?</option>
                      <option value="yes">نعم / Yes</option>
                      <option value="no">لا / No</option>
                    </select>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={formData.countryOfOrigin}
                      onChange={(e) => handleInputChange('countryOfOrigin', e.target.value)}
                      placeholder="بلد المنشأ / Country of Origin"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring[#DBA426] focus:border-transparent text-right"
                      required
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    value={formData.branchesInEgypt}
                    onChange={(e) => handleInputChange('branchesInEgypt', e.target.value)}
                    rows={2}
                    placeholder="عدد الفروع داخل مصر ومواقعها / Branches in Egypt"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right resize-none"
                  />
                </div>

                <div>
                  <textarea
                    value={formData.branchesOutsideEgypt}
                    onChange={(e) => handleInputChange('branchesOutsideEgypt', e.target.value)}
                    rows={2}
                    placeholder="عدد الفروع خارج مصر ومواقعها / Branches Outside Egypt"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right resize-none"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Business Categories */}
          <AnimatedElement type="slideRight" delay={0.4} duration={0.6}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                Business Categories / تصنيف النشاط
              </h3>

              <div className="space-y-8">
                {/* Clothes */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">
                    <span dir="rtl">أزياء</span> / Clothes
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categoryItems.map(item => (
                      <label key={item.key} className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-orange-50">
                        <input
                          type="checkbox"
                          checked={formData.clothes[item.key]}
                          onChange={(e) => handleCategoryChange('clothes', item.key, e.target.checked)}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="ml-3 text-sm font-medium">
                          <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">
                    <span dir="rtl">إكسسوارات</span> / Accessories
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categoryItems.map(item => (
                      <label key={item.key} className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-orange-50">
                        <input
                          type="checkbox"
                          checked={formData.accessories[item.key]}
                          onChange={(e) => handleCategoryChange('accessories', item.key, e.target.checked)}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="ml-3 text-sm font-medium">
                          <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Shoes & Leather */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">
                    <span dir="rtl">أحذية وجلديات</span> / Shoes & Leather
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categoryItems.map(item => (
                      <label key={item.key} className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-orange-50">
                        <input
                          type="checkbox"
                          checked={formData.shoesLeather[item.key]}
                          onChange={(e) => handleCategoryChange('shoesLeather', item.key, e.target.checked)}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="ml-3 text-sm font-medium">
                          <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Other Categories */}
                <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
                  <label className="flex items-center cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-orange-50">
                    <input
                      type="checkbox"
                      checked={formData.perfumesBeauty}
                      onChange={(e) => handleInputChange('perfumesBeauty', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-3 text-sm font-medium">
                      <span dir="rtl">عطور وتجميل</span> / Perfumes & Beauty
                    </span>
                  </label>

                  <label className="flex items-center cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-orange-50">
                    <input
                      type="checkbox"
                      checked={formData.restaurants}
                      onChange={(e) => handleInputChange('restaurants', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-3 text-sm font-medium">
                      <span dir="rtl">مطاعم</span> / Restaurants
                    </span>
                  </label>

                  <label className="flex items-center cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-orange-50">
                    <input
                      type="checkbox"
                      checked={formData.jewellsWatches}
                      onChange={(e) => handleInputChange('jewellsWatches', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-3 text-sm font-medium">
                      <span dir="rtl">مجوهرات وساعات</span> / Jewells & Watches
                    </span>
                  </label>
                </div>

                {/* Specify Fields */}
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <input
                    type="text"
                    value={formData.furniture}
                    onChange={(e) => handleInputChange('furniture', e.target.value)}
                    placeholder="مفروشات / أجهزة / Furniture"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426]  focus:border-transparent text-right"
                  />
                  <input
                    type="text"
                    value={formData.services}
                    onChange={(e) => handleInputChange('services', e.target.value)}
                    placeholder="خدمات / Services"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                  />
                  <input
                    type="text"
                    value={formData.others}
                    onChange={(e) => handleInputChange('others', e.target.value)}
                    placeholder="أخرى / Others"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBA426] focus:border-transparent text-right"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Target Market */}
          <AnimatedElement type="slideLeft" delay={0.4} duration={0.6}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                Target Market / السوق المستهدف
              </h3>

              {/* Product Price */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  <span dir="rtl">سعر المنتج</span> / Product Price
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'low', arLabel: 'منخفض', enLabel: 'Low' },
                    { value: 'average', arLabel: 'متوسط', enLabel: 'Average' },
                    { value: 'high', arLabel: 'مرتفع', enLabel: 'High' }
                  ].map(item => (
                    <label key={item.value} className={`flex items-center cursor-pointer p-4 rounded-xl border ${formData.productPrice === item.value ? 'border-[#DBA426] bg-[#FDF6E3]' : 'border-gray-200 hover:border-[#DBA426]'}`}>
                      <input
                        type="radio"
                        name="productPrice"
                        value={item.value}
                        checked={formData.productPrice === item.value}
                        onChange={(e) => handleInputChange('productPrice', e.target.value)}
                        className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-[#DBA426]"
                      />
                      <span className="ml-3 text-sm font-medium">
                        <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Targeted Customers */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  <span dir="rtl">الشريحة المستهدفة</span> / Targeted Customers
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categoryItems.map(item => (
                    <label key={item.key} className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-teal-50">
                      <input
                        type="checkbox"
                        checked={formData.targetedCustomers[item.key]}
                        onChange={(e) => handleCategoryChange('targetedCustomers', item.key, e.target.checked)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="ml-3 text-sm font-medium">
                        <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Income */}
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  <span dir="rtl">فئة دخل الشريحة المستهدفة</span> / Income Level
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'average', arLabel: 'متوسط', enLabel: 'Average' },
                    { value: 'above-average', arLabel: 'فوق المتوسط', enLabel: 'Above Average' },
                    { value: 'high', arLabel: 'مرتفع', enLabel: 'High' }
                  ].map(item => (
                    <label key={item.value} className={`flex items-center cursor-pointer p-4 rounded-xl border ${formData.customerIncome === item.value ? 'border-teal-400 bg-teal-50' : 'border-gray-200 hover:border-teal-200'}`}>
                      <input
                        type="radio"
                        name="customerIncome"
                        value={item.value}
                        checked={formData.customerIncome === item.value}
                        onChange={(e) => handleInputChange('customerIncome', e.target.value)}
                        className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                      />
                      <span className="ml-3 text-sm font-medium">
                        <span dir="rtl">{item.arLabel}</span> / {item.enLabel}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Location Information */}
          <AnimatedElement type="slideUp" delay={0.5} duration={0.6}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                Location Information / معلومات الموقع
              </h3>

              <div className="space-y-6">
                <input
                  type="text"
                  value={formData.requiredLocation}
                  onChange={(e) => handleInputChange('requiredLocation', e.target.value)}
                  placeholder="الموقع المطلوب (اسم المول) / Required Location (Mall Name)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    value={formData.shopNo}
                    onChange={(e) => handleInputChange('shopNo', e.target.value)}
                    placeholder="محل رقم / Shop No."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                  />
                  <input
                    type="text"
                    value={formData.floorNo}
                    onChange={(e) => handleInputChange('floorNo', e.target.value)}
                    placeholder="رقم الدور / Floor No."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                  />
                  <input
                    type="text"
                    value={formData.areaNo}
                    onChange={(e) => handleInputChange('areaNo', e.target.value)}
                    placeholder="منطقة رقم / Area No."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                  />
                  <input
                    type="number"
                    value={formData.requiredArea}
                    onChange={(e) => handleInputChange('requiredArea', e.target.value)}
                    placeholder="المساحة المطلوبة (م²) / Required Area (m²)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                    min="0"
                  />
                </div>

                <textarea
                  value={formData.otherConditions}
                  onChange={(e) => handleInputChange('otherConditions', e.target.value)}
                  rows={3}
                  placeholder="شروط خاصة بالمحل / Other Conditions"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right resize-none"
                />
              </div>
            </div>
          </AnimatedElement>

          {/* Required Documents */}
          <AnimatedElement type="fadeIn" delay={0.5} duration={0.7}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                Required Documents / الوثائق المطلوبة
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-0.5">•</span>
                  <div>
                    <span dir="rtl" className="font-medium">ملف الشركة</span>{' '}
                    <span className="text-gray-600">/ Company&apos;s Profile</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-0.5">•</span>
                  <div>
                    <span dir="rtl" className="font-medium">ملف الوكالة / العلامة التجارية</span>{' '}
                    <span className="text-gray-600">/ Brand Presentation</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-0.5">•</span>
                  <div>
                    <span dir="rtl" className="font-medium">صور من المحلات الحالية</span>{' '}
                    <span className="text-gray-600">/ Shop Photos</span>
                  </div>
                </li>
              </ul>
            </div>
          </AnimatedElement>

          {/* Submit Button */}
          <AnimatedElement type="scaleIn" delay={0.6} duration={0.7}>
            <div className="flex justify-center py-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  px-10 py-3 bg-blue-600 text-white font-medium rounded-xl text-lg shadow-md
                  hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300
                  transition-all duration-200
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
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
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span dir="rtl">إرسال الطلب</span> / Submit Application
                  </span>
                )}
              </button>
            </div>
          </AnimatedElement>

          {/* Footer Note */}
          <AnimatedElement type="fadeIn" delay={0.7} duration={0.6}>
            <div className="text-center text-sm text-gray-500 mt-6">
              <p dir="rtl">يرجى التأكد من ملء جميع الحقول المطلوبة</p>
              <p>Please ensure all required fields are completed</p>
            </div>
          </AnimatedElement>

        </form>
      </div>
    </div>
  );
};

export default ModernLeasingForm;