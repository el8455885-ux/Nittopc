"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Send, Cpu, Monitor, X, CheckCircle, CreditCard, Trash2, Laptop } from 'lucide-react';

// --- 1. قائمة المنتجات (Hardware Products) ---
const PRODUCTS = [
  { id: 1, name: "ALPHA GTR R-1", price: 12500, cpu: "i7-13700K", gpu: "RTX 4070", ram: "32GB", img: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800" },
  { id: 2, name: "WORKSTATION PRO", price: 18900, cpu: "Ryzen 9 7950X", gpu: "RTX 4080", ram: "64GB", img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800" },
  { id: 3, name: "BUDGET BEAST", price: 6500, cpu: "i5-12400F", gpu: "RTX 3050", ram: "16GB", img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800" },
  { id: 4, name: "NITTOPC EXTREME", price: 32000, cpu: "i9-14900K", gpu: "RTX 4090", ram: "128GB", img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800" },
];

export default function NittopcStore() {
  const [view, setView] = useState<'home' | 'contact' | 'cart'>('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // تصفية البحث
  const filteredProducts = useMemo(() => 
    PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())), 
  [search]);

  const addToCart = (p: any) => {
    setCart([...cart, p]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-600">
      
      {/* --- شريط التنقل (Navigation) --- */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center px-8">
        <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 cursor-pointer" 
            onClick={() => {setView('home'); setSelectedProduct(null)}}>
          NITTOPC
        </h1>
        
        <div className="relative hidden md:block">
          <input 
            type="text" placeholder="Search for builds..." 
            className="bg-white/5 border border-white/10 rounded-full py-2 px-10 w-64 focus:w-80 transition-all outline-none focus:border-purple-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => setView('contact')} className="text-xs font-black hover:text-purple-400 transition">CONTACT</button>
          <div className="relative cursor-pointer" onClick={() => setView('cart')}>
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* --- محتوى الموقع (Main Content) --- */}
      <div className="pt-24 pb-20">
        <AnimatePresence mode="wait">
          
          {/* واجهة المتجر */}
          {view === 'home' && !selectedProduct && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
              <header className="text-center mb-16">
                <motion.h2 initial={{ y: 20 }} animate={{ y: 0 }} className="text-6xl md:text-8xl font-black italic mb-4">
                  GAMING <span className="text-purple-600 uppercase italic">Power</span>
                </motion.h2>
                <p className="text-gray-500 max-w-xl mx-auto italic">Premium PC hardware for elite performance in Morocco.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {filteredProducts.map(p => (
                  <motion.div key={p.id} whileHover={{ y: -10 }} className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-5 group relative overflow-hidden">
                    <img src={p.img} alt={p.name} className="h-60 w-full object-cover rounded-3xl mb-6 group-hover:scale-105 transition duration-500" />
                    <h3 className="text-2xl font-black mb-2 uppercase italic">{p.name}</h3>
                    <div className="flex gap-2 mb-6">
                        <span className="text-[10px] bg-purple-500/10 px-3 py-1 rounded-full text-purple-400 font-bold border border-purple-500/20">{p.cpu}</span>
                        <span className="text-[10px] bg-blue-500/10 px-3 py-1 rounded-full text-blue-400 font-bold border border-blue-500/20">{p.gpu}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-mono text-white">{p.price} MAD</span>
                      <button onClick={() => setSelectedProduct(p)} className="bg-white text-black font-black px-6 py-2 rounded-xl hover:bg-purple-600 hover:text-white transition-all">
                        VIEW
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* واجهة سلة التسوق */}
          {view === 'cart' && (
            <motion.div initial={{ x: 50 }} animate={{ x: 0 }} className="max-w-2xl mx-auto p-8">
              <h2 className="text-5xl font-black mb-12 flex items-center gap-4 uppercase italic italic text-purple-500">Cart</h2>
              {cart.length === 0 ? <p className="text-gray-500 text-xl">Your cart is empty.</p> : (
                <div className="space-y-6">
                  {cart.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-6 rounded-[2rem] border border-white/5">
                      <div><p className="font-black text-xl">{item.name}</p><p className="text-purple-400 font-mono">{item.price} MAD</p></div>
                      <button onClick={() => removeFromCart(i)} className="text-red-500 hover:bg-red-500/10 p-3 rounded-full transition"><Trash2 size={24}/></button>
                    </div>
                  ))}
                  <div className="pt-10 border-t border-white/10 mt-10">
                    <div className="flex justify-between text-3xl font-black"><span>Total:</span><span className="text-purple-500">{totalPrice} MAD</span></div>
                    <button onClick={() => alert("Connecting to Payment Gateway...")} className="w-full bg-white text-black py-6 rounded-3xl font-black mt-8 text-xl flex items-center justify-center gap-3 hover:bg-purple-600 hover:text-white transition-all">
                      PAY NOW <CreditCard />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* واجهة تواصل معنا */}
          {view === 'contact' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto p-8 pt-10">
               <h2 className="text-5xl font-black mb-10 italic uppercase">Contact Us</h2>
               <div className="space-y-4">
                 <input placeholder="Name" className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl outline-none focus:border-purple-500 transition" />
                 <input placeholder="Email" className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl outline-none focus:border-purple-500 transition" />
                 <textarea placeholder="Tell us your specs..." rows={5} className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl outline-none focus:border-purple-500 transition"></textarea>
                 <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-5 rounded-3xl font-black uppercase tracking-widest hover:scale-[1.02] transition shadow-xl shadow-purple-600/20">Send Message</button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- النافذة المنبثقة للتفاصيل (Product Modal) --- */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-6 overflow-y-auto">
             <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 p-3 bg-white/10 rounded-full hover:bg-red-500 transition-all"><X size={32}/></button>
             <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 mt-20">
                <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src={selectedProduct.img} className="rounded-[3.5rem] w-full shadow-2xl shadow-purple-500/20 border border-white/10" />
                <div className="flex flex-col justify-center">
                  <h2 className="text-7xl font-black mb-6 uppercase italic leading-tight">{selectedProduct.name}</h2>
                  <p className="text-4xl text-purple-500 font-mono font-black mb-12">{selectedProduct.price} MAD</p>
                  <div className="grid grid-cols-2 gap-6 mb-12">
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5"><Cpu className="text-purple-500 mb-2" /> <p className="text-gray-400 text-xs uppercase">Processor</p> <p className="font-bold">{selectedProduct.cpu}</p></div>
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5"><Monitor className="text-blue-500 mb-2" /> <p className="text-gray-400 text-xs uppercase">Graphics</p> <p className="font-bold">{selectedProduct.gpu}</p></div>
                  </div>
                  <button 
                    onClick={() => {addToCart(selectedProduct); setSelectedProduct(null)}}
                    className="w-full bg-white text-black py-7 rounded-[2rem] font-black text-2xl hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center gap-4"
                  >
                    ADD TO CART <CheckCircle size={30}/>
                  </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="p-10 border-t border-white/5 text-center text-gray-600 text-[10px] tracking-widest uppercase">
        © 2026 NITTOPC MOROCCO - HIGH END GEAR ONLY.
      </footer>
    </div>
  );
}
