import type { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = { title: 'Сагс | Их Наяд' };

export default function CheckoutPage() {
  return <CheckoutClient />;
}
