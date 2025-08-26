'use client';

import { AnimatedElement } from '../../../../components/animations/AnimationType'; // Updated import
import React, { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

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
  labelKey: string;
}

const ModernLeasingForm: React.FC = () => {
  const t = useTranslations('LeasingApplicationForm');
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
      alert(t('messages.submitSuccess'));
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('messages.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryItems: CategoryItem[] = [
    { key: 'women', labelKey: 'subcategories.women' },
    { key: 'gents', labelKey: 'subcategories.gents' },
    { key: 'kids', labelKey: 'subcategories.kids' },
    { key: 'family', labelKey: 'subcategories.family' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <AnimatedElement type="fadeIn" delay={0.2} duration={0.8}>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" dir="rtl">
              {t('title')}
            </h1>
            <div className="mt-4 h-1 w-20 bg-yellow-600 rounded-full mx-auto"></div>
          </div>
        </AnimatedElement>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Company Information */}
          <AnimatedElement type="slideRight" delay={0.3} duration={0.6}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                {t('sections.companyInformation')} 
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder={`${t('placeholders.companyName')}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                    required
                  />
                </div>

                <div>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder={`${t('placeholders.website')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                  />
                </div>

                <div className="md:col-span-2">
                  <textarea
                    value={formData.postalAddress}
                    onChange={(e) => handleInputChange('postalAddress', e.target.value)}
                    rows={3}
                    placeholder={`${t('placeholders.postalAddress')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right resize-none"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={`${t('placeholders.phone')}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={formData.fax}
                    onChange={(e) => handleInputChange('fax', e.target.value)}
                    placeholder={`${t('placeholders.fax')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Contact Person */}
          <AnimatedElement type="slideLeft" delay={0.3} duration={0.6}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                {t('sections.contactPerson')}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    value={formData.responsiblePerson}
                    onChange={(e) => handleInputChange('responsiblePerson', e.target.value)}
                    placeholder={`${t('placeholders.responsiblePerson')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder={`${t('placeholders.position')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder={`${t('placeholders.mobile')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={`${t('placeholders.email')}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
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
                {t('sections.brandInformation')}
              </h3>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={formData.agencyBrandName}
                    onChange={(e) => handleInputChange('agencyBrandName', e.target.value)}
                    placeholder={`${t('placeholders.agencyBrandName')}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <select
                      value={formData.franchiseOwner}
                      onChange={(e) => handleInputChange('franchiseOwner', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                      required
                    >
                      <option value="">{t('placeholders.franchiseOwner')}</option>
                      <option value="yes">{t('options.yes')} </option>
                      <option value="no">{t('options.no')}</option>
                    </select>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={formData.countryOfOrigin}
                      onChange={(e) => handleInputChange('countryOfOrigin', e.target.value)}
                      placeholder={`${t('placeholders.countryOfOrigin')}`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                      required
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    value={formData.branchesInEgypt}
                    onChange={(e) => handleInputChange('branchesInEgypt', e.target.value)}
                    rows={2}
                    placeholder={`${t('placeholders.branchesInEgypt')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right resize-none"
                  />
                </div>

                <div>
                  <textarea
                    value={formData.branchesOutsideEgypt}
                    onChange={(e) => handleInputChange('branchesOutsideEgypt', e.target.value)}
                    rows={2}
                    placeholder={`${t('placeholders.branchesOutsideEgypt')}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right resize-none"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Business Categories */}
          <AnimatedElement type="slideRight" delay={0.4} duration={0.6}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                {t('sections.businessCategories')}
              </h3>

              <div className="space-y-8">
                {/* Clothes */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">
                    {t('categories.clothes')}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categoryItems.map(item => (
                      <label key={item.key} className={`flex items-center cursor-pointer p-3 rounded-lg border ${formData.clothes[item.key] ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-200'}`}>
                        <input
                          type="checkbox"
                          checked={formData.clothes[item.key]}
                          onChange={(e) => handleCategoryChange('clothes', item.key, e.target.checked)}
                          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 focus:ring-offset-1"
                        />
                        <span className="ml-3 text-sm font-medium">
                          {t(item.labelKey)} 
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">
                    {t('categories.accessories')}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categoryItems.map(item => (
                      <label key={item.key} className={`flex items-center cursor-pointer p-3 rounded-lg border ${formData.accessories[item.key] ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-200'}`}>
                        <input
                          type="checkbox"
                          checked={formData.accessories[item.key]}
                          onChange={(e) => handleCategoryChange('accessories', item.key, e.target.checked)}
                          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 focus:ring-offset-1"
                        />
                        <span className="ml-3 text-sm font-medium">
                          {t(item.labelKey)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Shoes & Leather */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">
                    {t('categories.shoesLeather')} 
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categoryItems.map(item => (
                      <label key={item.key} className={`flex items-center cursor-pointer p-3 rounded-lg border ${formData.shoesLeather[item.key] ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-200'}`}>
                        <input
                          type="checkbox"
                          checked={formData.shoesLeather[item.key]}
                          onChange={(e) => handleCategoryChange('shoesLeather', item.key, e.target.checked)}
                          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 focus:ring-offset-1"
                        />
                        <span className="ml-3 text-sm font-medium">
                          {t(item.labelKey)} 
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Other Categories */}
                <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
                  <label className={`flex items-center cursor-pointer p-4 rounded-xl border ${formData.jewellsWatches ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-200'}`}>
                    <input
                      type="checkbox"
                      checked={formData.jewellsWatches}
                      onChange={(e) => handleInputChange('jewellsWatches', e.target.checked)}
                      className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 focus:ring-offset-1"
                    />
                    <span className="ml-3 text-sm font-medium">
                      {t('categories.jewellsWatches')} 
                    </span>
                  </label>
                </div>

                {/* Specify Fields */}
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <input
                    type="text"
                    value={formData.furniture}
                    onChange={(e) => handleInputChange('furniture', e.target.value)}
                    placeholder={`${t('placeholders.furniture')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                  />
                  <input
                    type="text"
                    value={formData.services}
                    onChange={(e) => handleInputChange('services', e.target.value)}
                    placeholder={`${t('placeholders.services')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                  />
                  <input
                    type="text"
                    value={formData.others}
                    onChange={(e) => handleInputChange('others', e.target.value)}
                    placeholder={`${t('placeholders.others')}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Target Market */}
          <AnimatedElement type="slideLeft" delay={0.4} duration={0.6}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                {t('sections.targetMarket')}
              </h3>

              {/* Product Price */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  {t('labels.productPrice')} 
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'low', labelKey: 'options.low' },
                    { value: 'average', labelKey: 'options.average' },
                    { value: 'high', labelKey: 'options.high' }
                  ].map(item => (
                    <label key={item.value} className={`flex items-center cursor-pointer p-4 rounded-xl border ${formData.productPrice === item.value ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-200'}`}>
                      <input
                        type="radio"
                        name="productPrice"
                        value={item.value}
                        checked={formData.productPrice === item.value}
                        onChange={(e) => handleInputChange('productPrice', e.target.value)}
                        className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500 focus:ring-offset-1"
                      />
                      <span className="ml-3 text-sm font-medium">
                        {t(item.labelKey)} 
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Targeted Customers */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  {t('labels.targetedCustomers')}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categoryItems.map(item => (
                    <label key={item.key} className={`flex items-center cursor-pointer p-3 rounded-lg border ${formData.targetedCustomers[item.key] ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-200'}`}>
                      <input
                        type="checkbox"
                        checked={formData.targetedCustomers[item.key]}
                        onChange={(e) => handleCategoryChange('targetedCustomers', item.key, e.target.checked)}
                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 focus:ring-offset-1"
                      />
                      <span className="ml-3 text-sm font-medium">
                        {t(item.labelKey)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Income */}
              <div>
                <h4 className="text-md font-medium text-gray-800 mb-4">
                  {t('labels.customerIncome')}
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'average', labelKey: 'options.average' },
                    { value: 'above-average', labelKey: 'options.aboveAverage' },
                    { value: 'high', labelKey: 'options.high' }
                  ].map(item => (
                    <label key={item.value} className={`flex items-center cursor-pointer p-4 rounded-xl border ${formData.customerIncome === item.value ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-200'}`}>
                      <input
                        type="radio"
                        name="customerIncome"
                        value={item.value}
                        checked={formData.customerIncome === item.value}
                        onChange={(e) => handleInputChange('customerIncome', e.target.value)}
                        className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500 focus:ring-offset-1"
                      />
                      <span className="ml-3 text-sm font-medium">
                        {t(item.labelKey)}
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
                {t('sections.locationInformation')} 
              </h3>

              <div className="space-y-6">
                <input
                  type="text"
                  value={formData.requiredLocation}
                  onChange={(e) => handleInputChange('requiredLocation', e.target.value)}
                  placeholder={`${t('placeholders.requiredLocation')}`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                  required
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    value={formData.shopNo}
                    onChange={(e) => handleInputChange('shopNo', e.target.value)}
                    placeholder={`${t('placeholders.shopNo')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                  />
                  <input
                    type="text"
                    value={formData.floorNo}
                    onChange={(e) => handleInputChange('floorNo', e.target.value)}
                    placeholder={`${t('placeholders.floorNo')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                  />
                  <input
                    type="text"
                    value={formData.areaNo}
                    onChange={(e) => handleInputChange('areaNo', e.target.value)}
                    placeholder={`${t('placeholders.areaNo')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                  />
                  <input
                    type="number"
                    value={formData.requiredArea}
                    onChange={(e) => handleInputChange('requiredArea', e.target.value)}
                    placeholder={`${t('placeholders.requiredArea')} `}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right"
                    min="0"
                  />
                </div>

                <textarea
                  value={formData.otherConditions}
                  onChange={(e) => handleInputChange('otherConditions', e.target.value)}
                  rows={3}
                  placeholder={`${t('placeholders.otherConditions')} `}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:ring-offset-2 text-right resize-none"
                />
              </div>
            </div>
          </AnimatedElement>

          {/* Required Documents */}
          <AnimatedElement type="fadeIn" delay={0.5} duration={0.7}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-3">
                {t('sections.requiredDocuments')} 
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                  <div>
                    <span dir="rtl" className="font-medium">{t('documents.companyProfile')}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                  <div>
                    <span dir="rtl" className="font-medium">{t('documents.brandPresentation')}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-0.5">•</span>
                  <div>
                    <span dir="rtl" className="font-medium">{t('documents.shopPhotos')}</span>
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
                  px-10 py-3 bg-yellow-600 text-white font-medium rounded-xl text-lg shadow-md
                  hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-offset-2
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
                    {t('buttons.processing')}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span dir="rtl">{t('buttons.submit')}</span>
                  </span>
                )}
              </button>
            </div>
          </AnimatedElement>

          {/* Footer Note */}
          <AnimatedElement type="fadeIn" delay={0.7} duration={0.6}>
            <div className="text-center text-sm text-gray-500 mt-6">
              <p dir="rtl">{t('footer.note')}</p>
              <p>Please ensure all required fields are completed</p>
            </div>
          </AnimatedElement>

        </form>
      </div>
    </div>
  );
};

export default ModernLeasingForm;