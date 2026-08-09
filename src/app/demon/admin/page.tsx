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
  Check,
  ChevronRight,
  Sliders,
  Image as ImageIcon,
  DollarSign,
  Tag,
  LayoutGrid,
  List
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

export default function DemonResponsiveAdminPage() {
  const { modelsList, addModel, updateModel, deleteModel, resetCatalog } = useWizard();

  // Navigation Sidebar state (mobile drawer)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'catalog' | 'colors' | 'variants' | 'brands'>('catalog');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');
  const [selectedSeriesFilter, setSelectedSeriesFilter] = useState<string>('all');

  // View Mode: grid vs table on desktop
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<MobileModel | null>(null);

  // Form State
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

  // Modal Temp Variant Inputs
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
    <div className="admin-root-container">
      
      {/* Permanent Desktop Sidebar + Mobile Backdrop Drawer */}
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`admin-sidebar ${isSidebarOpen ? 'drawer-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <Smartphone size={24} color="#6366f1" />
            <span>Alfa Mobiles</span>
          </div>
          <button type="button" className="icon-btn mobile-only-inline" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} color="#94a3b8" />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            type="button"
            className={`nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => { setActiveTab('catalog'); setIsSidebarOpen(false); }}
          >
            <Smartphone size={18} />
            <span>Device Catalog</span>
            <span className="count-badge">{modelsList.length}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'colors' ? 'active' : ''}`}
            onClick={() => { setActiveTab('colors'); setIsSidebarOpen(false); }}
          >
            <Palette size={18} />
            <span>Color Swatches</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'variants' ? 'active' : ''}`}
            onClick={() => { setActiveTab('variants'); setIsSidebarOpen(false); }}
          >
            <Layers size={18} />
            <span>Storage Variants</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'brands' ? 'active' : ''}`}
            onClick={() => { setActiveTab('brands'); setIsSidebarOpen(false); }}
          >
            <Sliders size={18} />
            <span>Brands & Series</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button type="button" onClick={handleOpenAddModal} className="btn btn-primary full-width">
            <Plus size={18} /> Add New Device
          </button>

          <Link href="/" className="back-store-link">
            <ArrowLeft size={16} /> Return to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrapper">
        
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left">
            <button
              type="button"
              className="icon-btn lg-hidden"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Sidebar Menu"
            >
              <Menu size={22} color="#ffffff" />
            </button>
            <h2 className="header-title">Admin Dashboard</h2>
          </div>

          <div className="header-right">
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="btn btn-primary sm-hidden"
            >
              <Plus size={16} /> Add Device
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
              title="Reset Catalog"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </header>

        {/* Inner Responsive Dashboard Workspace */}
        <div className="dashboard-content">
          
          {/* Overview Hero Card */}
          <div className="hero-card">
            <div className="hero-card-header">
              <div>
                <h1 className="hero-title">
                  {activeTab === 'catalog' && 'Mobile Device Catalog'}
                  {activeTab === 'colors' && 'Color Variations Manager'}
                  {activeTab === 'variants' && 'Storage & RAM Variant Manager'}
                  {activeTab === 'brands' && 'Brand & Series Structure'}
                </h1>
                <p className="hero-desc">
                  Manage devices, color swatches, RAM/storage variants & PKR prices in real time.
                </p>
              </div>

              <div className="hero-actions">
                <button type="button" onClick={handleOpenAddModal} className="btn btn-primary">
                  <Plus size={16} /> Add Device
                </button>
              </div>
            </div>

            {/* Responsive Search & Filters */}
            <div className="filters-container">
              <div className="search-input-wrapper">
                <Search size={18} color="#94a3b8" className="search-icon" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search device name..."
                  className="search-input"
                />
                {searchTerm && (
                  <X size={16} color="#94a3b8" className="clear-icon" onClick={() => setSearchTerm('')} />
                )}
              </div>

              <div className="select-filters-group">
                <select
                  value={selectedBrandFilter}
                  onChange={(e) => {
                    setSelectedBrandFilter(e.target.value);
                    setSelectedSeriesFilter('all');
                  }}
                  className="custom-select"
                >
                  <option value="all">All Brands ({BRANDS.length})</option>
                  {BRANDS.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>

                <select
                  value={selectedSeriesFilter}
                  onChange={(e) => setSelectedSeriesFilter(e.target.value)}
                  className="custom-select"
                >
                  <option value="all">All Series</option>
                  {availableSeriesForFilter.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>

                <div className="view-toggle-group sm-hidden">
                  <button
                    type="button"
                    className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                    onClick={() => setViewMode('table')}
                    title="Table View"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Brand Pills (Scrollable) */}
            <div className="brand-pills-row">
              <button
                type="button"
                className={`brand-pill ${selectedBrandFilter === 'all' ? 'active' : ''}`}
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
                    className={`brand-pill ${selectedBrandFilter === b.id ? 'active' : ''}`}
                    onClick={() => { setSelectedBrandFilter(b.id); setSelectedSeriesFilter('all'); }}
                  >
                    {b.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* DEVICE CATALOG DISPLAY */}
          {filteredModels.length > 0 ? (
            <div>
              {/* Desktop Table View (visible on lg screens when viewMode === 'table') */}
              {viewMode === 'table' && (
                <div className="desktop-table-container lg-only-block">
                  <table className="desktop-table">
                    <thead>
                      <tr>
                        <th>Device</th>
                        <th>Brand / Series</th>
                        <th>Colors</th>
                        <th>Cash Price</th>
                        <th>24-Mo EMI</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredModels.map((model) => {
                        const brand = BRANDS.find((b) => b.id === model.brandId);
                        const series = SERIES.find((s) => s.id === model.seriesId);
                        const monthly = Math.round(model.basePrice / 24);

                        return (
                          <tr key={model.id}>
                            <td>
                              <div className="table-device-cell">
                                <img src={model.image} alt={model.name} />
                                <div>
                                  <div className="table-device-name">{model.name}</div>
                                  <div className="table-device-specs">{model.specs.join(' • ')}</div>
                                </div>
                              </div>
                            </td>

                            <td className="table-text-cell">
                              <div>{brand?.name}</div>
                              <div className="sub-text">{series?.name}</div>
                            </td>

                            <td>
                              <div className="swatches-dot-row">
                                {model.colors && model.colors.map((c, i) => (
                                  <span key={i} className="color-dot" style={{ backgroundColor: c.hex }} title={c.name} />
                                ))}
                              </div>
                            </td>

                            <td className="table-price-cell">
                              Rs. {model.basePrice.toLocaleString('en-PK')}
                            </td>

                            <td className="table-emi-cell">
                              Rs. {monthly.toLocaleString('en-PK')}/mo
                            </td>

                            <td style={{ textAlign: 'right' }}>
                              <div className="table-actions-row">
                                <button type="button" onClick={() => handleOpenEditModal(model)} className="btn-action edit">
                                  <Edit3 size={14} /> Edit
                                </button>
                                <button type="button" onClick={() => handleDelete(model.id, model.name)} className="btn-action delete">
                                  <Trash2 size={14} /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Responsive Cards Grid Layout:
                  - Mobile (<640px): STRICTLY 1 ITEM PER ROW (grid-cols-1)
                  - Tablet (640px-1023px): 2 ITEMS PER ROW (sm:grid-cols-2)
                  - Desktop (1024px+): 3-4 ITEMS PER ROW (lg:grid-cols-3 xl:grid-cols-4)
              */}
              {(viewMode === 'grid' || true) && (
                <div className={`responsive-cards-grid ${viewMode === 'table' ? 'lg-hidden-grid' : ''}`}>
                  {filteredModels.map((model) => {
                    const brand = BRANDS.find((b) => b.id === model.brandId);
                    const series = SERIES.find((s) => s.id === model.seriesId);
                    const monthly = Math.round(model.basePrice / 24);

                    return (
                      <div key={model.id} className="device-card-item">
                        <div className="card-header-row">
                          <div className="card-img-box">
                            <img src={model.image} alt={model.name} />
                          </div>
                          <div className="card-header-meta">
                            <span className="card-brand-badge">{brand?.name} • {series?.name}</span>
                            <h3 className="card-device-title">{model.name}</h3>
                            <div className="card-specs-text">{model.specs.join(' • ')}</div>
                          </div>
                        </div>

                        {/* Color Swatches Bar */}
                        <div className="card-swatches-strip">
                          <span className="strip-label">Swatches:</span>
                          <div className="dots-flex">
                            {model.colors && model.colors.length > 0 ? (
                              model.colors.map((c, i) => (
                                <span
                                  key={i}
                                  className="color-dot"
                                  style={{ backgroundColor: c.hex }}
                                  title={`${c.name} (${c.hex})`}
                                />
                              ))
                            ) : (
                              <span className="no-swatches">Standard</span>
                            )}
                          </div>
                        </div>

                        {/* Price Box */}
                        <div className="card-price-box">
                          <div>
                            <div className="price-label">Cash Price</div>
                            <div className="cash-price-val">Rs. {model.basePrice.toLocaleString('en-PK')}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div className="price-label">24-Mo EMI</div>
                            <div className="emi-price-val">Rs. {monthly.toLocaleString('en-PK')}/mo</div>
                          </div>
                        </div>

                        {/* Card Touch Actions */}
                        <div className="card-actions-grid">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(model)}
                            className="btn-card-action edit"
                          >
                            <Edit3 size={15} /> Edit & Variants
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(model.id, model.name)}
                            className="btn-card-action delete"
                          >
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="empty-state-card">
              <Smartphone size={44} color="#64748b" />
              <p>No devices found matching your criteria.</p>
              <button type="button" onClick={handleOpenAddModal} className="btn btn-primary">
                <Plus size={16} /> Add First Device
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button (FAB) for Mobile */}
      <button
        type="button"
        className="mobile-fab"
        onClick={handleOpenAddModal}
        aria-label="Add Device"
      >
        <Plus size={24} color="#ffffff" />
      </button>

      {/* Full-Screen Responsive Modal / Drawer */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <div>
                <h2 className="modal-title">
                  {editingModel ? `Edit ${editingModel.name}` : 'Add New Mobile Device'}
                </h2>
                <p className="modal-subtitle">
                  Configure specs, colors, storage variants, image source & prices.
                </p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} color="#94a3b8" />
              </button>
            </div>

            <form onSubmit={handleSaveModel} className="modal-body">
              {/* Brand & Series Selection */}
              <div className="form-responsive-grid">
                <div>
                  <label className="field-label">Brand *</label>
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
                    className="form-control"
                  >
                    {BRANDS.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="field-label">Series *</label>
                  <select
                    value={formData.seriesId}
                    onChange={(e) => setFormData({ ...formData, seriesId: e.target.value })}
                    className="form-control"
                  >
                    {SERIES.filter((s) => s.brandId === formData.brandId).map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="field-label">Device Model Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. S-25 Ultra 12/512 or iPhone 17 Pro"
                  className="form-control"
                />
              </div>

              <div className="form-responsive-grid">
                <div>
                  <label className="field-label">Base Cash Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    placeholder="e.g. 128000"
                    className="form-control"
                  />
                </div>

                <div>
                  <label className="field-label">Image Source / Logo URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/samsung.svg or /apple.png"
                    className="form-control"
                  />
                </div>
              </div>

              {/* Image Preview Box */}
              {formData.image && (
                <div className="img-preview-box">
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Preview:</span>
                  <img src={formData.image} alt="Preview" style={{ height: '34px', objectFit: 'contain' }} />
                </div>
              )}

              <div>
                <label className="field-label">Specs Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  placeholder="8GB RAM, 256GB Storage, Official Warranty"
                  className="form-control"
                />
              </div>

              {/* COLOR VARIATIONS MANAGER */}
              <div className="variant-section-box">
                <div className="section-title-row">
                  <Palette size={18} color="#818cf8" />
                  <span>Color Variations</span>
                </div>

                <div className="chips-flex-wrap">
                  {formData.colors.map((c, idx) => (
                    <div key={idx} className="variant-chip">
                      <span className="color-dot" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                      <X size={14} style={{ cursor: 'pointer' }} onClick={() => handleRemoveColorFromForm(idx)} />
                    </div>
                  ))}
                </div>

                <div className="add-variant-row">
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Color Name (e.g. Cobalt Blue)"
                    className="form-control flex-1"
                  />
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="color-picker-input"
                  />
                  <button type="button" onClick={handleAddColorToForm} className="btn btn-secondary">
                    + Add Color
                  </button>
                </div>
              </div>

              {/* STORAGE & RAM VARIANTS MANAGER */}
              <div className="variant-section-box">
                <div className="section-title-row">
                  <Layers size={18} color="#34d399" />
                  <span>Storage Variants & Price Deltas</span>
                </div>

                <div className="chips-flex-wrap">
                  {formData.storageOptions.map((st, idx) => (
                    <div key={idx} className="variant-chip">
                      <span>{st.size}</span>
                      <span className="delta-text">
                        {st.priceDelta > 0 ? `(+Rs. ${st.priceDelta.toLocaleString('en-PK')})` : '(Base Price)'}
                      </span>
                      <X size={14} style={{ cursor: 'pointer' }} onClick={() => handleRemoveStorageFromForm(idx)} />
                    </div>
                  ))}
                </div>

                <div className="add-variant-row">
                  <input
                    type="text"
                    value={newStorageSize}
                    onChange={(e) => setNewStorageSize(e.target.value)}
                    placeholder="Variant (e.g. 12/512GB)"
                    className="form-control flex-1"
                  />
                  <input
                    type="number"
                    value={newPriceDelta}
                    onChange={(e) => setNewPriceDelta(Number(e.target.value))}
                    placeholder="+Price Delta"
                    className="form-control delta-input"
                  />
                  <button type="button" onClick={handleAddStorageToForm} className="btn btn-secondary">
                    + Add Variant
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingModel ? 'Save Changes' : 'Create Device'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global CSS for Strict Responsive Mobile Layout (1 Item per Row on Mobile) */}
      <style jsx global>{`
        /* Base Admin Layout */
        .admin-root-container {
          display: flex;
          min-height: 100vh;
          background-color: #0b0f19;
          color: #f1f5f9;
          font-family: system-ui, -apple-system, sans-serif;
          overflow-x: hidden;
        }

        /* Desktop Permanent Sidebar */
        .admin-sidebar {
          width: 260px;
          background: #0f172a;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-header {
          padding: 20px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 900;
          color: #ffffff;
        }

        .sidebar-nav {
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: all 0.2s ease;
        }
        .nav-item.active, .nav-item:hover {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }

        .count-badge {
          margin-left: auto;
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .back-store-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
          justify-content: center;
          padding: 6px;
        }

        /* Main Wrapper */
        .admin-main-wrapper {
          flex: 1;
          margin-left: 260px;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .admin-header {
          position: sticky;
          top: 0;
          z-index: 90;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-title {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dashboard-content {
          padding: 24px;
          max-width: 1300px;
          width: 100%;
          margin: 0 auto;
        }

        /* Hero Card */
        .hero-card {
          background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .hero-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .hero-title {
          font-size: 24px;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 4px 0;
        }

        .hero-desc {
          font-size: 13px;
          color: #a5b4fc;
          margin: 0;
        }

        /* Filter Controls */
        .filters-container {
          display: flex;
          gap: 12px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          flex: 1;
          min-width: 240px;
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 0 12px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
        }

        .search-input {
          width: 100%;
          background: transparent;
          border: none;
          color: #ffffff;
          padding: 12px 12px 12px 32px;
          outline: none;
          font-size: 14px;
        }

        .clear-icon {
          position: absolute;
          right: 12px;
        }

        .select-filters-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .custom-select {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 10px 14px;
          color: #ffffff;
          font-size: 13px;
          outline: none;
        }
        .custom-select option {
          background: #0f172a;
        }

        .view-toggle-group {
          display: flex;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 2px;
        }

        .toggle-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          padding: 8px 12px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .toggle-btn.active {
          background: #6366f1;
          color: #ffffff;
        }

        .brand-pills-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          margin-top: 16px;
          padding-bottom: 4px;
          scrollbar-width: none;
        }

        .brand-pill {
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
        .brand-pill.active {
          background: #6366f1;
          color: #ffffff;
          border-color: #6366f1;
        }

        /* STRICT RESPONSIVE CARDS GRID:
           - Mobile (< 640px): 1 ITEM PER ROW (grid-template-columns: 1fr)
           - Tablet (640px - 1023px): 2 ITEMS PER ROW
           - Desktop (1024px+): 3 ITEMS PER ROW
           - Large Desktop (1280px+): 4 ITEMS PER ROW
        */
        .responsive-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          width: 100%;
        }

        @media (min-width: 640px) {
          .responsive-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .responsive-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .responsive-cards-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Card Styling */
        .device-card-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          min-width: 0;
        }

        .card-header-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .card-img-box {
          width: 48px;
          height: 48px;
          background: #ffffff;
          border-radius: 12px;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .card-img-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .card-header-meta {
          flex: 1;
          min-width: 0;
        }

        .card-brand-badge {
          font-size: 11px;
          color: #818cf8;
          font-weight: 700;
          text-transform: uppercase;
        }

        .card-device-title {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
          margin: 2px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-specs-text {
          font-size: 11px;
          color: #94a3b8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-swatches-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.25);
          padding: 8px 12px;
          border-radius: 8px;
        }

        .strip-label {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 600;
        }

        .dots-flex {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .color-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .no-swatches {
          font-size: 11px;
          color: #64748b;
        }

        .card-price-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.35);
          padding: 10px 14px;
          border-radius: 10px;
        }

        .price-label {
          font-size: 10px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 700;
        }

        .cash-price-val {
          font-size: 15px;
          font-weight: 900;
          color: #f43f5e;
        }

        .emi-price-val {
          font-size: 13px;
          font-weight: 700;
          color: #38bdf8;
        }

        .card-actions-grid {
          display: flex;
          gap: 8px;
        }

        .btn-card-action {
          flex: 1;
          padding: 10px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-card-action.edit {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }
        .btn-card-action.delete {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
        }

        /* Table view styling for desktop */
        .desktop-table-container {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow-x: auto;
          margin-bottom: 24px;
        }

        .desktop-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .desktop-table th {
          background: rgba(0, 0, 0, 0.3);
          padding: 14px 16px;
          color: #94a3b8;
          font-size: 12px;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .desktop-table td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .table-device-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .table-device-cell img {
          width: 36px;
          height: 36px;
          object-fit: contain;
          background: #ffffff;
          border-radius: 8px;
          padding: 2px;
        }

        .table-device-name {
          font-weight: 800;
          color: #ffffff;
        }

        .table-device-specs {
          font-size: 11px;
          color: #64748b;
        }

        .table-text-cell {
          color: #cbd5e1;
          font-weight: 600;
        }

        .table-text-cell .sub-text {
          font-size: 12px;
          color: #64748b;
        }

        .table-price-cell {
          font-weight: 800;
          color: #f43f5e;
        }

        .table-emi-cell {
          font-weight: 700;
          color: #38bdf8;
        }

        .table-actions-row {
          display: flex;
          justify-content: flex-end;
          gap: 6px;
        }

        .btn-action {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .btn-action.edit {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }
        .btn-action.delete {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
        }

        /* Buttons & Controls */
        .btn {
          border: none;
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .icon-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .full-width {
          width: 100%;
        }

        /* Mobile FAB */
        .mobile-fab {
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

        /* Modal Drawer Layout */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 400;
        }

        .modal-container {
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

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 900;
          color: #ffffff;
          margin: 0;
        }

        .modal-subtitle {
          font-size: 12px;
          color: #94a3b8;
          margin: 4px 0 0 0;
        }

        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-responsive-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 640px) {
          .form-responsive-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .field-label {
          font-size: 12px;
          font-weight: 700;
          color: #94a3b8;
          margin-bottom: 4px;
          display: block;
        }

        .form-control {
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 12px;
          color: #ffffff;
          font-size: 14px;
          outline: none;
        }

        .img-preview-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.04);
          padding: 8px 12px;
          border-radius: 8px;
        }

        .variant-section-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px;
        }

        .section-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 14px;
          color: #ffffff;
        }

        .chips-flex-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .variant-chip {
          background: rgba(255, 255, 255, 0.08);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .delta-text {
          color: #34d399;
          font-weight: 700;
        }

        .add-variant-row {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-top: 10px;
        }

        .color-picker-input {
          width: 42px;
          height: 42px;
          border: none;
          background: transparent;
          cursor: pointer;
          flex-shrink: 0;
        }

        .delta-input {
          width: 110px;
          flex-shrink: 0;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
        }

        .empty-state-card {
          padding: 60px;
          text-align: center;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .flex-1 {
          flex: 1;
        }

        /* Mobile Breakpoint Utilities (< 1024px) */
        @media (max-width: 1023px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 280px;
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
          }
          .admin-sidebar.drawer-open {
            transform: translateX(0);
          }
          .sidebar-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            z-index: 95;
          }
          .admin-main-wrapper {
            margin-left: 0 !important;
          }
          .lg-only-block {
            display: none !important;
          }
        }

        @media (min-width: 1024px) {
          .lg-hidden {
            display: none !important;
          }
          .sidebar-backdrop {
            display: none !important;
          }
          .mobile-only-inline {
            display: none !important;
          }
          .mobile-fab {
            display: none !important;
          }
          .lg-hidden-grid {
            display: none !important;
          }
        }

        @media (max-width: 639px) {
          .sm-hidden {
            display: none !important;
          }
          .dashboard-content {
            padding: 12px;
          }
          .hero-card {
            padding: 16px;
          }
          .hero-title {
            font-size: 20px;
          }
          .filters-container {
            flex-direction: column;
          }
          .select-filters-group {
            width: 100%;
          }
          .custom-select {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}
