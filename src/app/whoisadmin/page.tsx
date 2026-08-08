'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit3, RotateCcw, Search, ShieldAlert, ArrowLeft, Smartphone, Check } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { BRANDS, SERIES, MobileModel } from '../../data/catalog';

export default function WhoIsAdminPage() {
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
    if (confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) {
      deleteModel(id);
    }
  };

  const handleReset = () => {
    if (confirm('Reset entire catalog back to official 2026 factory defaults?')) {
      resetCatalog();
    }
  };

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 12px' }}>
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 700
          }}
        >
          <ArrowLeft size={16} /> Back to Storefront
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontSize: '13px', fontWeight: 800 }}>
          <ShieldAlert size={16} /> Admin Console
        </div>
      </div>

      {/* Hero Banner with Responsive Controls */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '24px 18px',
          marginBottom: '24px',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Smartphone size={26} color="#38bdf8" /> Catalog Device Manager
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>
              Add, edit, or remove devices & variations. Live synced with store.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '340px' }}>
            <button
              type="button"
              onClick={handleOpenAddModal}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 14px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
              }}
            >
              <Plus size={18} /> Add Device
            </button>

            <button
              type="button"
              onClick={handleReset}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#e2e8f0',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                padding: '12px 16px',
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

        {/* Mobile Responsive Search & Filter Bar */}
        <div className="admin-filter-bar">
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search device name..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                padding: '10px 12px 10px 38px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <select
              value={selectedBrandFilter}
              onChange={(e) => {
                setSelectedBrandFilter(e.target.value);
                setSelectedSeriesFilter('all');
              }}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              <option value="all" style={{ background: '#1e293b' }}>All Brands</option>
              {BRANDS.map((b) => (
                <option key={b.id} value={b.id} style={{ background: '#1e293b' }}>
                  {b.name}
                </option>
              ))}
            </select>

            <select
              value={selectedSeriesFilter}
              onChange={(e) => setSelectedSeriesFilter(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            >
              <option value="all" style={{ background: '#1e293b' }}>All Series</option>
              {availableSeriesForFilter.map((s) => (
                <option key={s.id} value={s.id} style={{ background: '#1e293b' }}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Container */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
            Listed Devices ({filteredModels.length})
          </span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            Prices in PKR
          </span>
        </div>

        {filteredModels.length > 0 ? (
          <div>
            {/* Desktop Table View */}
            <div className="desktop-table-view" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '12px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 16px' }}>Device</th>
                    <th style={{ padding: '14px 16px' }}>Brand / Series</th>
                    <th style={{ padding: '14px 16px' }}>Cash Price</th>
                    <th style={{ padding: '14px 16px' }}>24-Mo EMI</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModels.map((model) => {
                    const brand = BRANDS.find((b) => b.id === model.brandId);
                    const series = SERIES.find((s) => s.id === model.seriesId);
                    const monthly = Math.round(model.basePrice / 24);

                    return (
                      <tr key={model.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={model.image}
                              alt={model.name}
                              style={{ width: '36px', height: '36px', objectFit: 'contain', background: '#f8fafc', borderRadius: '8px', padding: '4px' }}
                            />
                            <div>
                              <div style={{ fontWeight: 800, color: '#0f172a' }}>{model.name}</div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>{model.specs.join(' • ')}</div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 600 }}>
                          <div>{brand?.name || model.brandId}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>{series?.name || model.seriesId}</div>
                        </td>

                        <td style={{ padding: '14px 16px', fontWeight: 800, color: '#dc2626' }}>
                          Rs. {model.basePrice.toLocaleString('en-PK')}
                        </td>

                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2563eb' }}>
                          Rs. {monthly.toLocaleString('en-PK')} / mo
                        </td>

                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(model)}
                              style={{
                                background: '#eff6ff',
                                color: '#2563eb',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Edit3 size={14} /> Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(model.id, model.name)}
                              style={{
                                background: '#fef2f2',
                                color: '#dc2626',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
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

            {/* Mobile Cards View */}
            <div className="mobile-cards-view" style={{ display: 'none', padding: '12px', flexDirection: 'column', gap: '12px' }}>
              {filteredModels.map((model) => {
                const brand = BRANDS.find((b) => b.id === model.brandId);
                const series = SERIES.find((s) => s.id === model.seriesId);
                const monthly = Math.round(model.basePrice / 24);

                return (
                  <div
                    key={model.id}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
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
                        style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#ffffff', borderRadius: '8px', padding: '4px', border: '1px solid #e2e8f0' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>{model.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{brand?.name} • {series?.name}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div>
                        <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Cash Price</div>
                        <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '14px' }}>Rs. {model.basePrice.toLocaleString('en-PK')}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>24-Mo EMI</div>
                        <div style={{ fontWeight: 700, color: '#2563eb', fontSize: '13px' }}>Rs. {monthly.toLocaleString('en-PK')}/mo</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(model)}
                        style={{
                          flex: 1,
                          background: '#eff6ff',
                          color: '#2563eb',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px',
                          fontSize: '13px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Edit3 size={15} /> Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(model.id, model.name)}
                        style={{
                          flex: 1,
                          background: '#fef2f2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px',
                          fontSize: '13px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ padding: '36px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
            No devices match your search or filter.
          </div>
        )}
      </div>

      {/* Modal Drawer */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            zIndex: 9999
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '14px' }}>
              {editingModel ? 'Edit Device' : 'Add New Device'}
            </h2>

            <form onSubmit={handleSaveModel} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
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
                  className="form-select"
                >
                  {BRANDS.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Series *
                </label>
                <select
                  value={formData.seriesId}
                  onChange={(e) => setFormData({ ...formData, seriesId: e.target.value })}
                  className="form-select"
                >
                  {SERIES.filter((s) => s.brandId === formData.brandId).map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Device Name & Variant *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. S-25 Ultra 12/512"
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Price in PKR *
                </label>
                <input
                  type="number"
                  required
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                  placeholder="e.g. 128000"
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Image Path / URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/samsung.svg or /apple.png"
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Specs (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  placeholder="8GB RAM, 256GB Storage, Official Warranty"
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 16px',
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
                    padding: '10px 20px',
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

      {/* Embedded Responsive Styles */}
      <style jsx global>{`
        .admin-filter-bar {
          display: grid;
          grid-template-columns: 1fr 180px 180px;
          gap: 10px;
          margin-top: 6px;
        }

        @media (max-width: 768px) {
          .admin-filter-bar {
            grid-template-columns: 1fr !important;
          }
          .desktop-table-view {
            display: none !important;
          }
          .mobile-cards-view {
            display: flex !important;
          }
        }
      `}</style>
    </main>
  );
}
