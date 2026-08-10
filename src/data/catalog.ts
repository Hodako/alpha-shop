export interface BrandOption {
  id: string;
  name: string;
  logoUrl: string;
}

export interface SeriesOption {
  id: string;
  brandId: string;
  name: string;
}

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
  brandId: string;
  seriesId: string;
  name: string;
  basePrice: number;
  image: string;
  specs: string[];
  colors: ColorOption[];
  storageOptions: StorageOption[];
}

export interface BankOption {
  id: string;
  name: string;
  code: string;
}

export interface WalletOption {
  id: string;
  name: string;
  fee: string;
}

export const BRANDS: BrandOption[] = [
  { id: 'samsung', name: 'Samsung', logoUrl: '/samsung.svg' },
  { id: 'apple', name: 'Apple', logoUrl: '/apple.png' },
  { id: 'oppo', name: 'Oppo', logoUrl: '/oppo.svg' },
  { id: 'realme', name: 'Realme', logoUrl: '/realme.webp' },
  { id: 'xiaomi', name: 'Xiaomi', logoUrl: '/xiomi.png' },
  { id: 'vivo', name: 'Vivo', logoUrl: '/vivo.png' },
  { id: 'tecno', name: 'Tecno', logoUrl: '/techno.webp' },
  { id: 'infinix', name: 'Infinix', logoUrl: '/infinix-logo.webp' },
  { id: 'google', name: 'Google Pixel', logoUrl: '/google-pixel.webp' },
  { id: 'oneplus', name: 'OnePlus', logoUrl: '/oneplus.png' },
  { id: 'nothing', name: 'Nothing Phone', logoUrl: '/nothing-logo.webp' },
  { id: 'honor', name: 'Honor', logoUrl: '/oppo.svg' }
];

export const SERIES: SeriesOption[] = [
  // Samsung
  { id: 'samsung-a', brandId: 'samsung', name: 'A Series' },
  { id: 'samsung-s', brandId: 'samsung', name: 'S Series' },
  { id: 'samsung-z', brandId: 'samsung', name: 'Z Series' },

  // Oppo
  { id: 'oppo-a', brandId: 'oppo', name: 'A Series' },

  // Realme
  { id: 'realme-number', brandId: 'realme', name: 'Number Series' },
  { id: 'realme-c', brandId: 'realme', name: 'C Series' },
  { id: 'realme-note', brandId: 'realme', name: 'Note Series' },

  // Honor
  { id: 'honor-x', brandId: 'honor', name: 'X Series' },

  // Xiaomi
  { id: 'xiaomi-redmi', brandId: 'xiaomi', name: 'Redmi' },
  { id: 'xiaomi-poco', brandId: 'xiaomi', name: 'Poco' },

  // Tecno
  { id: 'tecno-spark', brandId: 'tecno', name: 'Spark' },

  // Infinix
  { id: 'infinix-note', brandId: 'infinix', name: 'Note' },
  { id: 'infinix-smart', brandId: 'infinix', name: 'Smart' },
  { id: 'infinix-zero', brandId: 'infinix', name: 'Zero' },

  // Vivo
  { id: 'vivo-v', brandId: 'vivo', name: 'V Series' },
  { id: 'vivo-y', brandId: 'vivo', name: 'Y Series' },
  { id: 'vivo-x', brandId: 'vivo', name: 'X Series' },

  // Apple
  { id: 'apple-x', brandId: 'apple', name: 'iPhone X Series' },
  { id: 'apple-11', brandId: 'apple', name: 'iPhone 11 Series' },
  { id: 'apple-12', brandId: 'apple', name: 'iPhone 12 Series' },
  { id: 'apple-13', brandId: 'apple', name: 'iPhone 13 Series' },
  { id: 'apple-14', brandId: 'apple', name: 'iPhone 14 Series' },
  { id: 'apple-15', brandId: 'apple', name: 'iPhone 15 Series' },
  { id: 'apple-16', brandId: 'apple', name: 'iPhone 16 Series' },
  { id: 'apple-17', brandId: 'apple', name: 'iPhone 17 Series' },

  // Google
  { id: 'google-pixel', brandId: 'google', name: 'Pixel Series' },

  // OnePlus
  { id: 'oneplus-main', brandId: 'oneplus', name: 'OnePlus Flagship' },
  { id: 'oneplus-nord', brandId: 'oneplus', name: 'Nord Series' },

  // Nothing
  { id: 'nothing-main', brandId: 'nothing', name: 'Nothing Phone' }
];

const DEFAULT_COLORS: ColorOption[] = [
  { name: 'Black', hex: '#1e293b' },
  { name: 'Silver', hex: '#e2e8f0' },
  { name: 'Blue', hex: '#2563eb' }
];

const DEFAULT_STORAGE: StorageOption[] = [
  { size: 'Standard Storage', priceDelta: 0 }
];

