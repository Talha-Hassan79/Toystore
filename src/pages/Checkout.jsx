import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Truck, 
  CheckCircle, 
  MapPin, 
  ShieldCheck, 
  ChevronRight,
  ArrowLeft,
  Package
} from 'lucide-react';
import { createOrder } from '../services/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
   const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'cod'
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step === 1) {
      const { fullName, email, phone, address, city, zip } = formData;
      if (!fullName || !email || !phone || !address || !city || !zip) {
        toast.error('Please fill in ALL shipping and contact details');
        return;
      }
      // Simple email regex
      if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error('Please enter a valid email address');
        return;
      }
    }

    if (step === 2 && paymentMethod === 'card') {
      const { cardName, cardNumber, expiry, cvv } = formData;
      if (!cardName || !cardNumber || !expiry || !cvv) {
        toast.error('Please fill in ALL card details');
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handlePlaceOrder = () => {
    const orderData = {
      customer: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}, ${formData.zip}`,
      total: totalPrice + 5,
      items: cart.length,
      itemsList: cart,
      paymentMethod: paymentMethod,
      status: 'Processing'
    };

    toast.promise(
      createOrder(orderData),
      {
        loading: 'Processing your order...',
        success: 'Order placed successfully! 🎁',
        error: 'Failed to place order. Please try again.'
      }
    ).then((res) => {
      if (res) {
        clearCart();
        setOrderId(res.id);
        setStep(4);
      }
    });
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <Package size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some magical toys before checking out!</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  const steps = [
    { id: 1, name: 'Shipping', icon: MapPin },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: ShieldCheck },
    { id: 4, name: 'Success', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Progress Tracker */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                step >= s.id ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200' : 'bg-white text-gray-400 border-2 border-gray-100'
              }`}>
                <s.icon size={18} />
              </div>
              <span className={`text-xs font-bold mt-2 ${step >= s.id ? 'text-indigo-600' : 'text-gray-400'}`}>{s.name}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl shadow-indigo-100/50"
                >
                  <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <Truck className="text-indigo-600" /> Shipping Details
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                        <input name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                        <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                        <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Address</label>
                        <input name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20" placeholder="123 Magic Lane" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">City</label>
                        <input name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20" placeholder="Imagination City" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Zip Code</label>
                        <input name="zip" value={formData.zip} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20" placeholder="12345" />
                      </div>
                    </div>
                    <button 
                      onClick={handleNextStep}
                      className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                      Continue to Payment <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl shadow-indigo-100/50"
                >
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-6 hover:underline">
                    <ArrowLeft size={16} /> Back to Shipping
                  </button>
                  <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <CreditCard className="text-indigo-600" /> Payment Method
                  </h2>

                  <div className="flex bg-slate-50 p-2 rounded-2xl gap-2 mb-8">
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${paymentMethod === 'card' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'}`}
                    >
                      Credit Card
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${paymentMethod === 'cod' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'}`}
                    >
                      Cash on Delivery
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {paymentMethod === 'card' ? (
                      <motion.div 
                        key="card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Cardholder Name</label>
                          <input name="cardName" value={formData.cardName} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20" placeholder="JOHN DOE" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Card Number</label>
                          <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Expiry Date</label>
                            <input name="expiry" value={formData.expiry} onChange={handleInputChange} type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">CVV</label>
                            <input name="cvv" value={formData.cvv} onChange={handleInputChange} type="password" placeholder="***" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20" />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="cod"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-8 bg-indigo-50 rounded-[32px] border border-indigo-100 text-center"
                      >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-indigo-600">
                           <Package size={32} />
                        </div>
                        <h4 className="font-bold text-indigo-900 mb-2">Cash on Delivery</h4>
                        <p className="text-sm text-indigo-600/70">
                          You'll pay for your order when it's delivered to your doorstep. Please have the exact amount ready!
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={handleNextStep}
                    className="w-full mt-8 bg-indigo-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    Review Order <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl shadow-indigo-100/50"
                >
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-6 hover:underline">
                    <ArrowLeft size={16} /> Back to Payment
                  </button>
                  <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <ShieldCheck className="text-indigo-600" /> Review Your Order
                  </h2>
                  <div className="space-y-8">
                    <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
                      <div className="grid grid-cols-2 gap-8 pb-4 border-b border-slate-200">
                        <div>
                          <h4 className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2">Ship To</h4>
                          <p className="text-sm font-bold text-gray-800">{formData.fullName}</p>
                          <p className="text-xs text-gray-500">{formData.address}</p>
                          <p className="text-xs text-gray-500">{formData.city}, {formData.zip}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2">Contact</h4>
                          <p className="text-xs text-gray-500">{formData.email}</p>
                          <p className="text-xs text-gray-500">{formData.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2">Payment Method</h4>
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                          {paymentMethod === 'card' ? (
                            <>
                              <CreditCard size={16} className="text-indigo-600" />
                              Card ending in {formData.cardNumber.slice(-4) || 'XXXX'}
                            </>
                          ) : (
                            <>
                              <Package size={16} className="text-indigo-600" />
                              Cash on Delivery
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item._id || item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="text-sm font-bold text-gray-800">{item.name}</p>
                              <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                            </div>
                          </div>
                          <p className="text-sm font-black text-indigo-600">Rs. {(item.price * item.qty).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={handlePlaceOrder}
                      className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
                    >
                      {paymentMethod === 'card' ? `Pay Rs. ${(totalPrice + 5).toFixed(2)}` : 'Confirm Order'}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[40px] p-12 text-center shadow-xl shadow-indigo-100/50"
                >
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={56} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-4">Magic in Progress!</h2>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Your toys are being packed with care and will be flying to you shortly.
                  </p>
                  
                  <div className="bg-indigo-50 p-6 rounded-3xl mb-10 inline-block px-10 border border-indigo-100">
                    <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">Your Order ID</p>
                    <p className="text-2xl font-black text-indigo-600">{orderId}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => navigate('/')}
                      className="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                    >
                      Continue Shopping
                    </button>
                    <button 
                      onClick={() => navigate('/track-order')}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                      Track Order
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          {step < 4 && (
            <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50">
              <h3 className="text-lg font-black text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">Rs. {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className="font-bold text-gray-900">Rs. 5.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax</span>
                  <span className="font-bold text-gray-900">Rs. 0.00</span>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Total</span>
                <span className="text-3xl font-black text-indigo-600">Rs. {(totalPrice + 5).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
