export interface ColorOption {
  name: string;
  hex: string;
}

export interface StorageOption {
  size: string;
  priceDelta: number;
}

export interface MobileModel {
  id: string;
  name: string;
  brandId: string;
  seriesId: string;
  basePrice: number;
  image: string;
  specs: string[];
  colors: ColorOption[];
  storageOptions: StorageOption[];
  inStock: boolean;
}

export interface MobileSeries {
  id: string;
  brandId: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  popular?: boolean;
}

export const BRANDS: Brand[] = [
  { id: 'apple', name: 'Apple', logoUrl: '/apple.png', popular: true },
  { id: 'samsung', name: 'Samsung', logoUrl: '/samsung.svg', popular: true },
  { id: 'xiaomi', name: 'Xiaomi', logoUrl: '/xiomi.png', popular: true },
  { id: 'oppo', name: 'Oppo', logoUrl: '/oppo.svg', popular: true },
  { id: 'vivo', name: 'Vivo', logoUrl: '/vivo.png', popular: true },
  { id: 'tecno', name: 'Tecno', logoUrl: '/techno.webp', popular: true },
  { id: 'realme', name: 'Realme', logoUrl: '/realme.webp', popular: true },
  { id: 'oneplus', name: 'OnePlus', logoUrl: '/oneplus.png', popular: true },
  { id: 'google', name: 'Google Pixel', logoUrl: '/google-pixel.webp', popular: true },
  { id: 'infinix', name: 'Infinix', logoUrl: '/infinix-logo.webp', popular: true },
  { id: 'nothing', name: 'Nothing', logoUrl: '/nothing-logo.webp', popular: true }
];

export const SERIES: MobileSeries[] = [
  // Apple
  { id: 'apple-17', brandId: 'apple', name: 'iPhone 17 Series (2026 Latest)' },
  { id: 'apple-16', brandId: 'apple', name: 'iPhone 16 Series' },
  { id: 'apple-15', brandId: 'apple', name: 'iPhone 15 Series' },
  { id: 'apple-classic', brandId: 'apple', name: 'iPhone 13 / 11 Series' },

  // Samsung
  { id: 'samsung-s24', brandId: 'samsung', name: 'Galaxy S24 Series (Flagship)' },
  { id: 'samsung-z', brandId: 'samsung', name: 'Galaxy Z Fold6 / Flip6 Series' },

  // Xiaomi
  { id: 'xiaomi-17', brandId: 'xiaomi', name: 'Xiaomi 17 Series (2026)' },
  { id: 'xiaomi-redmi-note', brandId: 'xiaomi', name: 'Redmi Note 15 Series' },
  { id: 'xiaomi-redmi-entry', brandId: 'xiaomi', name: 'Redmi 15 / A7 Pro Series' },

  // Oppo
  { id: 'oppo-reno14', brandId: 'oppo', name: 'Oppo Reno 14 Series (2026)' },
  { id: 'oppo-a6', brandId: 'oppo', name: 'Oppo A6 / A5 Series' },

  // Vivo
  { id: 'vivo-x300', brandId: 'vivo', name: 'Vivo X300 Series (2026 Flagship)' },
  { id: 'vivo-v60', brandId: 'vivo', name: 'Vivo V60 Series' },
  { id: 'vivo-y', brandId: 'vivo', name: 'Vivo Y Series' },

  // Tecno
  { id: 'tecno-phantom', brandId: 'tecno', name: 'Tecno Phantom V Fold 2 Series' },
  { id: 'tecno-spark', brandId: 'tecno', name: 'Tecno Spark Go 3 / Spark 40' },

  // Realme
  { id: 'realme-15', brandId: 'realme', name: 'Realme 15 5G Series (2026)' },
  { id: 'realme-c', brandId: 'realme', name: 'Realme C75 / C65 Series' },
  { id: 'realme-note', brandId: 'realme', name: 'Realme Note 50 Series' },

  // Google Pixel
  { id: 'google-pixel10', brandId: 'google', name: 'Pixel 10 Series (2026)' },
  { id: 'google-pixel9', brandId: 'google', name: 'Pixel 9 Series' },
  { id: 'google-pixel6', brandId: 'google', name: 'Pixel 6 / 6A Series' },

  // Nothing
  { id: 'nothing-phone2', brandId: 'nothing', name: 'Nothing Phone (2) Series' },
  { id: 'nothing-phone1', brandId: 'nothing', name: 'Nothing Phone (1) Series' }
];