export const INITIAL_MODELS: MobileModel[] = [
  // ================= SAMSUNG =================
  { id: 'sam-a05s', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-05S 6/128', basePrice: 42000, image: '/samsung.svg', specs: ['6GB RAM', '128GB Storage', 'Official Warranty'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a06-4-128', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-06 4/128', basePrice: 27200, image: '/samsung.svg', specs: ['4GB RAM', '128GB Storage', 'Official Warranty'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a06-4-64', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-06 4/64', basePrice: 24300, image: '/samsung.svg', specs: ['4GB RAM', '64GB Storage', 'Official Warranty'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a06-6-128', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-06 6/128', basePrice: 31000, image: '/samsung.svg', specs: ['6GB RAM', '128GB Storage', 'Official Warranty'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a07-4-128', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-07 4/128', basePrice: 30800, image: '/samsung.svg', specs: ['4GB RAM', '128GB Storage', 'Official Warranty'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a07-4-64', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-07 4/64', basePrice: 25700, image: '/samsung.svg', specs: ['4GB RAM', '64GB Storage', 'Official Warranty'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a07-6-128', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-07 6/128', basePrice: 35700, image: '/samsung.svg', specs: ['6GB RAM', '128GB Storage', 'Official Warranty'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a17-6-128', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-17 6/128', basePrice: 51400, image: '/samsung.svg', specs: ['6GB RAM', '128GB Storage', '5G Supported'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a17-8-256', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-17 8/256', basePrice: 58200, image: '/samsung.svg', specs: ['8GB RAM', '256GB Storage', '5G Supported'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a25-8-256', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-25 8/256', basePrice: 60000, image: '/samsung.svg', specs: ['8GB RAM', '256GB Storage', '120Hz Super AMOLED'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a26-8-256', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-26 8/256', basePrice: 74500, image: '/samsung.svg', specs: ['8GB RAM', '256GB Storage', 'OIS Camera'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a36-8-256', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-36 8/256', basePrice: 97000, image: '/samsung.svg', specs: ['8GB RAM', '256GB Storage', 'IP67 Water Resistant'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a54-8-256', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-54 8/256', basePrice: 89000, image: '/samsung.svg', specs: ['8GB RAM', '256GB Storage', '50MP OIS Camera'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a56-12-256', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-56 12/256', basePrice: 126000, image: '/samsung.svg', specs: ['12GB RAM', '256GB Storage', 'Flagship Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-a56-8-256', brandId: 'samsung', seriesId: 'samsung-a', name: 'A-56 8/256', basePrice: 114000, image: '/samsung.svg', specs: ['8GB RAM', '256GB Storage', 'Flagship Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'sam-s23fe', brandId: 'samsung', seriesId: 'samsung-s', name: 'S-23 FE 8/256', basePrice: 128000, image: '/samsung.svg', specs: ['8GB RAM', '256GB Storage', 'Exynos 2200'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-s23u', brandId: 'samsung', seriesId: 'samsung-s', name: 'S-23 Ultra 12/256', basePrice: 267000, image: '/samsung.svg', specs: ['12GB RAM', '256GB Storage', '200MP Camera + S-Pen'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-s24fe', brandId: 'samsung', seriesId: 'samsung-s', name: 'S-24 FE 8/256', basePrice: 170000, image: '/samsung.svg', specs: ['8GB RAM', '256GB Storage', 'Galaxy AI'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-s24u-1tb', brandId: 'samsung', seriesId: 'samsung-s', name: 'S-24 Ultra 12/1TB', basePrice: 334000, image: '/samsung.svg', specs: ['12GB RAM', '1TB Storage', 'Titanium Frame + AI'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-s24u-512', brandId: 'samsung', seriesId: 'samsung-s', name: 'S-24 Ultra 12/512', basePrice: 319000, image: '/samsung.svg', specs: ['12GB RAM', '512GB Storage', 'Titanium Frame + AI'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-s25-512', brandId: 'samsung', seriesId: 'samsung-s', name: 'S-25 12/512', basePrice: 284000, image: '/samsung.svg', specs: ['12GB RAM', '512GB Storage', 'Snapdragon 8 Elite'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-s25u', brandId: 'samsung', seriesId: 'samsung-s', name: 'S-25 Ultra 12/512', basePrice: 355000, image: '/samsung.svg', specs: ['12GB RAM', '512GB Storage', 'Next-Gen Ultra AI Flagship'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-s25fe-256', brandId: 'samsung', seriesId: 'samsung-s', name: 'S-25 FE 8/256', basePrice: 182000, image: '/samsung.svg', specs: ['8GB RAM', '256GB Storage', 'Galaxy AI'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-s25fe-512', brandId: 'samsung', seriesId: 'samsung-s', name: 'S-25 FE 8/512', basePrice: 208000, image: '/samsung.svg', specs: ['8GB RAM', '512GB Storage', 'Galaxy AI'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'sam-zflip5', brandId: 'samsung', seriesId: 'samsung-z', name: 'Z Flip 5 8/512', basePrice: 220000, image: '/samsung.svg', specs: ['8GB RAM', '512GB Storage', 'Flex Window Foldable'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-zflip6', brandId: 'samsung', seriesId: 'samsung-z', name: 'Z Flip 6 12/512', basePrice: 303000, image: '/samsung.svg', specs: ['12GB RAM', '512GB Storage', '50MP Cam + Galaxy AI'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-zfold5', brandId: 'samsung', seriesId: 'samsung-z', name: 'Z Fold 5 12/512', basePrice: 330000, image: '/samsung.svg', specs: ['12GB RAM', '512GB Storage', 'Unfoldable Tablet Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'sam-zfold6', brandId: 'samsung', seriesId: 'samsung-z', name: 'Z Fold 6 12/512', basePrice: 490000, image: '/samsung.svg', specs: ['12GB RAM', '512GB Storage', 'Ultra Slim Titanium Foldable'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= OPPO =================
  { id: 'opp-a5i-4-128', brandId: 'oppo', seriesId: 'oppo-a', name: 'A-5i 4/128', basePrice: 32200, image: '/oppo.svg', specs: ['4GB RAM', '128GB Storage', 'Massive Battery'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'opp-a5i-4-64', brandId: 'oppo', seriesId: 'oppo-a', name: 'A-5i 4/64', basePrice: 26400, image: '/oppo.svg', specs: ['4GB RAM', '64GB Storage', 'HD+ Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'opp-a6-8-128', brandId: 'oppo', seriesId: 'oppo-a', name: 'A-6 8/128', basePrice: 49500, image: '/oppo.svg', specs: ['8GB RAM', '128GB Storage', 'Glow Design'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'opp-a6-8-256', brandId: 'oppo', seriesId: 'oppo-a', name: 'A-6 8/256', basePrice: 55000, image: '/oppo.svg', specs: ['8GB RAM', '256GB Storage', 'Glow Design'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'opp-a6pro-8-128', brandId: 'oppo', seriesId: 'oppo-a', name: 'A-6 Pro 8/128', basePrice: 67000, image: '/oppo.svg', specs: ['8GB RAM', '128GB Storage', '67W Fast Charging'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'opp-a6pro-8-256', brandId: 'oppo', seriesId: 'oppo-a', name: 'A-6 Pro 8/256', basePrice: 85000, image: '/oppo.svg', specs: ['8GB RAM', '256GB Storage', '67W Fast Charging'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'opp-a6x-4-64', brandId: 'oppo', seriesId: 'oppo-a', name: 'A-6 X 4/64', basePrice: 28700, image: '/oppo.svg', specs: ['4GB RAM', '64GB Storage', 'Smooth 90Hz'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'opp-a6x-6-128', brandId: 'oppo', seriesId: 'oppo-a', name: 'A-6 X 6/128', basePrice: 44000, image: '/oppo.svg', specs: ['6GB RAM', '128GB Storage', 'Smooth 90Hz'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= REALME =================
  { id: 'rm-15-12-256', brandId: 'realme', seriesId: 'realme-number', name: 'Realme 15 12/256', basePrice: 89000, image: '/realme.webp', specs: ['12GB RAM', '256GB Storage', 'Curved Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-15t-8-256', brandId: 'realme', seriesId: 'realme-number', name: 'Realme 15T 8/256', basePrice: 67500, image: '/realme.webp', specs: ['8GB RAM', '256GB Storage', 'Dynamic Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-c71-6-128', brandId: 'realme', seriesId: 'realme-c', name: 'C-71 6/128', basePrice: 35000, image: '/realme.webp', specs: ['6GB RAM', '128GB Storage', '5000mAh Battery'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-c71-8-128', brandId: 'realme', seriesId: 'realme-c', name: 'C-71 8/128', basePrice: 38000, image: '/realme.webp', specs: ['8GB RAM', '128GB Storage', '5000mAh Battery'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-c75-8-128', brandId: 'realme', seriesId: 'realme-c', name: 'C-75 8/128', basePrice: 42000, image: '/realme.webp', specs: ['8GB RAM', '128GB Storage', 'ArmorShell Protection'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-c75-8-256', brandId: 'realme', seriesId: 'realme-c', name: 'C-75 8/256', basePrice: 47000, image: '/realme.webp', specs: ['8GB RAM', '256GB Storage', 'ArmorShell Protection'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-c75x-6-128', brandId: 'realme', seriesId: 'realme-c', name: 'C-75X 6/128', basePrice: 37500, image: '/realme.webp', specs: ['6GB RAM', '128GB Storage', 'Fast Charge'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-n60x-3-64', brandId: 'realme', seriesId: 'realme-note', name: 'Note 60-X 3/64', basePrice: 21600, image: '/realme.webp', specs: ['3GB RAM', '64GB Storage', 'Budget King'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-n60x-4-128', brandId: 'realme', seriesId: 'realme-note', name: 'Note 60-X 4/128', basePrice: 27500, image: '/realme.webp', specs: ['4GB RAM', '128GB Storage', 'Budget King'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-n60x-4-64', brandId: 'realme', seriesId: 'realme-note', name: 'Note 60-X 4/64', basePrice: 25500, image: '/realme.webp', specs: ['4GB RAM', '64GB Storage', 'Budget King'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-n70-4-128', brandId: 'realme', seriesId: 'realme-note', name: 'Note 70 4/128', basePrice: 31000, image: '/realme.webp', specs: ['4GB RAM', '128GB Storage', '90Hz Punch Hole'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'rm-n70-6-128', brandId: 'realme', seriesId: 'realme-note', name: 'Note 70 6/128', basePrice: 30900, image: '/realme.webp', specs: ['6GB RAM', '128GB Storage', '90Hz Punch Hole'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= HONOR =================
  { id: 'hnr-x5b-plus', brandId: 'honor', seriesId: 'honor-x', name: 'X-5B Plus 4/128', basePrice: 25300, image: '/oppo.svg', specs: ['4GB RAM', '128GB Storage', 'Honor Quality'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'hnr-x6c', brandId: 'honor', seriesId: 'honor-x', name: 'X-6C 6/128', basePrice: 33500, image: '/oppo.svg', specs: ['6GB RAM', '128GB Storage', 'Honor Quality'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'hnr-x7c', brandId: 'honor', seriesId: 'honor-x', name: 'X-7C 8/256', basePrice: 41800, image: '/oppo.svg', specs: ['8GB RAM', '256GB Storage', 'Honor Quality'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= XIAOMI =================
  { id: 'xi-a5-4-128', brandId: 'xiaomi', seriesId: 'xiaomi-redmi', name: 'Redmi A5 4/128', basePrice: 28800, image: '/xiomi.png', specs: ['4GB RAM', '128GB Storage', 'Xiaomi Quality'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'xi-a5-4-64', brandId: 'xiaomi', seriesId: 'xiaomi-redmi', name: 'Redmi A5 4/64', basePrice: 26000, image: '/xiomi.png', specs: ['4GB RAM', '64GB Storage', 'Xiaomi Quality'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'xi-r13-8-128', brandId: 'xiaomi', seriesId: 'xiaomi-redmi', name: 'Redmi 13 8/128', basePrice: 37500, image: '/xiomi.png', specs: ['8GB RAM', '128GB Storage', '108MP Camera'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'xi-r15-8-128', brandId: 'xiaomi', seriesId: 'xiaomi-redmi', name: 'Redmi 15 8/128', basePrice: 42000, image: '/xiomi.png', specs: ['8GB RAM', '128GB Storage', 'Fast AMOLED'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'xi-r15c-4-128', brandId: 'xiaomi', seriesId: 'xiaomi-redmi', name: 'Redmi 15C 4/128', basePrice: 31500, image: '/xiomi.png', specs: ['4GB RAM', '128GB Storage', 'Big Battery'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'xi-r15c-6-128', brandId: 'xiaomi', seriesId: 'xiaomi-redmi', name: 'Redmi 15C 6/128', basePrice: 33300, image: '/xiomi.png', specs: ['6GB RAM', '128GB Storage', 'Big Battery'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'xi-poco-c75', brandId: 'xiaomi', seriesId: 'xiaomi-poco', name: 'Poco C-75 8/256', basePrice: 37000, image: '/xiomi.png', specs: ['8GB RAM', '256GB Storage', 'Gaming Chipset'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= TECNO =================
  { id: 'tec-spk40-6-128', brandId: 'tecno', seriesId: 'tecno-spark', name: 'Spark 40 6/128', basePrice: 35000, image: '/techno.webp', specs: ['6GB RAM', '128GB Storage', 'Glow Design'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'tec-spk40c-4-128', brandId: 'tecno', seriesId: 'tecno-spark', name: 'Spark 40C 4/128', basePrice: 29000, image: '/techno.webp', specs: ['4GB RAM', '128GB Storage', 'Glow Design'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'tec-spk40pro-8-256', brandId: 'tecno', seriesId: 'tecno-spark', name: 'Spark 40 Pro 8/256', basePrice: 49500, image: '/techno.webp', specs: ['8GB RAM', '256GB Storage', '120Hz Curved AMOLED'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'tec-spk40proplus-8-256', brandId: 'tecno', seriesId: 'tecno-spark', name: 'Spark 40 Pro Plus 8/256', basePrice: 58000, image: '/techno.webp', specs: ['8GB RAM', '256GB Storage', '120Hz Curved AMOLED'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'tec-spkgo2-4-64', brandId: 'tecno', seriesId: 'tecno-spark', name: 'Spark Go 2 4/64', basePrice: 25000, image: '/techno.webp', specs: ['4GB RAM', '64GB Storage', 'Budget Friendly'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= INFINIX =================
  { id: 'inf-n14-8-128', brandId: 'infinix', seriesId: 'infinix-note', name: 'Note 14 8/128', basePrice: 48300, image: '/infinix-logo.webp', specs: ['8GB RAM', '128GB Storage', '45W All-Round Fast Charge'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'inf-n14-8-256', brandId: 'infinix', seriesId: 'infinix-note', name: 'Note 14 8/256', basePrice: 52000, image: '/infinix-logo.webp', specs: ['8GB RAM', '256GB Storage', '45W All-Round Fast Charge'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'inf-n14pro-12-512', brandId: 'infinix', seriesId: 'infinix-note', name: 'Note 14 Pro 12/512', basePrice: 83200, image: '/infinix-logo.webp', specs: ['12GB RAM', '512GB Storage', '108MP OIS Camera'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'inf-n14pro-8-256', brandId: 'infinix', seriesId: 'infinix-note', name: 'Note 14 Pro 8/256', basePrice: 70500, image: '/infinix-logo.webp', specs: ['8GB RAM', '256GB Storage', '108MP OIS Camera'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'inf-n50-8-256', brandId: 'infinix', seriesId: 'infinix-note', name: 'Note 50 8/256', basePrice: 63900, image: '/infinix-logo.webp', specs: ['8GB RAM', '256GB Storage', 'Wireless Fast Charging'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'inf-n50pro-12-256', brandId: 'infinix', seriesId: 'infinix-note', name: 'Note 50 Pro 12/256', basePrice: 81000, image: '/infinix-logo.webp', specs: ['12GB RAM', '256GB Storage', 'Wireless Fast Charging'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'inf-sm10-4-64', brandId: 'infinix', seriesId: 'infinix-smart', name: 'Smart 10 4/64', basePrice: 25200, image: '/infinix-logo.webp', specs: ['4GB RAM', '64GB Storage', 'Massive Battery'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'inf-sm10hd-2-64', brandId: 'infinix', seriesId: 'infinix-smart', name: 'Smart 10 HD 2/64', basePrice: 21500, image: '/infinix-logo.webp', specs: ['2GB RAM', '64GB Storage', 'Entry Level'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'inf-sm10plus-4-128', brandId: 'infinix', seriesId: 'infinix-smart', name: 'Smart 10 Plus 4/128', basePrice: 28800, image: '/infinix-logo.webp', specs: ['4GB RAM', '128GB Storage', 'Massive Battery'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'inf-z40-8-256', brandId: 'infinix', seriesId: 'infinix-zero', name: 'Zero 40 8/256', basePrice: 60000, image: '/infinix-logo.webp', specs: ['8GB RAM', '256GB Storage', '4K 60FPS Video Vlog Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= VIVO =================
  { id: 'vvo-v60-12-256', brandId: 'vivo', seriesId: 'vivo-v', name: 'V60 12/256', basePrice: 129500, image: '/vivo.png', specs: ['12GB RAM', '256GB Storage', 'ZEISS Aura Light Portrait'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-v60-12-512', brandId: 'vivo', seriesId: 'vivo-v', name: 'V60 12/512', basePrice: 135000, image: '/vivo.png', specs: ['12GB RAM', '512GB Storage', 'ZEISS Aura Light Portrait'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-v60lite-12-256', brandId: 'vivo', seriesId: 'vivo-v', name: 'V60 Lite 12/256', basePrice: 82000, image: '/vivo.png', specs: ['12GB RAM', '256GB Storage', 'Slim Dynamic Design'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-v60lite-8-256', brandId: 'vivo', seriesId: 'vivo-v', name: 'V60 Lite 8/256', basePrice: 68500, image: '/vivo.png', specs: ['8GB RAM', '256GB Storage', 'Slim Dynamic Design'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-y04-4-128', brandId: 'vivo', seriesId: 'vivo-y', name: 'Y04 4/128', basePrice: 32400, image: '/vivo.png', specs: ['4GB RAM', '128GB Storage', 'Long Battery Life'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-y04-4-64', brandId: 'vivo', seriesId: 'vivo-y', name: 'Y04 4/64', basePrice: 27700, image: '/vivo.png', specs: ['4GB RAM', '64GB Storage', 'Long Battery Life'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-y04-6-128', brandId: 'vivo', seriesId: 'vivo-y', name: 'Y04 6/128', basePrice: 35800, image: '/vivo.png', specs: ['6GB RAM', '128GB Storage', 'Long Battery Life'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-y21d-6-128', brandId: 'vivo', seriesId: 'vivo-y', name: 'Y21D 6/128', basePrice: 44000, image: '/vivo.png', specs: ['6GB RAM', '128GB Storage', 'FHD+ Sunlight Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-y21d-8-128', brandId: 'vivo', seriesId: 'vivo-y', name: 'Y21D 8/128', basePrice: 49000, image: '/vivo.png', specs: ['8GB RAM', '128GB Storage', 'FHD+ Sunlight Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-y29-8-256', brandId: 'vivo', seriesId: 'vivo-y', name: 'Y29 8/256', basePrice: 53000, image: '/vivo.png', specs: ['8GB RAM', '256GB Storage', '44W FlashCharge'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-y400-8-256', brandId: 'vivo', seriesId: 'vivo-y', name: 'Y400 8/256', basePrice: 59500, image: '/vivo.png', specs: ['8GB RAM', '256GB Storage', 'Snapdragon Performance'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'vvo-x200fe-12-512', brandId: 'vivo', seriesId: 'vivo-x', name: 'X200 FE 12/512', basePrice: 183000, image: '/vivo.png', specs: ['12GB RAM', '512GB Storage', 'ZEISS Telephoto Camera'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= APPLE =================
  { id: 'ip-xsmax-64', brandId: 'apple', seriesId: 'apple-x', name: 'iPhone XS Max 64GB', basePrice: 110000, image: '/apple.png', specs: ['64GB Storage', 'Super Retina OLED', 'Official Original'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-xsmax-128', brandId: 'apple', seriesId: 'apple-x', name: 'iPhone XS Max 128GB', basePrice: 125000, image: '/apple.png', specs: ['128GB Storage', 'Super Retina OLED', 'Official Original'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-xsmax-512', brandId: 'apple', seriesId: 'apple-x', name: 'iPhone XS Max 512GB', basePrice: 140000, image: '/apple.png', specs: ['512GB Storage', 'Super Retina OLED', 'Official Original'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-x-256', brandId: 'apple', seriesId: 'apple-x', name: 'iPhone X 256GB', basePrice: 75000, image: '/apple.png', specs: ['256GB Storage', 'Face ID', 'Official Original'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'ip-11-128-nonpta', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 128GB Non-PTA', basePrice: 95000, image: '/apple.png', specs: ['128GB Storage', 'Non-PTA', 'Dual 12MP Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11-128-pta', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 128GB PTA', basePrice: 105000, image: '/apple.png', specs: ['128GB Storage', 'PTA Approved', 'Dual 12MP Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11-256-nonpta', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 256GB Non-PTA', basePrice: 105000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'Dual 12MP Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11-256-pta', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 256GB PTA', basePrice: 125000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Dual 12MP Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11p-256-nonpta', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 Pro 256GB Non-PTA', basePrice: 115000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'Triple Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11p-256-pta', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 Pro 256GB PTA', basePrice: 130000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Triple Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11p-128-jv', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 Pro 128GB JV', basePrice: 95000, image: '/apple.png', specs: ['128GB Storage', 'JV Locked', 'Triple Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11pm-64-nonpta', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 Pro Max 64GB Non-PTA', basePrice: 105000, image: '/apple.png', specs: ['64GB Storage', 'Non-PTA', 'Pro Max Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11pm-64-pta', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 Pro Max 64GB PTA', basePrice: 135000, image: '/apple.png', specs: ['64GB Storage', 'PTA Approved', 'Pro Max Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11pm-256-nonpta', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 Pro Max 256GB Non-PTA', basePrice: 125000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'Pro Max Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11pm-256-pta', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 Pro Max 256GB PTA', basePrice: 140000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Pro Max Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-11pm-64-jv', brandId: 'apple', seriesId: 'apple-11', name: 'iPhone 11 Pro Max 64GB JV', basePrice: 95000, image: '/apple.png', specs: ['64GB Storage', 'JV Locked', 'Pro Max Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'ip-12-64-nonpta', brandId: 'apple', seriesId: 'apple-12', name: 'iPhone 12 64GB Non-PTA', basePrice: 95000, image: '/apple.png', specs: ['64GB Storage', 'Non-PTA', '5G Supported'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-12p-128-nonpta', brandId: 'apple', seriesId: 'apple-12', name: 'iPhone 12 Pro 128GB Non-PTA', basePrice: 115000, image: '/apple.png', specs: ['128GB Storage', 'Non-PTA', 'LiDAR Scanner'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-12pm-128-nonpta', brandId: 'apple', seriesId: 'apple-12', name: 'iPhone 12 Pro Max 128GB Non-PTA', basePrice: 120000, image: '/apple.png', specs: ['128GB Storage', 'Non-PTA', 'Sensor Shift OIS'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-12pm-128-pta', brandId: 'apple', seriesId: 'apple-12', name: 'iPhone 12 Pro Max 128GB PTA', basePrice: 190000, image: '/apple.png', specs: ['128GB Storage', 'PTA Approved', 'Sensor Shift OIS'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-12pm-256-nonpta', brandId: 'apple', seriesId: 'apple-12', name: 'iPhone 12 Pro Max 256GB Non-PTA', basePrice: 140000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'Sensor Shift OIS'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-12pm-256-pta', brandId: 'apple', seriesId: 'apple-12', name: 'iPhone 12 Pro Max 256GB PTA', basePrice: 215000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Sensor Shift OIS'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'ip-13-128-nonpta', brandId: 'apple', seriesId: 'apple-13', name: 'iPhone 13 128GB Non-PTA', basePrice: 70000, image: '/apple.png', specs: ['128GB Storage', 'Non-PTA', 'Cinematic Mode'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-13-256-pta', brandId: 'apple', seriesId: 'apple-13', name: 'iPhone 13 256GB PTA', basePrice: 100000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Cinematic Mode'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-13p-128-nonpta', brandId: 'apple', seriesId: 'apple-13', name: 'iPhone 13 Pro 128GB Non-PTA', basePrice: 90000, image: '/apple.png', specs: ['128GB Storage', 'Non-PTA', '120Hz ProMotion'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-13p-256-pta', brandId: 'apple', seriesId: 'apple-13', name: 'iPhone 13 Pro 256GB PTA', basePrice: 125000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', '120Hz ProMotion'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-13pm-256-jv', brandId: 'apple', seriesId: 'apple-13', name: 'iPhone 13 Pro Max 256GB JV', basePrice: 120000, image: '/apple.png', specs: ['256GB Storage', 'JV Locked', 'Best Battery Life'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-13pm-256-nonpta', brandId: 'apple', seriesId: 'apple-13', name: 'iPhone 13 Pro Max 256GB Non-PTA', basePrice: 140000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'Best Battery Life'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-13pm-256-pta', brandId: 'apple', seriesId: 'apple-13', name: 'iPhone 13 Pro Max 256GB PTA', basePrice: 200000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Best Battery Life'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'ip-14-256-nonpta', brandId: 'apple', seriesId: 'apple-14', name: 'iPhone 14 256GB Non-PTA', basePrice: 100000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'Action Mode Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-14-256-pta', brandId: 'apple', seriesId: 'apple-14', name: 'iPhone 14 256GB PTA', basePrice: 155000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Action Mode Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-14p-256-nonpta', brandId: 'apple', seriesId: 'apple-14', name: 'iPhone 14 Pro 256GB Non-PTA', basePrice: 120000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'Dynamic Island'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-14p-256-pta', brandId: 'apple', seriesId: 'apple-14', name: 'iPhone 14 Pro 256GB PTA', basePrice: 170000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Dynamic Island'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-14pm-256-jv', brandId: 'apple', seriesId: 'apple-14', name: 'iPhone 14 Pro Max 256GB JV', basePrice: 150000, image: '/apple.png', specs: ['256GB Storage', 'JV Locked', '48MP Cam + Dynamic Island'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-14pm-256-nonpta', brandId: 'apple', seriesId: 'apple-14', name: 'iPhone 14 Pro Max 256GB Non-PTA', basePrice: 180000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', '48MP Cam + Dynamic Island'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-14pm-256-pta', brandId: 'apple', seriesId: 'apple-14', name: 'iPhone 14 Pro Max 256GB PTA', basePrice: 240000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', '48MP Cam + Dynamic Island'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'ip-15-256-nonpta', brandId: 'apple', seriesId: 'apple-15', name: 'iPhone 15 256GB Non-PTA', basePrice: 130000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'USB-C + Dynamic Island'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-15-256-pta', brandId: 'apple', seriesId: 'apple-15', name: 'iPhone 15 256GB PTA', basePrice: 180000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'USB-C + Dynamic Island'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-15p-512-nonpta', brandId: 'apple', seriesId: 'apple-15', name: 'iPhone 15 Pro 512GB Non-PTA', basePrice: 160000, image: '/apple.png', specs: ['512GB Storage', 'Non-PTA', 'Titanium Build + Action Button'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-15p-256-pta', brandId: 'apple', seriesId: 'apple-15', name: 'iPhone 15 Pro 256GB PTA', basePrice: 220000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Titanium Build + Action Button'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-15pm-256-jv', brandId: 'apple', seriesId: 'apple-15', name: 'iPhone 15 Pro Max 256GB JV', basePrice: 180000, image: '/apple.png', specs: ['256GB Storage', 'JV Locked', '5x Tetraprism Telephoto'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-15pm-512-nonpta', brandId: 'apple', seriesId: 'apple-15', name: 'iPhone 15 Pro Max 512GB Non-PTA', basePrice: 220000, image: '/apple.png', specs: ['512GB Storage', 'Non-PTA', '5x Tetraprism Telephoto'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-15pm-512-pta', brandId: 'apple', seriesId: 'apple-15', name: 'iPhone 15 Pro Max 512GB PTA', basePrice: 320000, image: '/apple.png', specs: ['512GB Storage', 'PTA Approved', '5x Tetraprism Telephoto'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'ip-16-256-nonpta', brandId: 'apple', seriesId: 'apple-16', name: 'iPhone 16 256GB Non-PTA', basePrice: 160000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'Camera Control Button'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-16-256-pta', brandId: 'apple', seriesId: 'apple-16', name: 'iPhone 16 256GB PTA', basePrice: 200000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Camera Control Button'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-16p-512-nonpta', brandId: 'apple', seriesId: 'apple-16', name: 'iPhone 16 Pro 512GB Non-PTA', basePrice: 180000, image: '/apple.png', specs: ['512GB Storage', 'Non-PTA', 'Apple Intelligence'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-16p-512-pta', brandId: 'apple', seriesId: 'apple-16', name: 'iPhone 16 Pro 512GB PTA', basePrice: 240000, image: '/apple.png', specs: ['512GB Storage', 'PTA Approved', 'Apple Intelligence'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-16pm-512-jv', brandId: 'apple', seriesId: 'apple-16', name: 'iPhone 16 Pro Max 512GB JV', basePrice: 220000, image: '/apple.png', specs: ['512GB Storage', 'JV Locked', '6.9" Display + AI'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-16pm-512-nonpta', brandId: 'apple', seriesId: 'apple-16', name: 'iPhone 16 Pro Max 512GB Non-PTA', basePrice: 260000, image: '/apple.png', specs: ['512GB Storage', 'Non-PTA', '6.9" Display + AI'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-16pm-512-pta', brandId: 'apple', seriesId: 'apple-16', name: 'iPhone 16 Pro Max 512GB PTA', basePrice: 380000, image: '/apple.png', specs: ['512GB Storage', 'PTA Approved', '6.9" Display + AI'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'ip-17-256-nonpta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 256GB Non-PTA', basePrice: 280000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'A19 Bionic + 120Hz ProMotion'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17-256-pta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 256GB PTA', basePrice: 380000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'A19 Bionic + 120Hz ProMotion'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17-512-nonpta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 512GB Non-PTA', basePrice: 325000, image: '/apple.png', specs: ['512GB Storage', 'Non-PTA', 'A19 Bionic + 120Hz ProMotion'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17-512-pta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 512GB PTA', basePrice: 430000, image: '/apple.png', specs: ['512GB Storage', 'PTA Approved', 'A19 Bionic + 120Hz ProMotion'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17air-512-nonpta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Air 512GB Non-PTA', basePrice: 320000, image: '/apple.png', specs: ['512GB Storage', 'Non-PTA', 'Ultra Thin Design'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17air-512-pta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Air 512GB PTA', basePrice: 430000, image: '/apple.png', specs: ['512GB Storage', 'PTA Approved', 'Ultra Thin Design'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17p-512-nonpta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Pro 512GB Non-PTA', basePrice: 360000, image: '/apple.png', specs: ['512GB Storage', 'Non-PTA', 'A19 Pro + Vapor Chamber'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17p-512-pta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Pro 512GB PTA', basePrice: 480000, image: '/apple.png', specs: ['512GB Storage', 'PTA Approved', 'A19 Pro + Vapor Chamber'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17pm-256-nonpta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Pro Max 256GB Non-PTA', basePrice: 430000, image: '/apple.png', specs: ['256GB Storage', 'Non-PTA', 'Triple 48MP Cameras'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17pm-256-pta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Pro Max 256GB PTA', basePrice: 550000, image: '/apple.png', specs: ['256GB Storage', 'PTA Approved', 'Triple 48MP Cameras'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17pm-512-nonpta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Pro Max 512GB Non-PTA', basePrice: 460000, image: '/apple.png', specs: ['512GB Storage', 'Non-PTA', 'Triple 48MP Cameras'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17pm-512-pta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Pro Max 512GB PTA', basePrice: 580000, image: '/apple.png', specs: ['512GB Storage', 'PTA Approved', 'Triple 48MP Cameras'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17pm-1tb-nonpta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Pro Max 1TB Non-PTA', basePrice: 495000, image: '/apple.png', specs: ['1TB Storage', 'Non-PTA', 'Triple 48MP Cameras'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17pm-1tb-pta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Pro Max 1TB PTA', basePrice: 700000, image: '/apple.png', specs: ['1TB Storage', 'PTA Approved', 'Triple 48MP Cameras'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17pm-2tb-nonpta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Pro Max 2TB Non-PTA', basePrice: 525000, image: '/apple.png', specs: ['2TB Storage', 'Non-PTA', 'Ultimate Pro Flagship'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'ip-17pm-2tb-pta', brandId: 'apple', seriesId: 'apple-17', name: 'iPhone 17 Pro Max 2TB PTA', basePrice: 850000, image: '/apple.png', specs: ['2TB Storage', 'PTA Approved', 'Ultimate Pro Flagship'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= GOOGLE PIXEL =================
  { id: 'px-1-32', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 32GB', basePrice: 35000, image: '/google-pixel.webp', specs: ['32GB Storage', 'Pure Android', 'PTA Rs. 35K / Non-PTA 20K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-1-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 128GB', basePrice: 45000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Pure Android', 'PTA Rs. 45K / Non-PTA 28K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-1xl-32', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel XL 32GB', basePrice: 38000, image: '/google-pixel.webp', specs: ['32GB Storage', 'Quad HD Display', 'PTA Rs. 38K / Non-PTA 22K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-1xl-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel XL 128GB', basePrice: 48000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Quad HD Display', 'PTA Rs. 48K / Non-PTA 30K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-2-64', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 2 64GB', basePrice: 45000, image: '/google-pixel.webp', specs: ['64GB Storage', 'Cinematic Cam', 'PTA Rs. 45K / Non-PTA 28K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-2-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 2 128GB', basePrice: 50000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Cinematic Cam', 'PTA Rs. 50K / Non-PTA 32K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-2xl-64', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 2 XL 64GB', basePrice: 50000, image: '/google-pixel.webp', specs: ['64GB Storage', 'P-OLED Display', 'PTA Rs. 50K / Non-PTA 32K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-2xl-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 2 XL 128GB', basePrice: 55000, image: '/google-pixel.webp', specs: ['128GB Storage', 'P-OLED Display', 'PTA Rs. 55K / Non-PTA 35K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-3-64', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 3 64GB', basePrice: 50000, image: '/google-pixel.webp', specs: ['64GB Storage', 'Night Sight', 'PTA Rs. 50K / Non-PTA 32K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-3-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 3 128GB', basePrice: 55000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Night Sight', 'PTA Rs. 55K / Non-PTA 35K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-3xl-64', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 3 XL 64GB', basePrice: 55000, image: '/google-pixel.webp', specs: ['64GB Storage', 'Wide Selfie Cam', 'PTA Rs. 55K / Non-PTA 35K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-3xl-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 3 XL 128GB', basePrice: 60000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Wide Selfie Cam', 'PTA Rs. 60K / Non-PTA 38K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-3a-64', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 3a 64GB', basePrice: 45000, image: '/google-pixel.webp', specs: ['64GB Storage', 'Headphone Jack', 'PTA Rs. 45K / Non-PTA 28K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-3axl-64', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 3a XL 64GB', basePrice: 48000, image: '/google-pixel.webp', specs: ['64GB Storage', 'Headphone Jack', 'PTA Rs. 48K / Non-PTA 30K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-4-64', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 4 64GB', basePrice: 55000, image: '/google-pixel.webp', specs: ['64GB Storage', '90Hz Smooth Display', 'PTA Rs. 55K / Non-PTA 35K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-4-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 4 128GB', basePrice: 60000, image: '/google-pixel.webp', specs: ['128GB Storage', '90Hz Smooth Display', 'PTA Rs. 60K / Non-PTA 40K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-4xl-64', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 4 XL 64GB', basePrice: 60000, image: '/google-pixel.webp', specs: ['64GB Storage', 'Face Unlock', 'PTA Rs. 60K / Non-PTA 40K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-4xl-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 4 XL 128GB', basePrice: 65000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Face Unlock', 'PTA Rs. 65K / Non-PTA 43K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-4a-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 4a 128GB', basePrice: 55000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Compact Size', 'PTA Rs. 55K / Non-PTA 35K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-4a5g-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 4a 5G 128GB', basePrice: 65000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Ultrawide Cam', 'PTA Rs. 65K / Non-PTA 42K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-5-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 5 128GB', basePrice: 75000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Wireless Charging', 'PTA Rs. 75K / Non-PTA 50K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-5a-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 5a 5G 128GB', basePrice: 80000, image: '/google-pixel.webp', specs: ['128GB Storage', 'IP67 Water Resistant', 'PTA Rs. 80K / Non-PTA 52K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-6-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 6 128GB', basePrice: 85000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Google Tensor Chip', 'PTA Rs. 85K / Non-PTA 55K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-6-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 6 256GB', basePrice: 95000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Google Tensor Chip', 'PTA Rs. 95K / Non-PTA 62K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-6p-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 6 Pro 128GB', basePrice: 105000, image: '/google-pixel.webp', specs: ['128GB Storage', '4x Telephoto Lens', 'PTA Rs. 105K / Non-PTA 70K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-6p-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 6 Pro 256GB', basePrice: 115000, image: '/google-pixel.webp', specs: ['256GB Storage', '4x Telephoto Lens', 'PTA Rs. 115K / Non-PTA 78K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-6p-512', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 6 Pro 512GB', basePrice: 125000, image: '/google-pixel.webp', specs: ['512GB Storage', '4x Telephoto Lens', 'PTA Rs. 125K / Non-PTA 85K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-6a-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 6a 128GB', basePrice: 65000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Google Tensor', 'PTA Rs. 65K / Non-PTA 45K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-7-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 7 128GB', basePrice: 90000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Tensor G2', 'PTA Rs. 90K / Non-PTA 60K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-7-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 7 256GB', basePrice: 100000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Tensor G2', 'PTA Rs. 100K / Non-PTA 68K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-7p-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 7 Pro 128GB', basePrice: 120000, image: '/google-pixel.webp', specs: ['128GB Storage', '5x Telephoto Cam', 'PTA Rs. 120K / Non-PTA 80K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-7p-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 7 Pro 256GB', basePrice: 130000, image: '/google-pixel.webp', specs: ['256GB Storage', '5x Telephoto Cam', 'PTA Rs. 130K / Non-PTA 88K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-7p-512', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 7 Pro 512GB', basePrice: 145000, image: '/google-pixel.webp', specs: ['512GB Storage', '5x Telephoto Cam', 'PTA Rs. 145K / Non-PTA 98K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-7a-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 7a 128GB', basePrice: 75000, image: '/google-pixel.webp', specs: ['128GB Storage', '90Hz Display', 'PTA Rs. 75K / Non-PTA 52K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-8-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 8 128GB', basePrice: 105000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Tensor G3 + AI', 'PTA Rs. 105K / Non-PTA 72K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-8-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 8 256GB', basePrice: 115000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Tensor G3 + AI', 'PTA Rs. 115K / Non-PTA 80K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-8p-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 8 Pro 128GB', basePrice: 145000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Pro Controls + Temp Sensor', 'PTA Rs. 145K / Non-PTA 100K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-8p-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 8 Pro 256GB', basePrice: 155000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Pro Controls + Temp Sensor', 'PTA Rs. 155K / Non-PTA 110K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-8p-512', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 8 Pro 512GB', basePrice: 170000, image: '/google-pixel.webp', specs: ['512GB Storage', 'Pro Controls + Temp Sensor', 'PTA Rs. 170K / Non-PTA 120K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-8p-1tb', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 8 Pro 1TB', basePrice: 185000, image: '/google-pixel.webp', specs: ['1TB Storage', 'Pro Controls + Temp Sensor', 'PTA Rs. 185K / Non-PTA 130K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-8a-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 8a 128GB', basePrice: 90000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Tensor G3', 'PTA Rs. 90K / Non-PTA 62K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-8a-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 8a 256GB', basePrice: 100000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Tensor G3', 'PTA Rs. 100K / Non-PTA 70K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 128GB', basePrice: 150000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Tensor G4', 'PTA Rs. 150K / Non-PTA 105K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 256GB', basePrice: 165000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Tensor G4', 'PTA Rs. 165K / Non-PTA 115K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9p-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 Pro 128GB', basePrice: 190000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Gemini Nano AI', 'PTA Rs. 190K / Non-PTA 135K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9p-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 Pro 256GB', basePrice: 205000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Gemini Nano AI', 'PTA Rs. 205K / Non-PTA 145K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9p-512', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 Pro 512GB', basePrice: 225000, image: '/google-pixel.webp', specs: ['512GB Storage', 'Gemini Nano AI', 'PTA Rs. 225K / Non-PTA 160K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9pxl-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 Pro XL 128GB', basePrice: 205000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Pro XL Display', 'PTA Rs. 205K / Non-PTA 145K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9pxl-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 Pro XL 256GB', basePrice: 220000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Pro XL Display', 'PTA Rs. 220K / Non-PTA 155K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9pxl-512', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 Pro XL 512GB', basePrice: 240000, image: '/google-pixel.webp', specs: ['512GB Storage', 'Pro XL Display', 'PTA Rs. 240K / Non-PTA 170K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9pxl-1tb', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 Pro XL 1TB', basePrice: 260000, image: '/google-pixel.webp', specs: ['1TB Storage', 'Pro XL Display', 'PTA Rs. 260K / Non-PTA 185K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9a-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9a 128GB', basePrice: 125000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Tensor G4 Lite', 'PTA Rs. 125K / Non-PTA 88K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9a-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9a 256GB', basePrice: 140000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Tensor G4 Lite', 'PTA Rs. 140K / Non-PTA 98K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9pfold-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 Pro Fold 256GB', basePrice: 300000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Super Actua Foldable', 'PTA Rs. 300K / Non-PTA 215K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-9pfold-512', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 9 Pro Fold 512GB', basePrice: 330000, image: '/google-pixel.webp', specs: ['512GB Storage', 'Super Actua Foldable', 'PTA Rs. 330K / Non-PTA 235K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'px-10-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10 128GB', basePrice: 185000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Tensor G5 TSMC 3nm', 'PTA Rs. 185K / Non-PTA 135K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10 256GB', basePrice: 200000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Tensor G5 TSMC 3nm', 'PTA Rs. 200K / Non-PTA 145K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10p-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10 Pro 128GB', basePrice: 235000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Tensor G5 Pro', 'PTA Rs. 235K / Non-PTA 170K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10p-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10 Pro 256GB', basePrice: 250000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Tensor G5 Pro', 'PTA Rs. 250K / Non-PTA 180K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10p-512', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10 Pro 512GB', basePrice: 270000, image: '/google-pixel.webp', specs: ['512GB Storage', 'Tensor G5 Pro', 'PTA Rs. 270K / Non-PTA 195K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10pxl-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10 Pro XL 256GB', basePrice: 270000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Tensor G5 Pro XL', 'PTA Rs. 270K / Non-PTA 195K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10pxl-512', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10 Pro XL 512GB', basePrice: 290000, image: '/google-pixel.webp', specs: ['512GB Storage', 'Tensor G5 Pro XL', 'PTA Rs. 290K / Non-PTA 210K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10pxl-1tb', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10 Pro XL 1TB', basePrice: 315000, image: '/google-pixel.webp', specs: ['1TB Storage', 'Tensor G5 Pro XL', 'PTA Rs. 315K / Non-PTA 225K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10a-128', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10a 128GB', basePrice: 125000, image: '/google-pixel.webp', specs: ['128GB Storage', 'Tensor G5 Lite', 'PTA Rs. 125K / Non-PTA 90K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10a-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10a 256GB', basePrice: 140000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Tensor G5 Lite', 'PTA Rs. 140K / Non-PTA 100K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10pfold-256', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10 Pro Fold 256GB', basePrice: 350000, image: '/google-pixel.webp', specs: ['256GB Storage', 'Next-Gen Foldable', 'PTA Rs. 350K / Non-PTA 250K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'px-10pfold-512', brandId: 'google', seriesId: 'google-pixel', name: 'Pixel 10 Pro Fold 512GB', basePrice: 380000, image: '/google-pixel.webp', specs: ['512GB Storage', 'Next-Gen Foldable', 'PTA Rs. 380K / Non-PTA 270K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= ONEPLUS =================
  { id: 'op-1-16', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus One 16GB', basePrice: 25000, image: '/oneplus.png', specs: ['16GB Storage', 'Classic Flagship Killer', 'PTA Rs. 25K / Non-PTA 17K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-1-64', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus One 64GB', basePrice: 30000, image: '/oneplus.png', specs: ['64GB Storage', 'Classic Flagship Killer', 'PTA Rs. 30K / Non-PTA 20K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-2-16', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 2 16GB', basePrice: 25000, image: '/oneplus.png', specs: ['16GB Storage', 'Snapdragon 810', 'PTA Rs. 25K / Non-PTA 17K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-2-64', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 2 64GB', basePrice: 30000, image: '/oneplus.png', specs: ['64GB Storage', 'Snapdragon 810', 'PTA Rs. 30K / Non-PTA 20K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-x-16', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus X 16GB', basePrice: 25000, image: '/oneplus.png', specs: ['16GB Storage', 'Glass Build', 'PTA Rs. 25K / Non-PTA 17K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-3-64', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 3 64GB', basePrice: 42000, image: '/oneplus.png', specs: ['64GB Storage', 'Dash Charge', 'PTA Rs. 42K / Non-PTA 30K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-3t-64', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 3T 64GB', basePrice: 43000, image: '/oneplus.png', specs: ['64GB Storage', 'Dash Charge', 'PTA Rs. 43K / Non-PTA 30K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-3t-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 3T 128GB', basePrice: 48000, image: '/oneplus.png', specs: ['128GB Storage', 'Dash Charge', 'PTA Rs. 48K / Non-PTA 34K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-5-64', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 5 64GB', basePrice: 45000, image: '/oneplus.png', specs: ['64GB Storage', 'Dual Cam', 'PTA Rs. 45K / Non-PTA 32K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-5-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 5 128GB', basePrice: 50000, image: '/oneplus.png', specs: ['128GB Storage', 'Dual Cam', 'PTA Rs. 50K / Non-PTA 35K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-5t-64', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 5T 64GB', basePrice: 48000, image: '/oneplus.png', specs: ['64GB Storage', 'Full Screen AMOLED', 'PTA Rs. 48K / Non-PTA 34K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-5t-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 5T 128GB', basePrice: 53000, image: '/oneplus.png', specs: ['128GB Storage', 'Full Screen AMOLED', 'PTA Rs. 53K / Non-PTA 38K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-6-64', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 6 64GB', basePrice: 50000, image: '/oneplus.png', specs: ['64GB Storage', 'Optic AMOLED', 'PTA Rs. 50K / Non-PTA 35K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-6-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 6 128GB', basePrice: 55000, image: '/oneplus.png', specs: ['128GB Storage', 'Optic AMOLED', 'PTA Rs. 55K / Non-PTA 40K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-6-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 6 256GB', basePrice: 60000, image: '/oneplus.png', specs: ['256GB Storage', 'Optic AMOLED', 'PTA Rs. 60K / Non-PTA 43K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-6t-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 6T 128GB', basePrice: 55000, image: '/oneplus.png', specs: ['128GB Storage', 'In-Display Fingerprint', 'PTA Rs. 55K / Non-PTA 40K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-6t-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 6T 256GB', basePrice: 62000, image: '/oneplus.png', specs: ['256GB Storage', 'In-Display Fingerprint', 'PTA Rs. 62K / Non-PTA 45K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-6tmcl-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: '6T McLaren 256GB', basePrice: 75000, image: '/oneplus.png', specs: ['256GB Storage', '10GB RAM McLaren Edition', 'PTA Rs. 75K / Non-PTA 55K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-7-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 7 128GB', basePrice: 60000, image: '/oneplus.png', specs: ['128GB Storage', 'Snapdragon 855', 'PTA Rs. 60K / Non-PTA 43K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-7-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 7 256GB', basePrice: 65000, image: '/oneplus.png', specs: ['256GB Storage', 'Snapdragon 855', 'PTA Rs. 65K / Non-PTA 48K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-7p-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 7 Pro 128GB', basePrice: 70000, image: '/oneplus.png', specs: ['128GB Storage', '90Hz Pop-Up Cam Display', 'PTA Rs. 70K / Non-PTA 50K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-7p-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 7 Pro 256GB', basePrice: 78000, image: '/oneplus.png', specs: ['256GB Storage', '90Hz Pop-Up Cam Display', 'PTA Rs. 78K / Non-PTA 55K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-7t-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 7T 128GB', basePrice: 65000, image: '/oneplus.png', specs: ['128GB Storage', '90Hz Display', 'PTA Rs. 65K / Non-PTA 47K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-7t-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 7T 256GB', basePrice: 72000, image: '/oneplus.png', specs: ['256GB Storage', '90Hz Display', 'PTA Rs. 72K / Non-PTA 52K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-7tp-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 7T Pro 256GB', basePrice: 80000, image: '/oneplus.png', specs: ['256GB Storage', 'Pop-Up Cam', 'PTA Rs. 80K / Non-PTA 58K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-7tpmcl-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: '7T Pro McLaren 256GB', basePrice: 90000, image: '/oneplus.png', specs: ['256GB Storage', '12GB RAM McLaren Edition', 'PTA Rs. 90K / Non-PTA 65K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-8-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 8 128GB', basePrice: 75000, image: '/oneplus.png', specs: ['128GB Storage', '90Hz Curved Display', 'PTA Rs. 75K / Non-PTA 55K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-8-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 8 256GB', basePrice: 83000, image: '/oneplus.png', specs: ['256GB Storage', '90Hz Curved Display', 'PTA Rs. 83K / Non-PTA 60K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-8p-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 8 Pro 128GB', basePrice: 120000, image: '/oneplus.png', specs: ['128GB Storage', '120Hz Quad HD+', 'PTA Rs. 120K / Non-PTA 82K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-8p-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 8 Pro 256GB', basePrice: 133000, image: '/oneplus.png', specs: ['256GB Storage', '120Hz Quad HD+', 'PTA Rs. 133K / Non-PTA 90K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-8t-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 8T 128GB', basePrice: 90000, image: '/oneplus.png', specs: ['128GB Storage', '65W Warp Charge', 'PTA Rs. 90K / Non-PTA 65K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-8t-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 8T 256GB', basePrice: 100000, image: '/oneplus.png', specs: ['256GB Storage', '65W Warp Charge', 'PTA Rs. 100K / Non-PTA 72K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-9-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 9 128GB', basePrice: 115000, image: '/oneplus.png', specs: ['128GB Storage', 'Hasselblad Camera', 'PTA Rs. 115K / Non-PTA 82K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-9-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 9 256GB', basePrice: 130000, image: '/oneplus.png', specs: ['256GB Storage', 'Hasselblad Camera', 'PTA Rs. 130K / Non-PTA 92K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-9p-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 9 Pro 128GB', basePrice: 145000, image: '/oneplus.png', specs: ['128GB Storage', 'Hasselblad Cam + LTPO', 'PTA Rs. 145K / Non-PTA 100K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-9p-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 9 Pro 256GB', basePrice: 155000, image: '/oneplus.png', specs: ['256GB Storage', 'Hasselblad Cam + LTPO', 'PTA Rs. 155K / Non-PTA 110K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-9r-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 9R 128GB', basePrice: 90000, image: '/oneplus.png', specs: ['128GB Storage', 'Snapdragon 870', 'PTA Rs. 90K / Non-PTA 65K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-9r-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 9R 256GB', basePrice: 100000, image: '/oneplus.png', specs: ['256GB Storage', 'Snapdragon 870', 'PTA Rs. 100K / Non-PTA 72K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-9rt-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 9RT 128GB', basePrice: 100000, image: '/oneplus.png', specs: ['128GB Storage', 'Snapdragon 888', 'PTA Rs. 100K / Non-PTA 72K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-9rt-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 9RT 256GB', basePrice: 110000, image: '/oneplus.png', specs: ['256GB Storage', 'Snapdragon 888', 'PTA Rs. 110K / Non-PTA 80K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-10p-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 10 Pro 128GB', basePrice: 175000, image: '/oneplus.png', specs: ['128GB Storage', '2nd Gen Hasselblad Cam', 'PTA Rs. 175K / Non-PTA 125K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-10p-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 10 Pro 256GB', basePrice: 199000, image: '/oneplus.png', specs: ['256GB Storage', '2nd Gen Hasselblad Cam', 'PTA Rs. 199K / Non-PTA 140K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-10t-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 10T 128GB', basePrice: 115000, image: '/oneplus.png', specs: ['128GB Storage', '150W SUPERVOOC', 'PTA Rs. 115K / Non-PTA 85K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-10t-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 10T 256GB', basePrice: 125000, image: '/oneplus.png', specs: ['256GB Storage', '150W SUPERVOOC', 'PTA Rs. 125K / Non-PTA 92K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-10r-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 10R 128GB', basePrice: 100000, image: '/oneplus.png', specs: ['128GB Storage', 'Dimensity 8100 Max', 'PTA Rs. 100K / Non-PTA 72K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-10r-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 10R 256GB', basePrice: 110000, image: '/oneplus.png', specs: ['256GB Storage', 'Dimensity 8100 Max', 'PTA Rs. 110K / Non-PTA 80K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-11-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 11 128GB', basePrice: 150000, image: '/oneplus.png', specs: ['128GB Storage', 'Snapdragon 8 Gen 2', 'PTA Rs. 150K / Non-PTA 110K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-11-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 11 256GB', basePrice: 165000, image: '/oneplus.png', specs: ['256GB Storage', 'Snapdragon 8 Gen 2', 'PTA Rs. 165K / Non-PTA 120K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-11-512', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 11 512GB', basePrice: 180000, image: '/oneplus.png', specs: ['512GB Storage', 'Snapdragon 8 Gen 2', 'PTA Rs. 180K / Non-PTA 130K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-11r-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 11R 128GB', basePrice: 115000, image: '/oneplus.png', specs: ['128GB Storage', 'Snapdragon 8+ Gen 1', 'PTA Rs. 115K / Non-PTA 85K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-11r-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 11R 256GB', basePrice: 125000, image: '/oneplus.png', specs: ['256GB Storage', 'Snapdragon 8+ Gen 1', 'PTA Rs. 125K / Non-PTA 92K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-12-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 12 256GB', basePrice: 190000, image: '/oneplus.png', specs: ['256GB Storage', 'Snapdragon 8 Gen 3', 'PTA Rs. 190K / Non-PTA 140K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-12-512', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 12 512GB', basePrice: 215000, image: '/oneplus.png', specs: ['512GB Storage', 'Snapdragon 8 Gen 3', 'PTA Rs. 215K / Non-PTA 155K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-12r-128', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 12R 128GB', basePrice: 125000, image: '/oneplus.png', specs: ['128GB Storage', '1.5K 120Hz ProXDR', 'PTA Rs. 125K / Non-PTA 95K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-12r-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 12R 256GB', basePrice: 140000, image: '/oneplus.png', specs: ['256GB Storage', '1.5K 120Hz ProXDR', 'PTA Rs. 140K / Non-PTA 105K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-13-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 13 256GB', basePrice: 220000, image: '/oneplus.png', specs: ['256GB Storage', 'Snapdragon 8 Elite', 'PTA Rs. 220K / Non-PTA 165K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-13-512', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 13 512GB', basePrice: 240000, image: '/oneplus.png', specs: ['512GB Storage', 'Snapdragon 8 Elite', 'PTA Rs. 240K / Non-PTA 180K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-13r-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 13R 256GB', basePrice: 160000, image: '/oneplus.png', specs: ['256GB Storage', 'Next-Gen Performance', 'PTA Rs. 160K / Non-PTA 120K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-13r-512', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 13R 512GB', basePrice: 180000, image: '/oneplus.png', specs: ['512GB Storage', 'Next-Gen Performance', 'PTA Rs. 180K / Non-PTA 135K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-13t-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 13T 256GB', basePrice: 180000, image: '/oneplus.png', specs: ['256GB Storage', 'Flagship Killer 2026', 'PTA Rs. 180K / Non-PTA 135K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-13t-512', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 13T 512GB', basePrice: 200000, image: '/oneplus.png', specs: ['512GB Storage', 'Flagship Killer 2026', 'PTA Rs. 200K / Non-PTA 150K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-15-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 15 256GB', basePrice: 240000, image: '/oneplus.png', specs: ['256GB Storage', 'Next-Gen Flagship', 'PTA Rs. 240K / Non-PTA 180K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-15-512', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 15 512GB', basePrice: 260000, image: '/oneplus.png', specs: ['512GB Storage', 'Next-Gen Flagship', 'PTA Rs. 260K / Non-PTA 195K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-15p-256', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 15 Pro 256GB', basePrice: 285000, image: '/oneplus.png', specs: ['256GB Storage', 'Pro Hasselblad Cam', 'PTA Rs. 285K / Non-PTA 215K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-15p-512', brandId: 'oneplus', seriesId: 'oneplus-main', name: 'OnePlus 15 Pro 512GB', basePrice: 310000, image: '/oneplus.png', specs: ['512GB Storage', 'Pro Hasselblad Cam', 'PTA Rs. 310K / Non-PTA 235K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  { id: 'op-n-8-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 8/128GB', basePrice: 87000, image: '/oneplus.png', specs: ['8GB RAM', '128GB Storage', 'PTA Rs. 87K / Non-PTA 62K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n-12-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 12/256GB', basePrice: 95000, image: '/oneplus.png', specs: ['12GB RAM', '256GB Storage', 'PTA Rs. 95K / Non-PTA 68K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n10-6-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord N10 5G 6/128GB', basePrice: 41000, image: '/oneplus.png', specs: ['6GB RAM', '128GB Storage', 'PTA Rs. 41K / Non-PTA 30K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n100-4-64', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord N100 4/64GB', basePrice: 21000, image: '/oneplus.png', specs: ['4GB RAM', '64GB Storage', 'PTA Rs. 21K / Non-PTA 15K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n200-4-64', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord N200 4/64GB', basePrice: 30000, image: '/oneplus.png', specs: ['4GB RAM', '64GB Storage', 'PTA Rs. 30K / Non-PTA 22K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce-6-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 6/128GB', basePrice: 62000, image: '/oneplus.png', specs: ['6GB RAM', '128GB Storage', 'PTA Rs. 62K / Non-PTA 45K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce-8-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 8/128GB', basePrice: 68000, image: '/oneplus.png', specs: ['8GB RAM', '128GB Storage', 'PTA Rs. 68K / Non-PTA 50K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce2-8-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 2 8/128GB', basePrice: 110000, image: '/oneplus.png', specs: ['8GB RAM', '128GB Storage', 'PTA Rs. 110K / Non-PTA 78K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce2lite-6-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 2 Lite 6/128GB', basePrice: 55000, image: '/oneplus.png', specs: ['6GB RAM', '128GB Storage', 'PTA Rs. 55K / Non-PTA 40K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce3lite-8-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 3 Lite 8/128GB', basePrice: 55000, image: '/oneplus.png', specs: ['8GB RAM', '128GB Storage', 'PTA Rs. 55K / Non-PTA 40K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce3lite-8-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 3 Lite 8/256GB', basePrice: 62000, image: '/oneplus.png', specs: ['8GB RAM', '256GB Storage', 'PTA Rs. 62K / Non-PTA 45K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce3-8-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 3 8/128GB', basePrice: 70000, image: '/oneplus.png', specs: ['8GB RAM', '128GB Storage', 'PTA Rs. 70K / Non-PTA 52K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce3-12-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 3 12/256GB', basePrice: 80000, image: '/oneplus.png', specs: ['12GB RAM', '256GB Storage', 'PTA Rs. 80K / Non-PTA 60K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce4-8-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 4 8/128GB', basePrice: 75000, image: '/oneplus.png', specs: ['8GB RAM', '128GB Storage', 'PTA Rs. 75K / Non-PTA 55K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce4-8-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 4 8/256GB', basePrice: 85000, image: '/oneplus.png', specs: ['8GB RAM', '256GB Storage', 'PTA Rs. 85K / Non-PTA 62K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-nce4lite-8-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord CE 4 Lite 8/256GB', basePrice: 55000, image: '/oneplus.png', specs: ['8GB RAM', '256GB Storage', 'PTA Rs. 55K / Non-PTA 42K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n2-8-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 2 8/128GB', basePrice: 70000, image: '/oneplus.png', specs: ['8GB RAM', '128GB Storage', 'PTA Rs. 70K / Non-PTA 52K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n2-12-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 2 12/256GB', basePrice: 78000, image: '/oneplus.png', specs: ['12GB RAM', '256GB Storage', 'PTA Rs. 78K / Non-PTA 58K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n2t-8-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 2T 8/128GB', basePrice: 75000, image: '/oneplus.png', specs: ['8GB RAM', '128GB Storage', 'PTA Rs. 75K / Non-PTA 55K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n2t-12-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 2T 12/256GB', basePrice: 85000, image: '/oneplus.png', specs: ['12GB RAM', '256GB Storage', 'PTA Rs. 85K / Non-PTA 63K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n3-8-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 3 8/128GB', basePrice: 85000, image: '/oneplus.png', specs: ['8GB RAM', '128GB Storage', 'PTA Rs. 85K / Non-PTA 63K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n3-16-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 3 16/256GB', basePrice: 100000, image: '/oneplus.png', specs: ['16GB RAM', '256GB Storage', 'PTA Rs. 100K / Non-PTA 75K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n4-8-128', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 4 8/128GB', basePrice: 90000, image: '/oneplus.png', specs: ['8GB RAM', '128GB Storage', 'PTA Rs. 90K / Non-PTA 68K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n4-12-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 4 12/256GB', basePrice: 105000, image: '/oneplus.png', specs: ['12GB RAM', '256GB Storage', 'PTA Rs. 105K / Non-PTA 78K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n4-16-512', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 4 16/512GB', basePrice: 120000, image: '/oneplus.png', specs: ['16GB RAM', '512GB Storage', 'PTA Rs. 120K / Non-PTA 90K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n5-8-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 5 8/256GB', basePrice: 125000, image: '/oneplus.png', specs: ['8GB RAM', '256GB Storage', 'PTA Rs. 125K / Non-PTA 95K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n5-12-256', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 5 12/256GB', basePrice: 140000, image: '/oneplus.png', specs: ['12GB RAM', '256GB Storage', 'PTA Rs. 140K / Non-PTA 105K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'op-n5-12-512', brandId: 'oneplus', seriesId: 'oneplus-nord', name: 'Nord 5 12/512GB', basePrice: 155000, image: '/oneplus.png', specs: ['12GB RAM', '512GB Storage', 'PTA Rs. 155K / Non-PTA 115K'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },

  // ================= NOTHING =================
  { id: 'nth-1-8-128', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (1) 8GB/128GB', basePrice: 65000, image: '/nothing-logo.webp', specs: ['8GB RAM', '128GB Storage', 'Glyph Interface'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-1-8-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (1) 8GB/256GB', basePrice: 75000, image: '/nothing-logo.webp', specs: ['8GB RAM', '256GB Storage', 'Glyph Interface'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-1-12-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (1) 12GB/256GB', basePrice: 85000, image: '/nothing-logo.webp', specs: ['12GB RAM', '256GB Storage', 'Glyph Interface'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-2-8-128', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (2) 8GB/128GB', basePrice: 175000, image: '/nothing-logo.webp', specs: ['8GB RAM', '128GB Storage', 'Snapdragon 8+ Gen 1'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-2-12-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (2) 12GB/256GB', basePrice: 200000, image: '/nothing-logo.webp', specs: ['12GB RAM', '256GB Storage', 'Snapdragon 8+ Gen 1'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-2-12-512', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (2) 12GB/512GB', basePrice: 220000, image: '/nothing-logo.webp', specs: ['12GB RAM', '512GB Storage', 'Snapdragon 8+ Gen 1'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-2a-8-128', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (2a) 8GB/128GB', basePrice: 95000, image: '/nothing-logo.webp', specs: ['8GB RAM', '128GB Storage', 'Dimensity 7200 Pro'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-2a-8-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (2a) 8GB/256GB', basePrice: 105000, image: '/nothing-logo.webp', specs: ['8GB RAM', '256GB Storage', 'Dimensity 7200 Pro'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-2a-12-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (2a) 12GB/256GB', basePrice: 110000, image: '/nothing-logo.webp', specs: ['12GB RAM', '256GB Storage', 'Dimensity 7200 Pro'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-2aplus-8-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (2a) Plus 8GB/256GB', basePrice: 120000, image: '/nothing-logo.webp', specs: ['8GB RAM', '256GB Storage', '50MP Selfie Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-2aplus-12-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (2a) Plus 12GB/256GB', basePrice: 130000, image: '/nothing-logo.webp', specs: ['12GB RAM', '256GB Storage', '50MP Selfie Cam'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-3-12-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (3) 12GB/256GB', basePrice: 300000, image: '/nothing-logo.webp', specs: ['12GB RAM', '256GB Storage', 'Flagship Glyph Tech'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-3-16-512', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (3) 16GB/512GB', basePrice: 325000, image: '/nothing-logo.webp', specs: ['16GB RAM', '512GB Storage', 'Flagship Glyph Tech'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-3a-8-128', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (3a) 8GB/128GB', basePrice: 125000, image: '/nothing-logo.webp', specs: ['8GB RAM', '128GB Storage', 'Glossy Transparent Back'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-3a-12-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (3a) 12GB/256GB', basePrice: 137000, image: '/nothing-logo.webp', specs: ['12GB RAM', '256GB Storage', 'Glossy Transparent Back'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-3apro-8-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (3a) Pro 8GB/256GB', basePrice: 160000, image: '/nothing-logo.webp', specs: ['8GB RAM', '256GB Storage', '120Hz Pro Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-3apro-12-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (3a) Pro 12GB/256GB', basePrice: 165000, image: '/nothing-logo.webp', specs: ['12GB RAM', '256GB Storage', '120Hz Pro Display'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-3alite-8-128', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (3a) Lite 8GB/128GB', basePrice: 80000, image: '/nothing-logo.webp', specs: ['8GB RAM', '128GB Storage', 'Glyph Lite'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-3alite-8-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (3a) Lite 8GB/256GB', basePrice: 89000, image: '/nothing-logo.webp', specs: ['8GB RAM', '256GB Storage', 'Glyph Lite'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-4a-8-128', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (4a) 8GB/128GB', basePrice: 195000, image: '/nothing-logo.webp', specs: ['8GB RAM', '128GB Storage', 'Next-Gen Glyph Matrix'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-4a-12-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (4a) 12GB/256GB', basePrice: 200000, image: '/nothing-logo.webp', specs: ['12GB RAM', '256GB Storage', 'Next-Gen Glyph Matrix'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-4apro-8-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (4a) Pro 8GB/256GB', basePrice: 225000, image: '/nothing-logo.webp', specs: ['8GB RAM', '256GB Storage', 'Next-Gen Glyph Pro'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-4apro-12-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (4a) Pro 12GB/256GB', basePrice: 230000, image: '/nothing-logo.webp', specs: ['12GB RAM', '256GB Storage', 'Next-Gen Glyph Pro'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-4b-8-128', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (4b) 8GB/128GB', basePrice: 90000, image: '/nothing-logo.webp', specs: ['8GB RAM', '128GB Storage', 'Budget Glyph Series'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE },
  { id: 'nth-4b-8-256', brandId: 'nothing', seriesId: 'nothing-main', name: 'Phone (4b) 8GB/256GB', basePrice: 105000, image: '/nothing-logo.webp', specs: ['8GB RAM', '256GB Storage', 'Budget Glyph Series'], colors: DEFAULT_COLORS, storageOptions: DEFAULT_STORAGE }
];

export const MODELS: MobileModel[] = INITIAL_MODELS;

export const EMI_TENURES = [
  { months: 12, label: '12 Months (1 Year)' },
  { months: 24, label: '24 Months (2 Years)' },
  { months: 36, label: '36 Months (3 Years)' },
  { months: 48, label: '48 Months (4 Years)' },
  { months: 60, label: '60 Months (5 Years)' }
];

export const PAKISTAN_BANKS: BankOption[] = [
  { id: 'hbl', name: 'Habib Bank Limited (HBL)', code: 'HBL' },
  { id: 'ubl', name: 'United Bank Limited (UBL)', code: 'UBL' },
  { id: 'mcb', name: 'MCB Bank Limited (MCB)', code: 'MCB' },
  { id: 'abl', name: 'Allied Bank Limited (ABL)', code: 'ABL' },
  { id: 'meezan', name: 'Meezan Bank Limited', code: 'MBL' },
  { id: 'alfalah', name: 'Bank Alfalah Limited', code: 'BAL' },
  { id: 'alhabib', name: 'Bank Al Habib Limited', code: 'BAHL' },
  { id: 'askari', name: 'Askari Bank Limited', code: 'AKBL' },
  { id: 'faysal', name: 'Faysal Bank Limited', code: 'FBL' },
  { id: 'habibmetro', name: 'Habib Metropolitan Bank Limited', code: 'HMB' },
  { id: 'jsbank', name: 'JS Bank Limited', code: 'JSB' },
  { id: 'soneri', name: 'Soneri Bank Limited', code: 'SBL' },
  { id: 'samba', name: 'Samba Bank Limited', code: 'SAMBA' },
  { id: 'scb', name: 'Standard Chartered Bank (Pakistan) Limited', code: 'SCB' },
  { id: 'makramah', name: 'Bank Makramah Limited', code: 'BML' },
  { id: 'fwbl', name: 'First Women Bank Limited', code: 'FWBL' },
  { id: 'nbp', name: 'National Bank of Pakistan', code: 'NBP' },
  { id: 'bop', name: 'The Bank of Punjab', code: 'BOP' },
  { id: 'sindh', name: 'Sindh Bank Limited', code: 'SBL' },
  { id: 'bok', name: 'The Bank of Khyber', code: 'BOK' },
  { id: 'ztbl', name: 'Zarai Taraqiati Bank Limited', code: 'ZTBL' },
  { id: 'ppcbl', name: 'Punjab Provincial Cooperative Bank Limited', code: 'PPCBL' },
  { id: 'raqami', name: 'Raqami Islamic Digital Bank Limited', code: 'RIDB' },
  { id: 'sadapay', name: 'Sadapay', code: 'SADA' },
  { id: 'nayapay', name: 'Nayapay', code: 'NAYA' }
];

export const MOBILE_WALLETS: WalletOption[] = [
  { id: 'easypaisa', name: 'Easypaisa', fee: '0%' },
  { id: 'upaisa', name: 'Upaisa', fee: '0%' },
  { id: 'ubl_omni', name: 'UBL Omni', fee: '0%' },
  { id: 'alfalah_wallet', name: 'Alfa Wallet', fee: '0%' }
];
