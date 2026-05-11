'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export type SubCategory = {
  label: string;
  href: string;
};

export type MainCategory = {
  icon: string;
  label: string;
  href: string;
  subcategories: SubCategory[];
  featured?: {
    image: string;
    title: string;
    href: string;
  };
};

const megaCategories: MainCategory[] = [
  {
    icon: '🛒',
    label: 'Хүнсний дэлгүүр',
    href: '/grocery',
    subcategories: [
      { label: 'Шинэ жимс', href: '/grocery/fresh-fruits' },
      { label: 'Ногоо', href: '/grocery/vegetables' },
      { label: 'Мах, шувууны мах', href: '/grocery/meat-poultry' },
      { label: 'Далайн хүнс', href: '/grocery/seafood' },
      { label: 'Сүүн бүтээгдэхүүн', href: '/grocery/dairy-eggs' },
      { label: 'Бэйкери', href: '/grocery/bakery' },
      { label: 'Хөлдөөсөн хүнс', href: '/grocery/frozen-foods' },
      { label: 'Хөнгөн зууш', href: '/grocery/snacks' },
      { label: 'Уух зүйлс', href: '/grocery/beverages' },
      { label: 'Бэлэн хүнс', href: '/grocery/instant-foods' },
      { label: 'Будаа, гоймон', href: '/grocery/rice-noodles' },
      { label: 'Тос, соус', href: '/grocery/oil-sauces' },
      { label: 'Амтлагч', href: '/grocery/spices' },
      { label: 'Лаазалсан хүнс', href: '/grocery/canned' },
      { label: 'Органик', href: '/grocery/organic' },
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop',
      title: 'Шинэ органик ногоо',
      href: '/grocery/organic',
    },
  },
  {
    icon: '🧴',
    label: 'Гэр ахуй',
    href: '/household',
    subcategories: [
      { label: 'Цэвэрлэгээ', href: '/household/cleaning' },
      { label: 'Цаас, салфетка', href: '/household/tissue' },
      { label: 'Угаалга', href: '/household/laundry' },
      { label: 'Хувийн арчилгаа', href: '/household/personal-care' },
    ],
  },
  {
    icon: '👕',
    label: 'Хувцас',
    href: '/fashion',
    subcategories: [
      { label: 'Эрэгтэй хувцас', href: '/fashion/men' },
      { label: 'Эмэгтэй хувцас', href: '/fashion/women' },
      { label: 'Хүүхдийн хувцас', href: '/fashion/kids' },
      { label: 'Гутал', href: '/fashion/shoes' },
      { label: 'Цүнх', href: '/fashion/bags' },
      { label: 'Дагалдах хэрэгсэл', href: '/fashion/accessories' },
      { label: 'Цаг', href: '/fashion/watches' },
      { label: 'Үнэт эдлэл', href: '/fashion/jewelry' },
      { label: 'Спортын хувцас', href: '/fashion/sportswear' },
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop',
      title: 'Зуны шинэ коллекц',
      href: '/fashion/women',
    },
  },
  {
    icon: '💄',
    label: 'Гоо сайхан',
    href: '/beauty',
    subcategories: [
      { label: 'Арьс арчилгаа', href: '/beauty/skincare' },
      { label: 'Нүүр будалт', href: '/beauty/makeup' },
      { label: 'Үс арчилгаа', href: '/beauty/hair' },
      { label: 'Үнэртэй ус', href: '/beauty/fragrances' },
      { label: 'Биеийн арчилгаа', href: '/beauty/bath-body' },
      { label: 'Эрэгтэй арчилгаа', href: '/beauty/men-grooming' },
      { label: 'Гоо сайхан багаж', href: '/beauty/tools' },
      { label: 'Солонгос бүтээгдэхүүн', href: '/beauty/korean' },
    ],
  },
  {
    icon: '💻',
    label: 'Электроникс',
    href: '/electronics',
    subcategories: [
      { label: 'Гар утас', href: '/electronics/smartphones' },
      { label: 'Зөөврийн компьютер', href: '/electronics/laptops' },
      { label: 'Таблет', href: '/electronics/tablets' },
      { label: 'Дагалдах хэрэгсэл', href: '/electronics/accessories' },
      { label: 'Ухаалаг цаг', href: '/electronics/smart-watches' },
      { label: 'Аудио төхөөрөмж', href: '/electronics/audio' },
      { label: 'Тоглоом', href: '/electronics/gaming' },
      { label: 'Камер', href: '/electronics/cameras' },
      { label: 'Гэр ахуйн бараа', href: '/electronics/home-appliances' },
      { label: 'Гал тогооны бараа', href: '/electronics/kitchen' },
      { label: 'ТВ & Кино', href: '/electronics/tv' },
      { label: 'Компьютер эд анги', href: '/electronics/computer-parts' },
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
      title: 'Шинэ Gaming Laptop',
      href: '/electronics/laptops',
    },
  },
  {
    icon: '🏠',
    label: 'Гэр бүл',
    href: '/home-living',
    subcategories: [
      { label: 'Тавилга', href: '/home/furniture' },
      { label: 'Гал тогоо', href: '/home/kitchenware' },
      { label: 'Ор хөнжил', href: '/home/bedding' },
      { label: 'Гоёл чимэглэл', href: '/home/decor' },
      { label: 'Гэрэлтүүлэг', href: '/home/lighting' },
      { label: 'Багтаамж', href: '/home/storage' },
      { label: 'Угаалгын өрөө', href: '/home/bathroom' },
      { label: 'Цэцэрлэг', href: '/home/gardening' },
    ],
  },
  {
    icon: '👶',
    label: 'Хүүхэд & Бebe',
    href: '/baby-kids',
    subcategories: [
      { label: 'Bebe арчилгаа', href: '/baby/care' },
      { label: 'Подгузник', href: '/baby/diapers' },
      { label: 'Хүүхдийн хувцас', href: '/baby/clothing' },
      { label: 'Тоглоом', href: '/baby/toys' },
      { label: 'Сургуулийн хэрэглэл', href: '/baby/school' },
      { label: 'Bebe тэрэг', href: '/baby/strollers' },
      { label: 'Хооллох хэрэгсэл', href: '/baby/feeding' },
    ],
  },
  {
    icon: '💊',
    label: 'Эрүүл мэнд',
    href: '/health',
    subcategories: [
      { label: 'Эм', href: '/health/medicine' },
      { label: 'Витамин', href: '/health/vitamins' },
      { label: 'Эмнэлэгийн багаж', href: '/health/devices' },
      { label: 'Анхны тусламж', href: '/health/first-aid' },
      { label: 'Эрүүл бүтээгдэхүүн', href: '/health/wellness' },
      { label: 'Маск, ариутгагч', href: '/health/masks' },
    ],
  },
  {
    icon: '⚽',
    label: 'Спорт & Агаар',
    href: '/sports',
    subcategories: [
      { label: 'Фитнес', href: '/sports/fitness' },
      { label: 'Гадаа спорт', href: '/sports/outdoor' },
      { label: 'Кэмпинг', href: '/sports/camping' },
      { label: 'Дугуй', href: '/sports/bicycles' },
      { label: 'Спортын хувцас', href: '/sports/sportswear' },
      { label: 'Дагалдах хэрэгсэл', href: '/sports/accessories' },
    ],
  },
  {
    icon: '📚',
    label: 'Ном & Бичиг хэрэг',
    href: '/books',
    subcategories: [
      { label: 'Ном', href: '/books/books' },
      { label: 'Оффис хэрэгсэл', href: '/books/office' },
      { label: 'Сургуулийн хэрэгсэл', href: '/books/school' },
      { label: 'Уран зургийн хэрэгсэл', href: '/books/art' },
      { label: 'Хэвлэгчийн хэрэгсэл', href: '/books/printing' },
    ],
  },
  {
    icon: '🚗',
    label: 'Машин & Мото',
    href: '/automotive',
    subcategories: [
      { label: 'Машины хэрэгсэл', href: '/auto/car-accessories' },
      { label: 'Тос', href: '/auto/motor-oil' },
      { label: 'Машины электроник', href: '/auto/electronics' },
      { label: 'Цэвэрлэгээ', href: '/auto/cleaning' },
      { label: 'Мото хэрэгсэл', href: '/auto/motorcycle' },
    ],
  },
  {
    icon: '🐾',
    label: 'Тэжээвэр амьтад',
    href: '/pets',
    subcategories: [
      { label: 'Амьтны хоол', href: '/pets/food' },
      { label: 'Муурны хэрэгсэл', href: '/pets/cat' },
      { label: 'Нохойны хэрэгсэл', href: '/pets/dog' },
      { label: 'Дагалдах хэрэгсэл', href: '/pets/accessories' },
      { label: 'Ариун цэвэр', href: '/pets/hygiene' },
    ],
  },
  {
    icon: '🍔',
    label: 'Хүргэлт хоол',
    href: '/food-delivery',
    subcategories: [
      { label: 'Түргэн хоол', href: '/food/fast-food' },
      { label: 'Кофе, цай', href: '/food/coffee' },
      { label: 'Амттан', href: '/food/desserts' },
      { label: 'Азийн хоол', href: '/food/asian' },
      { label: 'Солонгос хоол', href: '/food/korean' },
      { label: 'Япон хоол', href: '/food/japanese' },
      { label: 'Эрүүл хоол', href: '/food/healthy' },
      { label: 'Уух зүйлс', href: '/food/drinks' },
    ],
  },
  {
    icon: '🎫',
    label: 'Үйлчилгээ',
    href: '/services',
    subcategories: [
      { label: 'Бэлгийн карт', href: '/services/gift-cards' },
      { label: 'Тасалбар', href: '/services/tickets' },
      { label: 'Засвар үйлчилгээ', href: '/services/repair' },
      { label: 'Угаалга', href: '/services/laundry' },
      { label: 'Цэвэрлэгээ', href: '/services/cleaning' },
      { label: 'Хүргэлт', href: '/services/delivery' },
    ],
  },
];

