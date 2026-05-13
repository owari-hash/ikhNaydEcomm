import Link from 'next/link';
import type { Metadata } from 'next';
import {
  CATEGORY_ICONS,
  CATEGORY_LABELS,
  type CatalogCategoryKey,
  formatPrice,
  getProductsByCategory,
} from '../lib/mockCatalog';
import CategoryListingClient from './listingClient';

const CATEGORY_BANNER_IMAGES: Record<string, string> = {
  laptop:                 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1400&h=400&fit=crop',
  computer:               'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1400&h=400&fit=crop',
  'smartphone-and-tablet':'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1400&h=400&fit=crop',
  console:                'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=1400&h=400&fit=crop',
  'audio-equipment':      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&h=400&fit=crop',
  home:                   'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=400&fit=crop',
  accessories:            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1400&h=400&fit=crop',
  'fresh-fruits':         'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&h=400&fit=crop',
  'meat-poultry':         'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1400&h=400&fit=crop',
  'dairy-eggs':           'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1400&h=400&fit=crop',
  seafood:                'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=1400&h=400&fit=crop',
  vegetables:             'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1400&h=400&fit=crop',
  bakery:                 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1400&h=400&fit=crop',
  beverages:              'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1400&h=400&fit=crop',
  snacks:                 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?w=1400&h=400&fit=crop',
  grocery:                'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1400&h=400&fit=crop',
};

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=400&fit=crop';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[slug.length - 1];
  const label = CATEGORY_LABELS[category as CatalogCategoryKey] ?? 'Бараа';
  return { title: `${label} | Их Наяд` };
}

export default async function CatchAllShopPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const categoryKey = slug[slug.length - 1];
  const key = categoryKey as CatalogCategoryKey;
  
  const label = CATEGORY_LABELS[key] ?? 'Бүтээгдэхүүний хайлтын үр дүн';
  const icon = CATEGORY_ICONS[key] ?? '📦';
  const products = CATEGORY_LABELS[key] ? getProductsByCategory(key) : [];
  const bannerImage = CATEGORY_BANNER_IMAGES[categoryKey] || DEFAULT_BANNER;

  return (
    <div className="py-8">
      <h1 className="sr-only">Бүтээгдэхүүний хайлтын үр дүн</h1>

      {/* Top banner with image background - full width */}
      <div className="relative w-full h-48 sm:h-64 md:h-72 mb-6 overflow-hidden">
        <img
          src={bannerImage}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center px-4">
            <div className="text-xs font-black tracking-widest text-red-300 mb-2 uppercase">Ангилал</div>
            <div className="text-2xl sm:text-4xl font-black uppercase tracking-tight">{label}</div>
            <p className="text-sm text-gray-300 mt-2 font-medium">Шилдэг бүтээгдэхүүнийг танд зориулав</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs like Их Наяд Плаза */}
        <nav aria-label="breadcrumbs" className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-1.5 uppercase font-bold tracking-wider">
          <Link href="/" className="hover:text-primary transition-colors">
            Нүүр
          </Link>
          {slug.map((s, i) => (
            <React.Fragment key={i}>
              <span className="text-gray-300">/</span>
              <span className={i === slug.length - 1 ? "text-gray-900" : "text-gray-500"}>
                {CATEGORY_LABELS[s as CatalogCategoryKey] || s}
              </span>
            </React.Fragment>
          ))}
        </nav>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="text-7xl mb-4 opacity-40">📦</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Бараа байхгүй байна</h2>
            <p className="text-gray-400 mb-6 text-sm">Энэ ангилалд одоогоор бараа байхгүй байна</p>
            <Link href="/" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-xl transition-colors">
              Нүүр хуудас руу буцах
            </Link>
          </div>
        ) : (
          <CategoryListingClient
            category={{ key, label, icon }}
            products={products.map((p) => ({
              id: p.id,
              slug: p.slug,
              name: p.name,
              brand: p.brand,
              price: formatPrice(p.price),
              oldPrice: p.oldPrice ? formatPrice(p.oldPrice) : undefined,
              badge: p.isNew ? 'Шинэ' : p.isSale ? 'Хямдрал' : null,
              image: p.image,
            }))}
          />
        )}
      </div>
    </div>
  );
}

// Add React import for Fragments
import React from 'react';