export const MODELS: MobileModel[] = [
  // Apple iPhone 17 Series (2026)
  {
    id: 'iphone-17',
    name: 'iPhone 17',
    brandId: 'apple',
    seriesId: 'apple-17',
    basePrice: 406999,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80',
    specs: ['6.3" ProMotion 120Hz', 'A19 Chip', '48MP Dual Fusion Camera', 'Titanium Frame'],
    colors: [
      { name: 'Natural Titanium', hex: '#9f9d98' },
      { name: 'Deep Purple', hex: '#483d8b' },
      { name: 'Silver', hex: '#e5e5e5' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 45000 }
    ],
    inStock: true
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    brandId: 'apple',
    seriesId: 'apple-16',
    basePrice: 485000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80',
    specs: ['6.9" Super Retina XDR', 'A18 Pro Chip', '48MP Fusion Camera', 'Camera Control'],
    colors: [
      { name: 'Desert Titanium', hex: '#bfa68f' },
      { name: 'Natural Titanium', hex: '#9f9d98' },
      { name: 'Black Titanium', hex: '#343332' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 45000 },
      { size: '1TB', priceDelta: 95000 }
    ],
    inStock: true
  },
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    brandId: 'apple',
    seriesId: 'apple-16',
    basePrice: 300999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    specs: ['6.1" OLED Display', 'A18 Chip', '48MP Main Camera', 'Dynamic Island'],
    colors: [
      { name: 'Ultramarine', hex: '#4361ee' },
      { name: 'Teal', hex: '#2ec4b6' },
      { name: 'Pink', hex: '#ff9ebb' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 },
      { size: '256GB', priceDelta: 25000 }
    ],
    inStock: true
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brandId: 'apple',
    seriesId: 'apple-15',
    basePrice: 264999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    specs: ['6.1" Super Retina', 'A16 Bionic', 'USB-C Port', 'Dynamic Island'],
    colors: [
      { name: 'Pink', hex: '#ffc0cb' },
      { name: 'Blue', hex: '#d0ebff' },
      { name: 'Black', hex: '#212529' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 },
      { size: '256GB', priceDelta: 22000 }
    ],
    inStock: true
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    brandId: 'apple',
    seriesId: 'apple-classic',
    basePrice: 179999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    specs: ['6.1" Super Retina XDR', 'A15 Bionic', 'Dual 12MP System', 'Ceramic Shield'],
    colors: [
      { name: 'Midnight', hex: '#1c1c1e' },
      { name: 'Starlight', hex: '#f9f6ef' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'iphone-11',
    name: 'iPhone 11 (Lowest Price Model)',
    brandId: 'apple',
    seriesId: 'apple-classic',
    basePrice: 149900,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    specs: ['6.1" Liquid Retina', 'A13 Bionic', 'Dual Ultra Wide', 'Face ID'],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#ffffff' }
    ],
    storageOptions: [
      { size: '64GB', priceDelta: 0 },
      { size: '128GB', priceDelta: 12000 }
    ],
    inStock: true
  },

  // Oppo 2026
  {
    id: 'oppo-reno-14-pro',
    name: 'Oppo Reno 14 Pro 5G',
    brandId: 'oppo',
    seriesId: 'oppo-reno14',
    basePrice: 219999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['6.7" Curved 120Hz OLED', 'Dimensity 9200+', '50MP Telephoto Portrait', '100W SUPERVOOC'],
    colors: [
      { name: 'Titanium Silver', hex: '#c0c0c0' },
      { name: 'Midnight Black', hex: '#111111' }
    ],
    storageOptions: [
      { size: '512GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'oppo-reno-14',
    name: 'Oppo Reno 14 5G',
    brandId: 'oppo',
    seriesId: 'oppo-reno14',
    basePrice: 149999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['6.67" AMOLED 120Hz', 'AI Portrait Cam', '80W Fast Charge', 'Slim Glass Design'],
    colors: [
      { name: 'Ocean Blue', hex: '#0077b6' },
      { name: 'Dark Gray', hex: '#333333' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'oppo-a5',
    name: 'Oppo A5 (2026)',
    brandId: 'oppo',
    seriesId: 'oppo-a6',
    basePrice: 42999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['6.56" 90Hz Display', '5000 mAh Battery', '50MP Dual Camera', 'IP54 Water Resistance'],
    colors: [
      { name: 'Glowing Black', hex: '#222222' },
      { name: 'Sunlit Gold', hex: '#e6ca65' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'oppo-a6x',
    name: 'Oppo A6x (Lowest Price Model)',
    brandId: 'oppo',
    seriesId: 'oppo-a6',
    basePrice: 33999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['6.56" HD+ Display', '5000 mAh Long Battery', '13MP Dual Camera', 'Side Fingerprint'],
    colors: [
      { name: 'Starry Black', hex: '#151515' },
      { name: 'Sky Blue', hex: '#87ceeb' }
    ],
    storageOptions: [
      { size: '64GB', priceDelta: 0 },
      { size: '128GB', priceDelta: 5000 }
    ],
    inStock: true
  },

  // Xiaomi 2026
  {
    id: 'xiaomi-17t',
    name: 'Xiaomi 17T 5G (Leica)',
    brandId: 'xiaomi',
    seriesId: 'xiaomi-17',
    basePrice: 231999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['Leica Professional Lens', '144Hz CrystalRes AMOLED', 'Dimensity 9300+', '120W HyperCharge'],
    colors: [
      { name: 'Titanium Gray', hex: '#777b7e' },
      { name: 'Meadow Green', hex: '#2e7d32' }
    ],
    storageOptions: [
      { size: '512GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'redmi-note-15',
    name: 'Xiaomi Redmi Note 15',
    brandId: 'xiaomi',
    seriesId: 'xiaomi-redmi-note',
    basePrice: 62499,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['108MP OIS Main Camera', '120Hz FHD+ AMOLED', 'Snapdragon 6 Gen 3', '5000 mAh 33W'],
    colors: [
      { name: 'Midnight Black', hex: '#1c1c1e' },
      { name: 'Mint Green', hex: '#a3e635' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 },
      { size: '256GB', priceDelta: 8000 }
    ],
    inStock: true
  },
  {
    id: 'redmi-15c',
    name: 'Xiaomi Redmi 15C',
    brandId: 'xiaomi',
    seriesId: 'xiaomi-redmi-entry',
    basePrice: 35499,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['6.74" 90Hz Display', '50MP AI Camera', '5000 mAh 18W', 'Octa-Core Processor'],
    colors: [
      { name: 'Clover Green', hex: '#4ae386' },
      { name: 'Navy Blue', hex: '#1e293b' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'redmi-a7-pro',
    name: 'Xiaomi Redmi A7 Pro (Lowest Price Model)',
    brandId: 'xiaomi',
    seriesId: 'xiaomi-redmi-entry',
    basePrice: 32099,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['6.52" HD+ Display', '5000 mAh Battery', '8MP Dual Camera', 'Android 14 Go'],
    colors: [
      { name: 'Light Blue', hex: '#add8e6' },
      { name: 'Black', hex: '#111111' }
    ],
    storageOptions: [
      { size: '64GB', priceDelta: 0 }
    ],
    inStock: true
  },

  // Vivo 2026
  {
    id: 'vivo-x300-pro',
    name: 'Vivo X300 Pro 5G (ZEISS)',
    brandId: 'vivo',
    seriesId: 'vivo-x300',
    basePrice: 314999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['ZEISS APO Telephoto Camera', '200MP Main Sensor', 'Dimensity 9400', '100W FlashCharge'],
    colors: [
      { name: 'Titanium Grey', hex: '#696969' },
      { name: 'Asteroid Black', hex: '#121212' }
    ],
    storageOptions: [
      { size: '512GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'vivo-v60',
    name: 'Vivo V60 5G',
    brandId: 'vivo',
    seriesId: 'vivo-v60',
    basePrice: 136999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['50MP Aura Light Portrait', '120Hz 3D Curved Screen', '80W FlashCharge', 'Slim 7.4mm'],
    colors: [
      { name: 'Peacock Green', hex: '#00a86b' },
      { name: 'Noble Black', hex: '#1f1f1f' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'vivo-y28',
    name: 'Vivo Y28',
    brandId: 'vivo',
    seriesId: 'vivo-y',
    basePrice: 38999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['6000 mAh Battery', '44W FlashCharge', '50MP Ultra Clear Cam', 'Dual Stereo Speakers'],
    colors: [
      { name: 'Gleaming Orange', hex: '#ff7f50' },
      { name: 'Agate Green', hex: '#2e8b57' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'vivo-y01',
    name: 'Vivo Y01 (Lowest Price Model)',
    brandId: 'vivo',
    seriesId: 'vivo-y',
    basePrice: 23400,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    specs: ['6.51" Halo FullView', '5000 mAh Long Battery', '8MP Rear Camera', 'Funtouch OS'],
    colors: [
      { name: 'Elegant Black', hex: '#1c1c1c' },
      { name: 'Sapphire Blue', hex: '#0f52ba' }
    ],
    storageOptions: [
      { size: '32GB', priceDelta: 0 }
    ],
    inStock: true
  },

  // Tecno 2026
  {
    id: 'tecno-phantom-v-fold-2',
    name: 'Tecno Phantom V Fold 2 5G',
    brandId: 'tecno',
    seriesId: 'tecno-phantom',
    basePrice: 369999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    specs: ['7.85" 120Hz Foldable Display', '50MP Triple Pro Cam', '5750 mAh 70W Charge', 'Dual Screen'],
    colors: [
      { name: 'Karst Green', hex: '#2d5a27' },
      { name: 'Shadow Black', hex: '#181818' }
    ],
    storageOptions: [
      { size: '512GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'tecno-phantom-v2-flip',
    name: 'Tecno Phantom V2 Flip 5G',
    brandId: 'tecno',
    seriesId: 'tecno-phantom',
    basePrice: 199999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    specs: ['6.9" 120Hz LTPO AMOLED Flip', 'Thicket Cover Screen', '50MP OIS Camera', '4720 mAh 70W'],
    colors: [
      { name: 'Travertine Green', hex: '#8fbc8f' },
      { name: 'Mystic Dawn', hex: '#dda0dd' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'tecno-spark-go-3',
    name: 'Tecno Spark Go 3',
    brandId: 'tecno',
    seriesId: 'tecno-spark',
    basePrice: 27999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    specs: ['6.6" 90Hz Hole-Punch', 'Dynamic Port Notch', '5000 mAh Type-C', 'Dual Stereo Speakers'],
    colors: [
      { name: 'Gravity Black', hex: '#121212' },
      { name: 'Mystery White', hex: '#fdfdfd' }
    ],
    storageOptions: [
      { size: '64GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'tecno-spark-go-2',
    name: 'Tecno Spark Go 2 (Lowest Price Model)',
    brandId: 'tecno',
    seriesId: 'tecno-spark',
    basePrice: 19999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    specs: ['6.56" HD+ Display', '5000 mAh Battery', '13MP AI Camera', 'Side Fingerprint'],
    colors: [
      { name: 'Endless Black', hex: '#1a1a1a' },
      { name: 'Nebula Purple', hex: '#4b0082' }
    ],
    storageOptions: [
      { size: '64GB', priceDelta: 0 }
    ],
    inStock: true
  },

  // Realme 2026
  {
    id: 'realme-15-pro-5g',
    name: 'Realme 15 Pro 5G',
    brandId: 'realme',
    seriesId: 'realme-15',
    basePrice: 109436,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=80',
    specs: ['Sony LYT-600 OIS Camera', '120Hz Curved AMOLED', 'Snapdragon 7s Gen 2', '67W SUPERVOOC'],
    colors: [
      { name: 'Pioneer Green', hex: '#2e7d32' },
      { name: 'Monet Gold', hex: '#d4af37' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'realme-15-5g',
    name: 'Realme 15 5G',
    brandId: 'realme',
    seriesId: 'realme-15',
    basePrice: 88916,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=80',
    specs: ['50MP AI Camera', '120Hz Eye Protection Display', '5000 mAh 45W', 'Slim Armor Body'],
    colors: [
      { name: 'Twilight Purple', hex: '#8a2be2' },
      { name: 'Woodland Green', hex: '#228b22' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'realme-c75',
    name: 'Realme C75',
    brandId: 'realme',
    seriesId: 'realme-c',
    basePrice: 38499,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=80',
    specs: ['50MP AI Camera', '90Hz Sunlight Display', '5000 mAh 33W', 'ArmorShell Protection'],
    colors: [
      { name: 'Lightning Gold', hex: '#ffd700' },
      { name: 'Black Rock', hex: '#111111' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'realme-note-50',
    name: 'Realme Note 50 (Lowest Price Model)',
    brandId: 'realme',
    seriesId: 'realme-note',
    basePrice: 21999,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=80',
    specs: ['6.74" 90Hz Display', 'IP54 Dust & Splash', '5000 mAh Battery', '7.99mm Ultra Slim'],
    colors: [
      { name: 'Sky Blue', hex: '#87ceeb' },
      { name: 'Midnight Black', hex: '#191970' }
    ],
    storageOptions: [
      { size: '64GB', priceDelta: 0 }
    ],
    inStock: true
  },

  // Google Pixel 2026
  {
    id: 'google-pixel-10',
    name: 'Google Pixel 10 Pro (2026)',
    brandId: 'google',
    seriesId: 'google-pixel10',
    basePrice: 210990,
    image: '/google-pixel.webp',
    specs: ['Google Tensor G5 Chip', 'Advanced Pro Triple Camera', 'Gemini Ultra AI', '12GB RAM'],
    colors: [
      { name: 'Obsidian', hex: '#1f2022' },
      { name: 'Porcelain', hex: '#f0f0ed' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 },
      { size: '256GB', priceDelta: 25000 }
    ],
    inStock: true
  },
  {
    id: 'google-pixel-9-pro-xl',
    name: 'Google Pixel 9 Pro XL',
    brandId: 'google',
    seriesId: 'google-pixel9',
    basePrice: 385000,
    image: '/google-pixel.webp',
    specs: ['Tensor G4 Chip', '50MP Triple Camera', 'Super Res Zoom 30x', '7 Years OS Updates'],
    colors: [
      { name: 'Obsidian', hex: '#1f2022' },
      { name: 'Hazel', hex: '#5f6560' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 }
    ],
    inStock: true
  },
  {
    id: 'google-pixel-6a',
    name: 'Google Pixel 6A (Lowest Price Model)',
    brandId: 'google',
    seriesId: 'google-pixel6',
    basePrice: 124000,
    image: '/google-pixel.webp',
    specs: ['Google Tensor Chip', '12MP Dual Pixel Camera', 'Real Tone Photography', '5G Capable'],
    colors: [
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Chalk', hex: '#e5e4e2' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 }
    ],
    inStock: true
  },

  // Nothing Phone 2026
  {
    id: 'nothing-phone-2',
    name: 'Nothing Phone (2)',
    brandId: 'nothing',
    seriesId: 'nothing-phone2',
    basePrice: 160999,
    image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&auto=format&fit=crop&q=80',
    specs: ['Glyph Interface 2.0', 'Snapdragon 8+ Gen 1', '50MP Dual Camera', 'Nothing OS 2.5'],
    colors: [
      { name: 'Dark Gray', hex: '#333333' },
      { name: 'White', hex: '#f5f5f5' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 25000 }
    ],
    inStock: true
  },
  {
    id: 'nothing-phone-1',
    name: 'Nothing Phone (1) (Lowest Price Model)',
    brandId: 'nothing',
    seriesId: 'nothing-phone1',
    basePrice: 109436,
    image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&auto=format&fit=crop&q=80',
    specs: ['Glyph Interface', 'Snapdragon 778G+', '50MP Dual Camera', '120Hz OLED Display'],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#ffffff' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 },
      { size: '256GB', priceDelta: 15000 }
    ],
    inStock: true
  }
];

export const EMI_TENURES = [12, 24, 36, 48, 60];

export const PAKISTAN_BANKS = [
  { id: 'alfalah', name: 'Bank Alfalah', code: 'BAFL' },
  { id: 'ubl', name: 'United Bank Limited (UBL)', code: 'UBL' },
  { id: 'hbl', name: 'Habib Bank Limited (HBL)', code: 'HBL' },
  { id: 'mcb', name: 'MCB Bank Limited', code: 'MCB' },
  { id: 'meezaan', name: 'Meezan Bank', code: 'MEEZAN' },
  { id: 'allied', name: 'Allied Bank Limited (ABL)', code: 'ABL' }
];

export const MOBILE_WALLETS = [
  { id: 'easypaisa', name: 'Easypaisa', fee: '0%' },
  { id: 'upaisa', name: 'Upaisa', fee: '0%' },
  { id: 'ubl_omni', name: 'UBL Omni', fee: '0%' },
  { id: 'alfalah_wallet', name: 'Alfa Wallet', fee: '0%' }
];
