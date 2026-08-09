'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Search,
  ShieldAlert,
  ArrowLeft,
  Smartphone,
  Palette,
  Layers,
  Sparkles,
  Check,
  ChevronRight,
  Sliders,
  Image as ImageIcon,
  DollarSign,
  Tag
} from 'lucide-react';
import { useWizard } from '../../../context/WizardContext';
import { BRANDS, SERIES, MobileModel, ColorOption, StorageOption } from '../../../data/catalog';

const PRESET_COLORS: ColorOption[] = [
  { name: 'Titanium Black', hex: '#1e293b' },
  { name: 'Natural Silver', hex: '#cbd5e1' },
  { name: 'Cobalt Blue', hex: '#2563eb' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Deep Violet', hex: '#7c3aed' },
  { name: 'Rose Gold', hex: '#f43f5e' }
];

export default function DemonMaterialAdminPage() {
  const { modelsList, addModel, updateModel, deleteModel, resetCatalog } = useWizard();

  // Sidebar Drawer state for Mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'catalog' | 'colors' | 'variants' | 'brands'>('catalog');

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');
  const [selectedSeriesFilter, setSelectedSeriesFilter] = useState<string>('all');

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<MobileModel | null>(null);

  // Form Fields for Device Editing
  const [formData, setFormData] = useState<{
    id: string;
    brandId: string;
    seriesId: string;
    name: string;
    basePrice: number;
    image: string;
    specs: string;
    colors: ColorOption[];
    storageOptions: StorageOption[];
  }>({
    id: '',
    brandId: 'samsung',
    seriesId: 'samsung-a',
    name: '',
    basePrice: 50000,
    image: '/samsung.svg',
    specs: '8GB RAM, 256GB Storage, Official Warranty',
    colors: [...PRESET_COLORS.slice(0, 3)],
    storageOptions: [{ size: 'Standard Storage', priceDelta: 0 }]
  });

  // Temporary Color & Variant Inputs inside Modal
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#2563eb');
  const [newStorageSize, setNewStorageSize] = useState('');
  const [newPriceDelta, setNewPriceDelta] = useState<number>(0);

  const availableSeriesForFilter = selectedBrandFilter === 'all' 
    ? SERIES 
    : SERIES.filter((s) => s.brandId === selectedBrandFilter);

  const filteredModels = modelsList.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrandFilter === 'all' || m.brandId === selectedBrandFilter;
    const matchesSeries = selectedSeriesFilter === 'all' || m.seriesId === selectedSeriesFilter;
    return matchesSearch && matchesBrand && matchesSeries;
  });

  const handleOpenAddModal = () => {
    setEditingModel(null);
    setFormData({
      id: `dev-${Date.now()}`,
      brandId: 'samsung',
      seriesId: 'samsung-a',
      name: '',
      basePrice: 50000,
      image: '/samsung.svg',
      specs: '8GB RAM, 256GB Storage, Official Warranty',
      colors: [...PRESET_COLORS.slice(0, 3)],
      storageOptions: [{ size: 'Standard Storage', priceDelta: 0 }]
    });
    setIsModalOpen(true);
    setIsSidebarOpen(false);
  };

  const handleOpenEditModal = (model: MobileModel) => {
    setEditingModel(model);
    setFormData({
      id: model.id,
      brandId: model.brandId,
      seriesId: model.seriesId,
      name: model.name,
      basePrice: model.basePrice,
      image: model.image,
      specs: model.specs.join(', '),
      colors: model.colors && model.colors.length > 0 ? [...model.colors] : [...PRESET_COLORS.slice(0, 3)],
      storageOptions: model.storageOptions && model.storageOptions.length > 0 ? [...model.storageOptions] : [{ size: 'Standard Storage', priceDelta: 0 }]
    });
    setIsModalOpen(true);
  };

  const handleAddColorToForm = () => {
    if (!newColorName.trim()) return;
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: newColorName.trim(), hex: newColorHex }]
    }));
    setNewColorName('');
  };

  const handleRemoveColorFromForm = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const handleAddStorageToForm = () => {
    if (!newStorageSize.trim()) return;
    setFormData((prev) => ({
      ...prev,
      storageOptions: [...prev.storageOptions, { size: newStorageSize.trim(), priceDelta: Number(newPriceDelta) || 0 }]
    }));
    setNewStorageSize('');
    setNewPriceDelta(0);
  };

  const handleRemoveStorageFromForm = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      storageOptions: prev.storageOptions.filter((_, i) => i !== index)
    }));
  };

  const handleSaveModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const specsArray = formData.specs.split(',').map((s) => s.trim()).filter(Boolean);

    const modelObj: MobileModel = {
      id: formData.id || `dev-${Date.now()}`,
      brandId: formData.brandId,
      seriesId: formData.seriesId,
      name: formData.name,
      basePrice: Number(formData.basePrice),
      image: formData.image || '/samsung.svg',
      specs: specsArray.length > 0 ? specsArray : ['Official Warranty'],
      colors: formData.colors.length > 0 ? formData.colors : PRESET_COLORS.slice(0, 2),
      storageOptions: formData.storageOptions.length > 0 ? formData.storageOptions : [{ size: 'Standard Storage', priceDelta: 0 }]
    };

    if (editingModel) {
      updateModel(modelObj);
    } else {
      addModel(modelObj);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from store catalog?`)) {
      deleteModel(id);
    }
  };

  const handleReset = () => {
    if (confirm('Reset entire catalog back to official factory defaults?')) {
      resetCatalog();
    }
  };

  return (
    <div className="mui-admin-wrapper">
      {/* Top App Bar (Material UI Header) */}
      <header className="mui-app-bar">
        <div className="mui-app-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="mui-icon-button mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} color="#ffffff" />
            </button>

            <Link href="/" className="mui-logo-link">
              <Smartphone size={24} color="#6366f1" />
              <span className="mui-logo-text">Alfa Admin <span className="mui-badge">MUI PRO</span></span>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="mui-button mui-button-primary desktop-only"
            >
              <Plus size={16} /> Add Device
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="mui-button mui-button-outlined"
              title="Reset Catalog"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div className="mui-drawer-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar Drawer */}
      <aside className={`mui-drawer ${isSidebarOpen ? 'open' : ''}`}>
        <div className="mui-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={20} color="#ef4444" />
            <span style={{ fontWeight: 800, fontSize: '15px', color: '#ffffff' }}>Admin Console</span>
          </div>
          <button type="button" className="mui-icon-button" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} color="#94a3b8" />
          </button>
        </div>

        <nav className="mui-drawer-nav">
          <button
            type="button"
            className={`mui-nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => { setActiveTab('catalog'); setIsSidebarOpen(false); }}
          >
            <Smartphone size={18} />
            <span>Device Catalog</span>
            <span className="mui-chip-count">{modelsList.length}</span>
          </button>

          <button
            type="button"
            className={`mui-nav-item ${activeTab === 'colors' ? 'active' : ''}`}
            onClick={() => { setActiveTab('colors'); setIsSidebarOpen(false); }}
          >
            <Palette size={18} />
            <span>Color Swatches</span>
          </button>

          <button
            type="button"
            className={`mui-nav-item ${activeTab === 'variants' ? 'active' : ''}`}
            onClick={() => { setActiveTab('variants'); setIsSidebarOpen(false); }}
          >
            <Layers size={18} />
            <span>Storage Variants</span>
          </button>

          <button
            type="button"
            className={`mui-nav-item ${activeTab === 'brands' ? 'active' : ''}`}
            onClick={() => { setActiveTab('brands'); setIsSidebarOpen(false); }}
          >
            <Sliders size={18} />
            <span>Brands ({BRANDS.length})</span>
          </button>
        </nav>

        <div className="mui-drawer-footer">
          <button type="button" onClick={handleOpenAddModal} className="mui-button mui-button-primary full-width">
            <Plus size={18} /> Create New Device
          </button>

          <Link href="/" className="mui-link-button">
            <ArrowLeft size={16} /> Return to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content Layout */}
      <main className="mui-main-content">

        {/* Action Hero Header */}
        <div className="mui-hero-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 className="mui-hero-title">
                {activeTab === 'catalog' && 'Mobile Device Catalog'}
                {activeTab === 'colors' && 'Color Swatch Manager'}
                {activeTab === 'variants' && 'Storage & RAM Variant Manager'}
                {activeTab === 'brands' && 'Brand & Series System'}
              </h1>
              <p className="mui-hero-subtitle">
                Manage mobile devices, color variations, storage price deltas & image URLs in real time.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={handleOpenAddModal} className="mui-button mui-button-primary">
                <Plus size={16} /> Add Device
              </button>
            </div>
          </div>

          {/* Material Search & Filter Row */}
          <div className="mui-search-row">
            <div className="mui-search-field">
              <Search size={18} color="#94a3b8" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search device name, brand or model..."
              />
              {searchTerm && <X size={16} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setSearchTerm('')} />}
            </div>

            <div className="mui-filter-group">
              <select
                value={selectedBrandFilter}
                onChange={(e) => {
                  setSelectedBrandFilter(e.target.value);
                  setSelectedSeriesFilter('all');
                }}
                className="mui-select"
              >
                <option value="all">All Brands</option>
                {BRANDS.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>

              <select
                value={selectedSeriesFilter}
                onChange={(e) => setSelectedSeriesFilter(e.target.value)}
                className="mui-select"
              >
                <option value="all">All Series</option>
                {availableSeriesForFilter.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Brand Filter Pills */}
          <div className="mui-pills-row">
            <button
              type="button"
              className={`mui-pill ${selectedBrandFilter === 'all' ? 'active' : ''}`}
              onClick={() => { setSelectedBrandFilter('all'); setSelectedSeriesFilter('all'); }}
            >
              All ({modelsList.length})
            </button>
            {BRANDS.map((b) => {
              const count = modelsList.filter((m) => m.brandId === b.id).length;
              return (
                <button
                  key={b.id}
                  type="button"
                  className={`mui-pill ${selectedBrandFilter === b.id ? 'active' : ''}`}
                  onClick={() => { setSelectedBrandFilter(b.id); setSelectedSeriesFilter('all'); }}
                >
                  {b.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Grid View */}
        {filteredModels.length > 0 ? (
          <div className="mui-grid">
            {filteredModels.map((model) => {
              const brand = BRANDS.find((b) => b.id === model.brandId);
              const series = SERIES.find((s) => s.id === model.seriesId);
              const monthly = Math.round(model.basePrice / 24);

              return (
                <div key={model.id} className="mui-card">
                  <div className="mui-card-top">
                    <div className="mui-device-img-container">
                      <img src={model.image} alt={model.name} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="mui-brand-tag">{brand?.name} • {series?.name}</div>
                      <h3 className="mui-device-name">{model.name}</h3>
                      <div className="mui-specs-text">{model.specs.join(' • ')}</div>
                    </div>
                  </div>

                  {/* Colors Swatches Bar */}
                  <div className="mui-swatch-strip">
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Colors:</span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      {model.colors && model.colors.length > 0 ? (
                        model.colors.map((c, i) => (
                          <span
                            key={i}
                            className="mui-dot"
                            style={{ backgroundColor: c.hex }}
                            title={`${c.name} (${c.hex})`}
                          />
                        ))
                      ) : (
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Default Swatches</span>
                      )}
                    </div>
                  </div>

                  {/* Pricing Box */}
                  <div className="mui-price-box">
                    <div>
                      <div className="mui-price-label">Cash Price</div>
                      <div className="mui-cash-price">Rs. {model.basePrice.toLocaleString('en-PK')}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="mui-price-label">24-Mo EMI</div>
                      <div className="mui-emi-price">Rs. {monthly.toLocaleString('en-PK')}/mo</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mui-card-actions">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(model)}
                      className="mui-action-btn edit"
                    >
                      <Edit3 size={14} /> Edit & Variants
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(model.id, model.name)}
                      className="mui-action-btn delete"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mui-empty-card">
            <Smartphone size={40} color="#64748b" />
            <p>No devices match your search query or brand selection.</p>
            <button type="button" onClick={handleOpenAddModal} className="mui-button mui-button-primary">
              <Plus size={16} /> Add First Device
            </button>
          </div>
        )}

      </main>

      {/* Floating Action Button (FAB) for Mobile */}
      <button
        type="button"
        className="mui-fab mobile-only"
        onClick={handleOpenAddModal}
        aria-label="Add Device"
      >
        <Plus size={24} color="#ffffff" />
      </button>

      {/* Full-Screen Professional Edit / Variant Builder Modal */}
      {isModalOpen && (
        <div className="mui-modal-backdrop">
          <div className="mui-modal-card">
            <div className="mui-modal-header">
              <div>
                <h2 className="mui-modal-title">
                  {editingModel ? `Edit ${editingModel.name}` : 'Add New Mobile Device'}
                </h2>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                  Customize specs, colors, storage variants, image source & prices.
                </p>
              </div>
              <button type="button" className="mui-icon-button" onClick={() => setIsModalOpen(false)}>
                <X size={20} color="#94a3b8" />
              </button>
            </div>

            <form onSubmit={handleSaveModel} className="mui-modal-body">
              {/* Basic Device Specs */}
              <div className="mui-form-grid">
                <div>
                  <label className="mui-form-label">Brand *</label>
                  <select
                    value={formData.brandId}
                    onChange={(e) => {
                      const bId = e.target.value;
                      const availSeries = SERIES.filter((s) => s.brandId === bId);
                      const brandObj = BRANDS.find((b) => b.id === bId);
                      setFormData({
                        ...formData,
                        brandId: bId,
                        seriesId: availSeries[0]?.id || '',
                        image: brandObj?.logoUrl || '/samsung.svg'
                      });
                    }}
                    className="mui-input"
                  >
                    {BRANDS.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mui-form-label">Series *</label>
                  <select
                    value={formData.seriesId}
                    onChange={(e) => setFormData({ ...formData, seriesId: e.target.value })}
                    className="mui-input"
                  >
                    {SERIES.filter((s) => s.brandId === formData.brandId).map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mui-form-label">Device Model Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. S-25 Ultra 12/512 or iPhone 17 Pro"
                  className="mui-input"
                />
              </div>

              <div className="mui-form-grid">
                <div>
                  <label className="mui-form-label">Base Cash Price in PKR *</label>
                  <input
                    type="number"
                    required
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    placeholder="e.g. 128000"
                    className="mui-input"
                  />
                </div>

                <div>
                  <label className="mui-form-label">Image Source / Logo URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/samsung.svg or /apple.png"
                    className="mui-input"
                  />
                </div>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="mui-img-preview-box">
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Image Preview:</span>
                  <img src={formData.image} alt="Preview" style={{ height: '36px', objectFit: 'contain' }} />
                </div>
              )}

              <div>
                <label className="mui-form-label">Specs Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  placeholder="8GB RAM, 256GB Storage, Official Warranty"
                  className="mui-input"
                />
              </div>

              {/* COLOR VARIATIONS MANAGER */}
              <div className="mui-section-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Palette size={18} color="#818cf8" />
                  <span style={{ fontWeight: 800, fontSize: '14px', color: '#ffffff' }}>Color Variations</span>
                </div>

                <div className="mui-chips-wrap">
                  {formData.colors.map((c, idx) => (
                    <div key={idx} className="mui-color-chip">
                      <span className="mui-dot" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                      <X size={14} style={{ cursor: 'pointer' }} onClick={() => handleRemoveColorFromForm(idx)} />
                    </div>
                  ))}
                </div>

                <div className="mui-add-row" style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Color Name (e.g. Cobalt Blue)"
                    className="mui-input flex-1"
                  />
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    style={{ width: '42px', height: '42px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  />
                  <button type="button" onClick={handleAddColorToForm} className="mui-button mui-button-outlined">
                    + Add Color
                  </button>
                </div>
              </div>

              {/* STORAGE & RAM VARIANTS MANAGER */}
              <div className="mui-section-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Layers size={18} color="#34d399" />
                  <span style={{ fontWeight: 800, fontSize: '14px', color: '#ffffff' }}>Storage Variants & Price Deltas</span>
                </div>

                <div className="mui-chips-wrap">
                  {formData.storageOptions.map((st, idx) => (
                    <div key={idx} className="mui-storage-chip">
                      <span>{st.size}</span>
                      <span className="delta">
                        {st.priceDelta > 0 ? `(+Rs. ${st.priceDelta.toLocaleString('en-PK')})` : '(Base Price)'}
                      </span>
                      <X size={14} style={{ cursor: 'pointer' }} onClick={() => handleRemoveStorageFromForm(idx)} />
                    </div>
                  ))}
                </div>

                <div className="mui-add-row" style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    value={newStorageSize}
                    onChange={(e) => setNewStorageSize(e.target.value)}
                    placeholder="Variant (e.g. 12/512GB)"
                    className="mui-input flex-1"
                  />
                  <input
                    type="number"
                    value={newPriceDelta}
                    onChange={(e) => setNewPriceDelta(Number(e.target.value))}
                    placeholder="+Price Delta"
                    className="mui-input"
                    style={{ width: '110px' }}
                  />
                  <button type="button" onClick={handleAddStorageToForm} className="mui-button mui-button-outlined">
                    + Add Variant
                  </button>
                </div>
              </div>

              <div className="mui-modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="mui-button mui-button-outlined">
                  Cancel
                </button>
                <button type="submit" className="mui-button mui-button-primary">
                  {editingModel ? 'Save Changes' : 'Create Device'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Embedded Material UI Stylesheet */}
      <style jsx global>{`
        .mui-admin-wrapper {
          min-height: 100vh;
          background-color: #0b0f19;
          color: #f1f5f9;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .mui-app-bar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mui-app-bar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mui-logo-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #ffffff;
          font-weight: 900;
          font-size: 18px;
        }

        .mui-badge {
          background: #6366f1;
          color: #ffffff;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          margin-left: 4px;
        }

        .mui-icon-button {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mui-icon-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mui-button {
          border: none;
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .mui-button-primary {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
        }

        .mui-button-outlined {
          background: rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        /* Sidebar Drawer */
        .mui-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 200;
        }

        .mui-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          background: #0f172a;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 300;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .mui-drawer.open {
          transform: translateX(0);
        }

        .mui-drawer-header {
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mui-drawer-nav {
          padding: 16px 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .mui-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 10px;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          text-align: left;
        }
        .mui-nav-item.active, .mui-nav-item:hover {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }

        .mui-chip-count {
          margin-left: auto;
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
        }

        .mui-drawer-footer {
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mui-link-button {
          color: #94a3b8;
          text-decoration: none;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
          justify-content: center;
          padding: 8px;
        }

        /* Main Content */
        .mui-main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 16px 80px 16px;
        }

        .mui-hero-card {
          background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .mui-hero-title {
          font-size: 24px;
          font-weight: 900;
          margin: 0 0 4px 0;
          color: #ffffff;
        }

        .mui-hero-subtitle {
          fontSize: 13px;
          color: #a5b4fc;
          margin: 0;
        }

        .mui-search-row {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .mui-search-field {
          flex: 1;
          min-width: 260px;
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 0 12px;
        }
        .mui-search-field input {
          width: 100%;
          background: transparent;
          border: none;
          color: #ffffff;
          padding: 12px;
          outline: none;
          font-size: 14px;
        }

        .mui-filter-group {
          display: flex;
          gap: 8px;
        }

        .mui-select {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 10px 14px;
          color: #ffffff;
          font-size: 13px;
          outline: none;
        }
        .mui-select option {
          background: #0f172a;
        }

        .mui-pills-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          margin-top: 16px;
          padding-bottom: 4px;
        }

        .mui-pill {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .mui-pill.active {
          background: #6366f1;
          color: #ffffff;
          border-color: #6366f1;
        }

        /* Grid Cards */
        .mui-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        .mui-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mui-card-top {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .mui-device-img-container {
          width: 50px;
          height: 50px;
          background: #ffffff;
          border-radius: 12px;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mui-device-img-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .mui-brand-tag {
          font-size: 11px;
          color: #818cf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .mui-device-name {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
          margin: 2px 0;
        }

        .mui-specs-text {
          font-size: 11px;
          color: #94a3b8;
        }

        .mui-swatch-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.2);
          padding: 8px 12px;
          border-radius: 8px;
        }

        .mui-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .mui-price-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.35);
          padding: 10px 14px;
          border-radius: 10px;
        }

        .mui-price-label {
          font-size: 10px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 700;
        }

        .mui-cash-price {
          font-size: 15px;
          font-weight: 900;
          color: #f43f5e;
        }

        .mui-emi-price {
          font-size: 13px;
          font-weight: 700;
          color: #38bdf8;
        }

        .mui-card-actions {
          display: flex;
          gap: 8px;
        }

        .mui-action-btn {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .mui-action-btn.edit {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }
        .mui-action-btn.delete {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
        }

        .mui-empty-card {
          padding: 60px;
          text-align: center;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        /* FAB Mobile */
        .mui-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          border: none;
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 150;
        }

        /* Modal Drawer */
        .mui-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 400;
        }

        .mui-modal-card {
          background: #0f172a;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          max-width: 600px;
          width: 100%;
          max-height: 92vh;
          overflow-y: auto;
          padding: 24px;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.6);
        }

        .mui-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .mui-modal-title {
          font-size: 20px;
          font-weight: 900;
          color: #ffffff;
          margin: 0;
        }

        .mui-modal-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mui-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .mui-form-label {
          font-size: 12px;
          font-weight: 700;
          color: #94a3b8;
          margin-bottom: 4px;
          display: block;
        }

        .mui-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 12px;
          color: #ffffff;
          font-size: 14px;
          outline: none;
        }

        .mui-section-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px;
        }

        .mui-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .mui-color-chip, .mui-storage-chip {
          background: rgba(255, 255, 255, 0.08);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .mui-storage-chip .delta {
          color: #34d399;
          font-weight: 700;
        }

        .mui-add-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .mui-img-preview-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.04);
          padding: 8px 12px;
          border-radius: 8px;
        }

        .mui-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
        }

        .full-width {
          width: 100%;
          justify-content: center;
        }

        .desktop-only {
          display: inline-flex;
        }
        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
          .mui-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
