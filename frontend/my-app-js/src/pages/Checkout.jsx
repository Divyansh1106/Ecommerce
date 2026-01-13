import React, { useState } from 'react';
import { CreditCard, Lock, ShoppingBag, Truck, Check } from 'lucide-react';
import useCounterStore from '../store/cartStore';
import UseUserStore from '../store/userStore';
export default function CheckoutPage({pro}) {
  const {addAddress}=UseUserStore();
  const {products,count} = useCounterStore();
  const user = UseUserStore((state) => state.user);
  console.log("USER IN CHECKOUT:", user);
  const [step, setStep] = useState(1);
  const [addressOption, setAddressOption] = useState('existing');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [check, setCheck] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
     PIN: '',
     state:'',
   
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveInfo: false,
  });

  const savedAddresses=user.addresses||[]

  const cartItems = pro
  .filter(product => products[product.id])
  .map(product => ({
    ...product,
    count: products[product.id]
  }));

      
  

  const total = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
 

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContinue = () => {
    if (step < 2) {
      if(addressOption==="new"){
        if(check){
          addAddress({city:formData.city,address:formData.address, PIN:formData.zipCode,country:formData.country, state:formData.state,})
        }
      }
      setStep(step + 1);
    } else {
      alert('Order placed successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-4">
            {[
              { num: 1, label: 'Shipping' },
              { num: 2, label: 'Payment' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s.num ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step > s.num ? <Check size={20} /> : s.num}
                  </div>
                  <span className={`hidden sm:inline ${step >= s.num ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 1 && <div className={`w-12 h-1 ${step > s.num ? 'bg-indigo-600' : 'bg-gray-300'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div>
                {/* Step 1: Shipping Address */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <Truck className="text-indigo-600" size={28} />
                      Shipping Address
                    </h2>

                    {/* Address Option Toggle */}
                    <div className="flex gap-4 mb-6">
                      <button
                        onClick={() => setAddressOption('existing')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition ${
                          addressOption === 'existing'
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        Select Existing Address
                      </button>
                      <button
                        onClick={() => setAddressOption('new')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition ${
                          addressOption === 'new'
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        Add New Address
                      </button>
                    </div>

                    {/* Existing Addresses */}
                    {addressOption === 'existing' && (
                      <div className="space-y-3">
                        {savedAddresses.map((addr) => (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedAddress(addr.id)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                              selectedAddress === addr.id
                                ? 'border-indigo-600 bg-indigo-50'
                                : 'border-gray-300 hover:border-indigo-400'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-800 mb-1">{addr.name}</h3>
                                <p className="text-gray-600 text-sm">{addr.address}</p>
                              </div>
                              {selectedAddress === addr.id && (
                                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                                  <Check size={16} className="text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New Address Form */}
                    {addressOption === 'new' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                            <option>Australia</option>
                          </select>
                        </div>
                         <label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={check}
    onChange={(e) => setCheck(e.target.checked)}
    className="h-4 w-4 accent-blue-600 cursor-pointer"
  />
  <span className="text-sm text-gray-700">
    Save this address for future use
  </span>
</label>
                      </div>
                      
                    )}
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <CreditCard className="text-indigo-600" size={28} />
                      Payment Details
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <label className="text-sm text-gray-700">Save payment information for future purchases</label>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                      <Lock className="text-blue-600 mt-0.5" size={20} />
                      <p className="text-sm text-blue-800">Your payment information is encrypted and secure</p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleContinue}
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
                  >
                    {step === 2 ? 'Place Order' : 'Continue'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <ShoppingBag size={24} />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="text-3xl"><img src={item.image}></img></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.count}</p>
                    </div>
                    <div className="font-semibold text-gray-800">
                      ${(item.price * item.count).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  
                </div>
                
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                🎉 Free returns within 30 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
