import type { Metadata } from 'next';
import SearchClient from './SearchClient';

export const metadata: Metadata = { title: 'Хайлт | Их Наяд' };

export default function SearchPage() {
  return <SearchClient />;
}
