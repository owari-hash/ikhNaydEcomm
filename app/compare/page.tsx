import type { Metadata } from 'next';
import ComparePageClient from './pageClient';

export const metadata: Metadata = { title: 'Харьцуулах | Их Наяд Плаза' };

export default function ComparePage() {
  return <ComparePageClient />;
}
