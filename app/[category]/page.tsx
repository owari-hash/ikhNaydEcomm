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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category as CatalogCategoryKey] ?? 'Бараа';
  return { title: `${label} | Их Наяд` };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const key = category as CatalogCategoryKey;
  const label = CATEGORY_LABELS[key] ?? 'Бүтээгдэхүүний хайлтын үр дүн';
  const icon = CATEGORY_ICONS[key] ?? '📦';
  const products = CATEGORY_LABELS[key] ? getProductsByCategory(key) : [];

  return (
    <div className="py-8">
      <h1 className="sr-only">Бүтээгдэхүүний хайлтын үр дүн</h1>

      {/* Top banner with video background - full width */}
      <div className="relative w-full h-56 sm:h-72 md:h-80 mb-6 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/stock.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center px-4">
            <div className="text-sm font-black tracking-widest text-red-300 mb-3 uppercase">Banner</div>
            <div className="text-3xl sm:text-4xl font-black">{label}</div>
            <div className="text-base text-gray-300 mt-2">Түр хүлээнэ үү...</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs like Их Наяд Плаза */}
        <nav aria-label="breadcrumbs" className="text-sm text-gray-500 mb-4 flex items-center gap-1">
          <Link href="/" className="hover:text-primary">
            Нүүр
          </Link>
          <span>/</span>
          <button className="hover:text-primary font-medium text-gray-700">Бүх бараа</button>
        </nav>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="text-7xl mb-4 opacity-40">📦</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Бараа байхгүй байна</h2>
          <p className="text-gray-400 mb-6 text-sm">Энэ ангилалд одоогоор бараа байхгүй байна</p>
          <Link href="/" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-xl">
            Нүүр хуудас
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
