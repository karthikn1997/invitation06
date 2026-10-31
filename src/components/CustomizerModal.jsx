import React, { useState } from 'react'
import { Sliders, X, Sparkles, Check, RefreshCw } from 'lucide-react'
import { DEFAULT_INVITATION } from '../data/defaultInvitation'

export default function CustomizerModal({ isOpen, onClose, invitation, onUpdateInvitation }) {
  const [formData, setFormData] = useState(invitation)

  if (!isOpen) return null

  const handleFieldChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleApply = (e) => {
    e.preventDefault()
    onUpdateInvitation(formData)
    onClose()
  }

  const handleReset = () => {
    setFormData(DEFAULT_INVITATION)
    onUpdateInvitation(DEFAULT_INVITATION)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-amber-300 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-amber-200/80 bg-amber-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Customize Invitation Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-amber-100 text-stone-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleApply} className="p-5 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Template Selector */}
          <div>
            <label className="block font-bold text-stone-800 mb-2">
              Select Celebration Template
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'wedding', label: '💍 Wedding' },
                { id: 'birthday', label: '🎂 Birthday' },
                { id: 'housewarming', label: '🏡 Housewarming' }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleFieldChange(null, 'template', t.id)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                    formData.template === t.id
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-amber-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wedding Fields */}
          {formData.template === 'wedding' && (
            <div className="space-y-4 pt-2 border-t border-amber-100">
              <h4 className="font-serif font-bold text-amber-900 text-sm">
                Bride & Groom Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 text-xs mb-1">Bride's Name</label>
                  <input
                    type="text"
                    value={formData.bride?.name || ''}
                    onChange={(e) => handleFieldChange('bride', 'name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 text-xs mb-1">Bride's Parents/Family</label>
                  <input
                    type="text"
                    value={formData.bride?.subtitle || ''}
                    onChange={(e) => handleFieldChange('bride', 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 text-xs mb-1">Groom's Name</label>
                  <input
                    type="text"
                    value={formData.groom?.name || ''}
                    onChange={(e) => handleFieldChange('groom', 'name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 text-xs mb-1">Groom's Parents/Family</label>
                  <input
                    type="text"
                    value={formData.groom?.subtitle || ''}
                    onChange={(e) => handleFieldChange('groom', 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 text-xs mb-1">Auspicious Muhurtham Time</label>
                <input
                  type="text"
                  value={formData.auspiciousMuhurtham || ''}
                  onChange={(e) => handleFieldChange(null, 'auspiciousMuhurtham', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                />
              </div>
            </div>
          )}

          {/* Birthday Fields */}
          {formData.template === 'birthday' && (
            <div className="space-y-4 pt-2 border-t border-amber-100">
              <h4 className="font-serif font-bold text-amber-900 text-sm">
                Birthday Details
              </h4>
              <div>
                <label className="block text-stone-600 text-xs mb-1">Celebrant Name</label>
                <input
                  type="text"
                  value={formData.birthdayDetails?.celebrantName || ''}
                  onChange={(e) => handleFieldChange('birthdayDetails', 'celebrantName', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 text-xs mb-1">Milestone</label>
                  <input
                    type="text"
                    value={formData.birthdayDetails?.milestone || ''}
                    onChange={(e) => handleFieldChange('birthdayDetails', 'milestone', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 text-xs mb-1">Theme</label>
                  <input
                    type="text"
                    value={formData.birthdayDetails?.theme || ''}
                    onChange={(e) => handleFieldChange('birthdayDetails', 'theme', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Housewarming Fields */}
          {formData.template === 'housewarming' && (
            <div className="space-y-4 pt-2 border-t border-amber-100">
              <h4 className="font-serif font-bold text-amber-900 text-sm">
                Housewarming Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 text-xs mb-1">New Home Name</label>
                  <input
                    type="text"
                    value={formData.housewarmingDetails?.homeName || ''}
                    onChange={(e) => handleFieldChange('housewarmingDetails', 'homeName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 text-xs mb-1">Family / Hosts</label>
                  <input
                    type="text"
                    value={formData.housewarmingDetails?.hosts || ''}
                    onChange={(e) => handleFieldChange('housewarmingDetails', 'hosts', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Date & Venue Common Fields */}
          <div className="space-y-3 pt-2 border-t border-amber-100">
            <h4 className="font-serif font-bold text-amber-900 text-sm">
              Date & Venue
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-600 text-xs mb-1">Formatted Date Text</label>
                <input
                  type="text"
                  value={formData.formattedDate || ''}
                  onChange={(e) => handleFieldChange(null, 'formattedDate', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-stone-600 text-xs mb-1">Venue Hall Name</label>
                <input
                  type="text"
                  value={formData.venue?.name || ''}
                  onChange={(e) => handleFieldChange('venue', 'name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-stone-600 text-xs mb-1">Address & City</label>
              <input
                type="text"
                value={formData.venue?.address || ''}
                onChange={(e) => handleFieldChange('venue', 'address', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-amber-200 text-xs"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-amber-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="py-2.5 px-3 rounded-lg text-xs font-semibold text-stone-600 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-lg border border-stone-300 text-stone-700 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 px-5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Apply Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
