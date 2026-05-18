import { cache } from 'react'

export interface TenantBranding {
  name?: string
  logo: string
  primaryColor: string
  secondaryColor?: string
  accentColor?: string
  font: string
  description?: string
}

export interface SectionConfig {
  type: string
  props?: Record<string, unknown>
}

export interface TenantTheme {
  layout: 'modern' | 'minimal' | 'bold'
  homepageSections: SectionConfig[]
}

export interface TenantFeatures {
  reviews: boolean
  chat: boolean
  loyaltyProgram: boolean
}

export interface TenantContact {
  email: string
  phone: string
  address: string
}

export interface TenantConfig {
  tenantId: string
  branding: TenantBranding
  theme: TenantTheme
  features: TenantFeatures
  contact?: TenantContact
}

const DEFAULT_CONFIG: TenantConfig = {
  tenantId: 'default',
  branding: {
    name: 'Их Наяд',
    logo: '',
    primaryColor: '#D32F2F',
    font: 'Inter',
  },
  theme: {
    layout: 'modern',
    homepageSections: [
      { type: 'HeroBanner', props: {} },
      { type: 'CategoryList', props: {} },
      { type: 'ProductGrid', props: { title: 'Шинэ бараа', isNew: true, limit: 8 } },
      { type: 'ProductGrid', props: { title: 'Хямдралтай', isSale: true, limit: 8 } },
      { type: 'GroceryBento', props: {} },
      { type: 'BrandList', props: {} },
    ],
  },
  features: { reviews: false, chat: false, loyaltyProgram: false },
  contact: {
    email: 'info@ikhnayd.mn',
    phone: '7709 1155',
    address: 'Улаанбаатар',
  }
}

export const fetchTenantConfig = cache(async (host: string, tenantSlug?: string | null): Promise<TenantConfig | null> => {
  if (process.env.USE_MOCK_DATA === 'true') {
    return DEFAULT_CONFIG
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
  const url = tenantSlug 
    ? `${apiUrl}/api/config?tenant=${encodeURIComponent(tenantSlug)}`
    : `${apiUrl}/api/config`

  try {
    const res = await fetch(url, {
      headers: { host, 'x-tenant-host': host },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.warn(`[tenantConfig] /api/config returned ${res.status} for host ${host}`)
      if (res.status === 404) {
        return null
      }
      return DEFAULT_CONFIG
    }

    return res.json()
  } catch (err) {
    console.warn('[tenantConfig] Failed to fetch config, using default:', err)
    return DEFAULT_CONFIG
  }
})
