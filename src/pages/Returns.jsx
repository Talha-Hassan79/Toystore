import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ShieldCheck, Heart, MessageCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-indigo-100/50"
        >
          <div className="w-20 h-20 bg-pink-50 text-pink-600 rounded-3xl flex items-center justify-center mb-8">
            <RotateCcw size={40} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Returns & Exchanges</h1>
          <p className="text-lg text-slate-500 mb-12 leading-relaxed">
            Not completely happy with your toy? No worries! We want every child to be delighted, so we've made our return process as simple as child's play.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-pink-600 font-bold">
                <ShieldCheck size={20} />
                <h3>30-Day Guarantee</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Return any unused item in its original packaging within 30 days for a full refund. No questions asked.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-pink-600 font-bold">
                <RotateCcw size={20} />
                <h3>Easy Exchanges</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Want a different color or model? We offer free exchanges on all items to ensure you get exactly what you wanted.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-pink-600 font-bold">
                <Heart size={20} />
                <h3>Damaged Items</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                If an item arrives damaged, we'll send a replacement immediately at no extra cost to you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-pink-600 font-bold">
                <MessageCircle size={20} />
                <h3>Friendly Support</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our team is always here to help you with your return or any questions about our products.
              </p>
            </div>
          </div>

          <div className="mt-16 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4 text-center">How to start a return?</h2>
            <p className="text-slate-500 text-center mb-8">It takes less than 2 minutes to get started.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Contact Us", desc: "Email our support team with your order ID." },
                { step: "2", title: "Print Label", desc: "We'll send you a prepaid shipping label." },
                { step: "3", title: "Send Back", desc: "Drop it off at any authorized shipping center." }
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4 font-black text-pink-600 shadow-sm border border-pink-100">
                    {s.step}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{s.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Returns;