export default function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation timing
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow browser to paint before animating in
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setActiveCategory(null);
    // Wait for animation to finish before removing from DOM
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => {
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        handleClose();
      }}
    >
      {/* Main Categories Nav */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {/* All Categories Button */}
            <button
              className="relative flex items-center gap-2 px-3 py-2.5 font-bold hover:bg-primary-dark transition-colors whitespace-nowrap text-sm group"
              onMouseEnter={() => setActiveCategory('all')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Бүх ангилал
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-[calc(100%-16px)] transition-all duration-300 rounded-full" />
            </button>

            {/* Quick Category Links - Top 6 */}
            {megaCategories.slice(0, 6).map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="relative px-3 py-2.5 font-medium hover:bg-primary-dark transition-colors whitespace-nowrap text-sm group"
                onMouseEnter={() => setActiveCategory(cat.label)}
              >
                {cat.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-[calc(100%-16px)] transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown with Enter/Exit Animation */}
      {isOpen && (
        <div 
          className={`absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50 transition-all duration-200 ease-out origin-top ${
            isVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 -translate-y-2 scale-[0.98]'
          }`}
          style={{ 
            maxHeight: 'calc(100vh - 100px)',
            pointerEvents: isVisible ? 'auto' : 'none'
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex gap-6">
              {/* Left Sidebar - Main Categories with better styling */}
              <div className="w-64 shrink-0 bg-gradient-to-b from-gray-50/50 to-transparent rounded-xl p-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 px-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Ангилал
                </h3>
                <div className="space-y-1 max-h-[420px] overflow-y-auto scrollbar-thin">
                  {megaCategories.map((cat, idx) => (
                    <Link
                      key={cat.label}
                      href={cat.href}
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm group overflow-hidden ${
                        activeCategory === cat.label
                          ? 'bg-white shadow-sm text-primary font-medium ring-1 ring-red-100'
                          : 'hover:bg-white hover:shadow-sm text-gray-700'
                      } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                      style={{ 
                        transitionDelay: isVisible ? `${idx * 15}ms` : '0ms',
                        transitionProperty: 'opacity, transform, background-color, box-shadow'
                      }}
                      onMouseEnter={() => setActiveCategory(cat.label)}
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                      <span className="truncate">{cat.label}</span>
                      <svg 
                        className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-40 transition-opacity" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Middle - Subcategories with expanded layout */}
              <div className="flex-1 min-w-0 max-h-[440px] overflow-y-auto scrollbar-thin px-2">
                {activeCategory && activeCategory !== 'all' && (
                  <>
                    {megaCategories
                      .filter((cat) => cat.label === activeCategory)
                      .map((cat) => (
                        <div 
                          key={cat.label} 
                          className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                          style={{ transitionDelay: '50ms' }}
                        >
                          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-2xl">
                              {cat.icon}
                            </div>
                            <div>
                              <h3 className="font-black text-gray-900 text-lg">{cat.label}</h3>
                              <p className="text-xs text-gray-500">{cat.subcategories.length} дэд ангилал</p>
                            </div>
                            <Link
                              href={cat.href}
                              className="ml-auto text-sm text-primary hover:underline font-medium flex items-center gap-1 group"
                            >
                              Бүгд 
                              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                            {cat.subcategories.map((sub, idx) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                className={`group flex items-center gap-2 py-2 px-2 -mx-2 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-red-50/50 transition-all duration-150 ${
                                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                                }`}
                                style={{ 
                                  transitionDelay: isVisible ? `${50 + idx * 20}ms` : '0ms',
                                  transitionProperty: 'opacity, transform, color, background-color'
                                }}
                              >
                                <span className="w-2 h-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 group-hover:from-primary group-hover:to-red-400 transition-all" />
                                <span className="truncate">{sub.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                  </>
                )}

                {(!activeCategory || activeCategory === 'all') && (
                  <div 
                    className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                    style={{ transitionDelay: '30ms' }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="font-black text-gray-900 text-lg">Түргэн холбоос</h3>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {megaCategories.map((cat, idx) => (
                        <Link
                          key={cat.label}
                          href={cat.href}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-primary hover:shadow-md hover:-translate-y-1 transition-all duration-200 group bg-white ${
                            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                          }`}
                          style={{ 
                            transitionDelay: isVisible ? `${idx * 25}ms` : '0ms',
                            transitionProperty: 'opacity, transform, border-color, box-shadow'
                          }}
                        >
                          <span className="text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">{cat.icon}</span>
                          <span className="text-xs text-gray-700 text-center leading-tight font-medium">{cat.label}</span>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Popular Tags */}
                    <div 
                      className={`mt-6 pt-4 border-t border-gray-100 transition-all duration-300 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                      style={{ transitionDelay: isVisible ? '350ms' : '0ms' }}
                    >
                      <h4 className="text-sm font-bold text-gray-700 mb-3">Трэнд бүтээгдэхүүн</h4>
                      <div className="flex flex-wrap gap-2">
                        {['iPhone 16', 'MacBook', 'AirPods', 'PlayStation 5', 'Nintendo Switch', 'Samsung'].map((tag, idx) => (
                          <Link
                            key={tag}
                            href={`/search?q=${encodeURIComponent(tag)}`}
                            className={`px-3 py-1.5 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-primary rounded-full text-xs font-medium transition-all ${
                              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                            }`}
                            style={{ 
                              transitionDelay: isVisible ? `${400 + idx * 50}ms` : '0ms',
                              transitionProperty: 'opacity, transform, background-color, color'
                            }}
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar - Enhanced Featured/Promo */}
              <div className={`w-56 shrink-0 space-y-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`}>
                {activeCategory && activeCategory !== 'all' && (
                  <>
                    {megaCategories
                      .filter((cat) => cat.label === activeCategory && cat.featured)
                      .map((cat) => (
                        <Link
                          key={`featured-${cat.label}`}
                          href={cat.featured!.href}
                          className="block rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                          style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}
                        >
                          <div className="h-32 overflow-hidden relative">
                            <img
                              src={cat.featured!.image}
                              alt={cat.featured!.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="p-3 bg-gradient-to-r from-red-50 via-white to-red-50/30">
                            <p className="text-[10px] text-primary font-black uppercase tracking-wider mb-1">⭐ Онцлох</p>
                            <p className="text-sm font-bold text-gray-900 line-clamp-2">{cat.featured!.title}</p>
                          </div>
                        </Link>
                      ))}
                  </>
                )}

                {/* Default Promo - Always visible with animation */}
                <div 
                  className={`rounded-xl overflow-hidden border border-gray-100 bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white p-4 relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative">
                    <p className="text-[10px] font-black uppercase opacity-80 tracking-wider">Хязгаартай</p>
                    <p className="text-2xl font-black mt-1">30% OFF</p>
                    <p className="text-sm opacity-90 mb-3">Бүх электрон бараа</p>
                    <Link
                      href="/electronics"
                      className="inline-flex items-center gap-1 bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-black hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      Харах 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Quick Help with animation */}
                <div 
                  className={`rounded-xl border border-gray-100 bg-gray-50 p-3 transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                  style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
                >
                  <p className="text-xs font-bold text-gray-700 mb-2">Тусламж хэрэгтэй?</p>
                  <a href="tel:77777734" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    7777-7734
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
