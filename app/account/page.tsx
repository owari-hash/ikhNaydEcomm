import type { Metadata } from 'next';
import AccountClient from './AccountClient';

export const metadata: Metadata = { title: 'Бүртгэл | Их Наяд' };

export default function AccountPage() {
  return <AccountClient />;
}
