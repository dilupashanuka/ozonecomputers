// src/components/CheckoutModal.tsx
'use client';

import React, { useState } from 'react';
import { useBuildStore } from '@/store/buildStore';
import { X, Send, User, Phone, MapPin } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { parts, buildName } = useBuildStore();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalPrice = Object.values(parts).reduce((sum, part) => sum + (part?.price || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ඇණවුම WhatsApp පණිවිඩයක් ලෙස සකස් කිරීම
    let message = `*නව PC ඇණවුමක්!* 🖥️\n\n`;
    message += `*නම:* ${buildName}\n`;
    message += `*පාරිභෝගිකයා:* ${formData.name}\n`;
    message += `*දුරකථන:* ${formData.phone}\n`;
    message += `*ලිපිනය:* ${formData.address}\n\n`;
    message += `*තෝරාගත් කොටස්:*\n`;
    
    Object.entries(parts).forEach(([cat, product]) => {
      if (product) {
        message += `- ${product.name}: Rs. ${product.price.toLocaleString()}\n`;
      }
    });
    
    message += `\n*මුළු මිල:* Rs. ${totalPrice.toLocaleString()}`;

    // WhatsApp API වෙත යොමු කිරීම (ඔබේ දුරකථන අංකය මෙහි දමන්න)
    const phoneNumber = "94700000000"; // ඔබේ ව්යාපාරික දුරකථන අංකය මෙහි දමන්න (Country code සමඟ)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // තාවකාලිකව ප්රමාදයක් දී නව තැබැල්ලක් විවෘත කිරීම
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md p-6 relative shadow-2xl border border-gray-700 animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 hover:bg-gray-700 rounded-full transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-400">ඇණවුම තහවුරු කරන්න</h2>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          මෙම ඇණවුම සම්පූර්ණ කිරීම සඳහා ඔබේ විස්තර ඇතුළත් කර "WhatsApp හරහා යවන්න" බොත්තම එබන්න.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest flex items-center gap-2">
              <User size={14} className="text-blue-500" /> ඔබේ නම
            </label>
            <input 
              required
              type="text" 
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600"
              placeholder="නම ඇතුළත් කරන්න"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest flex items-center gap-2">
              <Phone size={14} className="text-blue-500" /> දුරකථන අංකය
            </label>
            <input 
              required
              type="tel" 
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600"
              placeholder="07xxxxxxxx"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={14} className="text-blue-500" /> ලිපිනය
            </label>
            <textarea 
              required
              rows={3}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all placeholder:text-gray-600"
              placeholder="නිවසේ ලිපිනය..."
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="pt-6 mt-6 border-t border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-medium">මුළු මිල:</span>
              <span className="text-2xl font-black text-green-400">Rs. {totalPrice.toLocaleString()}</span>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/20 active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send size={20} /> WhatsApp හරහා යවන්න
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-gray-500 mt-4 font-medium uppercase tracking-tighter">
              බොත්තම එබූ පසු ඔබව WhatsApp වෙත යොමු කරනු ලැබේ.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
