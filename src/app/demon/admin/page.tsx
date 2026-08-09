'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit3, RotateCcw, Search, ShieldAlert, ArrowLeft, Smartphone, Check, Sparkles, Filter, X } from 'lucide-react';
import { useWizard } from '../../../context/WizardContext';
import { BRANDS, SERIES, MobileModel } from '../../../data/catalog';

export default function DemonAdminPage() {
  const { modelsList, addModel, updateModel, deleteModel, resetCatalog } = useWizard();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');
  const [selectedSeriesFilter, setSelectedSeriesFilter] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<MobileModel | null>(null);

  const [formData, setFormData] = useState<{
    id: string;
    brandId: string;
    seriesId: string;
    name: string;
    basePrice: number;
    image: string;
    specs: string;
  }>({
    id: '',
    brandId: 'samsung',
    seriesId: 'samsung-a',
    name: '',
    basePrice: 50000,
    image: '/samsung.svg',
    specs: '8GB RAM, 256GB Storage, Official Warranty'
  });

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
      specs: '8GB RAM, 256GB Storage, Official Warranty'
    });
    setIsModalOpen(true);
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
      specs: model.specs.join(', ')
    });
    setIsModalOpen(true);
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
      colors: editingModel?.colors || [{ name: 'Black', hex: '#1e293b' }, { name: 'Silver', hex: '#cbd5e1' }],
      storageOptions: editingModel?.storageOptions || [{ size: 'Standard Storage', priceDelta: 0 }]
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
    if (confirm('Reset entire catalog back to official 2026 factory defaults?')) {
      resetCatalog();
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', padding: '16px 12px 60px 12px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Navigation Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 700,
              background: 'rgba(255,255,255,0.06)',
              padding: '6px 12px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <ArrowLeft size={14} /> Storefront
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12px', fontWeight: 800 }}>
            <ShieldAlert size={15} /> DEMON ADMIN CONSOLE
          </div>
        </div>

        {/* Mobile-Friendly Control Hero */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '20px',
            padding: '20px 16px',
            marginBottom: '20px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={24} color="#818cf8" /> Demon Mobile Catalog
              </h1>
              <p style={{ fontSize: '12px', color: '#a5b4fc' }}>
                Full mobile CRUD catalog management. Live synced with storefront.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <button
                type="button"
                onClick={handleOpenAddModal}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)'
                }}
              >
                <Plus size={18} /> Add New Device
              </button>

              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#cbd5e1',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title="Reset Catalog to Factory Defaults"
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: 'rgba(0,0,0,0.25)', padding: '8px', borderRadius: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Total</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#38bdf8' }}>{modelsList.length}</div>
            </div>
            <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Brands</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#a7f3d0' }}>{BRANDS.length}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Filtered</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#f472b6' }}>{filteredModels.length}</div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search model name (e.g. S-25, iPhone 17, Pixel 10)..."
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                padding: '10px 36px 10px 36px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            {searchTerm && (
              <X
                size={16}
                color="#94a3b8"
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '12px', top: '12px', cursor: 'pointer' }}
              />
            )}
          </div>

          {/* Swipeable Brand Filter Tabs for Mobile */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'none'
            }}
          >
            <button
              type="button"
              onClick={() => { setSelectedBrandFilter('all'); setSelectedSeriesFilter('all'); }}
              style={{
                background: selectedBrandFilter === 'all' ? '#6366f1' : 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              All Brands
            </button>

            {BRANDS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => { setSelectedBrandFilter(b.id); setSelectedSeriesFilter('all'); }}
                style={{
                  background: selectedBrandFilter === b.id ? '#6366f1' : 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Device Listings Grid */}
        <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>
              Active Catalog Devices ({filteredModels.length})
            </span>
            <span style={{ fontSize: '11px', color: '#64748b' }}>
              Tap card to edit
            </span>
          </div>

          {filteredModels.length > 0 ? (
            <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {filteredModels.map((model) => {
                const brand = BRANDS.find((b) => b.id === model.brandId);
                const series = SERIES.find((s) => s.id === model.seriesId);
                const monthly = Math.round(model.basePrice / 24);

                return (
                  <div
                    key={model.id}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '14px',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={model.image}
                        alt={model.name}
                        style={{ width: '42px', height: '42px', objectFit: 'contain', background: '#ffffff', borderRadius: '10px', padding: '4px' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {model.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                          {brand?.name} • {series?.name}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '11px', color: '#cbd5e1', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '6px' }}>
                      {model.specs.join(' • ')}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Cash Price</div>
                        <div style={{ fontWeight: 800, color: '#f43f5e', fontSize: '14px' }}>
                          Rs. {model.basePrice.toLocaleString('en-PK')}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>24-Mo EMI</div>
                        <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '13px' }}>
                          Rs. {monthly.toLocaleString('en-PK')}/mo
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(model)}
                        style={{
                          flex: 1,
                          background: 'rgba(99, 102, 241, 0.15)',
                          color: '#818cf8',
                          border: '1px solid rgba(99, 102, 241, 0.3)',
                          borderRadius: '8px',
                          padding: '8px',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                      >
                        <Edit3 size={14} /> Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(model.id, model.name)}
                        style={{
                          flex: 1,
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#f87171',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '8px',
                          padding: '8px',
                          fontSize: '12px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
              No devices match your search or brand filter.
            </div>
          )}
        </div>

        {/* Mobile Full Screen Drawer Modal */}
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              zIndex: 9999
            }}
          >
            <div
              style={{
                background: '#0f172a',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                maxWidth: '540px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '24px 20px',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff' }}>
                  {editingModel ? 'Edit Device Listing' : 'Add New Device'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#ffffff', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveModel} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                    Brand *
                  </label>
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
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      padding: '12px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    {BRANDS.map((b) => (
                      <option key={b.id} value={b.id} style={{ background: '#0f172a' }}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                    Series *
                  </label>
                  <select
                    value={formData.seriesId}
                    onChange={(e) => setFormData({ ...formData, seriesId: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      padding: '12px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    {SERIES.filter((s) => s.brandId === formData.brandId).map((s) => (
                      <option key={s.id} value={s.id} style={{ background: '#0f172a' }}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                    Device Name & Variant *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. S-25 Ultra 12/512 or A-17 8/256"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      padding: '12px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                    Price in PKR *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    placeholder="e.g. 128000"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      padding: '12px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                    Image Logo URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/samsung.svg or /apple.png"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      padding: '12px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                    Specs (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    placeholder="8GB RAM, 256GB Storage, Official Warranty"
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      padding: '12px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: '#cbd5e1',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px 18px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px 24px',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {editingModel ? 'Update Device' : 'Save Device'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
