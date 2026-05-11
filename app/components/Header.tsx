'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getCartCount } from '../lib/cartStore';
import { readAuth, logout, type User } from '../lib/authStore';
import { MOCK_PRODUCTS, CATEGORY_ICONS, CATEGORY_LABELS, formatPrice, type CatalogCategoryKey } from '../lib/mockCatalog';
import { addToCart } from '../lib/cartStore';

const categories = [
  { label: 'Зөөврийн компьютер', href: '/laptop' },
  { label: 'Суурин компьютер', href: '/computer' },
  { label: 'Ухаалаг төхөөрөмж', href: '/smartphone-and-tablet' },
  { label: 'Консоль', href: '/console' },
  { label: 'Аудио төхөөрөмж', href: '/audio-equipment' },
  { label: 'Гэр ахуй', href: '/home' },
  { label: 'Дагалдах хэрэгсэл', href: '/accessories' },
  { label: 'Брэнд', href: '/brands' },
];

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCartCount(getCartCount());
    setUser(readAuth());
    const onCartChange = () => setCartCount(getCartCount());
    const onAuthChange = () => setUser(readAuth());
    window.addEventListener('cart:changed', onCartChange);
    window.addEventListener('auth:changed', onAuthChange);
    return () => {
      window.removeEventListener('cart:changed', onCartChange);
      window.removeEventListener('auth:changed', onAuthChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setUserMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const searchSuggestions = useMemo(() => {
    if (debouncedSearch.trim().length < 1) return [];
    const query = debouncedSearch.toLowerCase();
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [debouncedSearch]);

  const handleSuggestionClick = (slug: string) => {
    setShowSuggestions(false);
    setSearch('');
    router.push(`/product/${slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: typeof MOCK_PRODUCTS[0]) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      icon: CATEGORY_ICONS[product.category],
      brand: product.brand,
    });
    alert('Сагсанд нэмлээ!');
  };

  // Debounce search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setShowSuggestions(true);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 150);
  };

  // Get unique brands from products
  const brands = useMemo(() => {
    const brandSet = new Set(MOCK_PRODUCTS.map(p => p.brand));
    return Array.from(brandSet).slice(0, 5);
  }, []);

  // Get categories
  const categoriesList = useMemo(() => {
    return Object.entries(CATEGORY_LABELS).slice(0, 5) as [CatalogCategoryKey, string][];
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Bar */}
      <div className="bg-[#0a1628] text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:77777734" className="hover:text-red-300 transition-colors flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              7777-7734
            </a>
            <a href="tel:77777754" className="hover:text-red-300 transition-colors flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              7777-7754
            </a>
          </div>
          <span className="text-gray-300 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
            Өдөр бүр 10:00 - 20:00
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex flex-col leading-tight">
            <span className="text-2xl font-black text-primary tracking-tight">
              ИХ <span className="text-orange-500">НАЯД</span>
            </span>
          </Link>

          {/* Search */}
          <div ref={searchRef} className="flex-1 max-w-3xl relative">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Бараа, брэнд хайх..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-r-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && search.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                <div className="flex">
                  {/* Left Sidebar */}
                  <div className="w-56 border-r border-gray-100 p-4 bg-gray-50/50">
                    {/* Search History */}
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Сүүлийн хайлтууд</h4>
                      <div className="space-y-1">
                        <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-600 hover:bg-white hover:text-primary rounded-lg transition-colors text-left">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                          {search}
                        </button>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{search[0]} - ангилалууд</h4>
                      <div className="space-y-1">
                        {categoriesList.map(([key, label]) => (
                          <Link
                            key={key}
                            href={`/s/${key}`}
                            onClick={() => setShowSuggestions(false)}
                            className="flex items-center justify-between px-2 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-primary rounded-lg transition-colors"
                          >
                            <span>{label}</span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Brands */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{search[0]} - брэндүүд</h4>
                      <div className="space-y-1">
                        {brands.map((brand) => (
                          <button
                            key={brand}
                            onClick={() => {
                              setSearch(brand);
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-white hover:text-primary rounded-lg transition-colors text-left"
                          >
                            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                              {brand[0]}
                            </div>
                            <span className="font-medium">{brand}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Products */}
                  <div className="flex-1 p-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">{search} - бүтээгдэхүүн</h4>
                    
                    {searchSuggestions.length > 0 ? (
                      <>
                        <div className="grid grid-cols-3 gap-2">
                          {searchSuggestions.map((product) => (
                            <div
                              key={product.id}
                              onClick={() => handleSuggestionClick(product.slug)}
                              className="border border-gray-100 rounded-lg p-2 hover:shadow-sm transition-all cursor-pointer group"
                            >
                              {/* Product Image Placeholder */}
                              <div className="aspect-square bg-gray-50 rounded-md flex items-center justify-center text-2xl mb-2 relative overflow-hidden">
                                {CATEGORY_ICONS[product.category]}
                                {product.isSale && (
                                  <span className="absolute top-0.5 left-0.5 bg-red-500 text-white text-[8px] font-bold px-1 py-0.5 rounded">
                                    Хямдрал
                                  </span>
                                )}
                                {product.isNew && !product.isSale && (
                                  <span className="absolute top-0.5 left-0.5 bg-green-500 text-white text-[8px] font-bold px-1 py-0.5 rounded">
                                    Шинэ
                                  </span>
                                )}
                              </div>
                              
                              {/* Brand */}
                              <p className="text-[9px] text-gray-500 uppercase font-bold mb-0.5">{product.brand}</p>
                              
                              {/* Name */}
                              <h5 className="text-[11px] font-medium text-gray-800 line-clamp-2 mb-1.5 group-hover:text-primary transition-colors h-7">
                                {product.name}
                              </h5>
                              
                              {/* Price */}
                              <div className="flex items-baseline gap-1.5 mb-1">
                                <span className="text-xs font-black text-gray-900">{formatPrice(product.price)}</span>
                                {product.oldPrice && (
                                  <span className="text-[9px] text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                                )}
                              </div>
                              
                              {/* Add to Cart */}
                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="w-full bg-primary hover:bg-primary-dark text-white text-[10px] font-bold py-1 rounded transition-colors"
                              >
                                Сагсанд нэмэх
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        {/* View All Link */}
                        <div className="mt-4 text-center">
                          <button
                            onClick={() => {
                              setShowSuggestions(false);
                              router.push(`/search?q=${encodeURIComponent(search)}`);
                            }}
                            className="text-sm text-primary font-bold hover:underline"
                          >
                            Бүх бүтээгдэхүүнийг үзэх ({searchSuggestions.length})
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm text-gray-500">"{search}" хайлтад тохирох бараа олдсонгүй</p>
                        <button
                          onClick={() => {
                            setShowSuggestions(false);
                            router.push(`/search?q=${encodeURIComponent(search)}`);
                          }}
                          className="mt-2 text-sm text-primary font-medium hover:underline"
                        >
                          Дэлгэрэнгүй хайх →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Nav Icons */}
          <div className="flex items-center gap-5 ml-auto">
            <Link href="/compare" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors group">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <span className="text-[10px] mt-0.5">Харьцуулах</span>
            </Link>
            <Link href="/account/wishlists" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <span className="text-[10px] mt-0.5">Хадгалсан</span>
            </Link>
            <Link href="/checkout" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors relative">
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">Сагс</span>
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex flex-col items-center text-primary transition-colors"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                  <span className="text-[10px] mt-0.5">{user.firstName}</span>
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-bold text-gray-900">{user.lastName} {user.firstName}</p>
                        <p className="text-xs text-gray-500">{user.phone}</p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-primary"
                      >
                        👤 Хувийн мэдээлэл
                      </Link>
                      <Link
                        href="/account/wishlists"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-primary"
                      >
                        ❤️ Хадгалсан
                      </Link>
                      <Link
                        href="/checkout"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-primary"
                      >
                        🛒 Миний сагс
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          🚪 Гарах
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/account" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="text-[10px] mt-0.5">Бүртгэл</span>
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-700 ml-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {/* Category Nav */}
      <nav className="bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <Link
                key={cat.href}
                href={cat.href}
                className="text-white text-sm font-medium px-4 py-3 hover:bg-primary-dark transition-colors whitespace-nowrap flex-shrink-0 border-r border-red-700 last:border-r-0"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b shadow-lg">
          {categories.map(cat => (
            <Link key={cat.href} href={cat.href} onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-primary border-b border-gray-100">
              {cat.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
