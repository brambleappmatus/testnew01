'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import { CreditCardIcon, HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/utils/formatters';

export default function CartSummary() {
  const { cart, removeFromCart, updateCartItemQuantity, translations } = useStore();

  const total = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
    return sum + (price || 0);
  }, 0);

  const shelterDonation = cart.reduce((sum, item) => {
    const charityAmount = typeof item.charity_amount === 'string' ? 
      parseFloat(item.charity_amount) : item.charity_amount;
    return sum + (charityAmount || 0);
  }, 0);

  const totalMacros = cart.reduce((acc, item) => ({
    kcal: acc.kcal + ((item.kcal || 0) * (item.quantity || 1)),
    protein: acc.protein + ((item.protein || 0) * (item.quantity || 1)),
    fats: acc.fats + ((item.fats || 0) * (item.quantity || 1)),
    carbs: acc.carbs + ((item.carbs || 0) * (item.quantity || 1))
  }), { kcal: 0, protein: 0, fats: 0, carbs: 0 });

  const handlePaymentClick = () => {
    window.open('https://revolut.me/attymatty', '_blank');
  };

  const handleQuantityChange = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      await updateCartItemQuantity(cartItemId, newQuantity);
    }
  };

  return (
    <div className="flex flex-col h-full text-xs">
      {/* Cart Items Section */}
      <div className="flex-1 overflow-y-auto pr-1 min-h-0 mb-2">
        <div className="space-y-1.5">
          {cart.map((item) => {
            const itemPrice = typeof item.price === 'string' ? 
              parseFloat(item.price) : item.price;

            return (
              <div key={item.id} className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800/50 p-1.5 rounded-lg">
                <div className="flex-grow min-w-0 mr-1">
                  <p className="font-medium text-gray-800 dark:text-white text-[10px] truncate">{item.name}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{formatCurrency(itemPrice || 0)}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10) || 1)}
                    className="w-8 p-0.5 text-[10px] border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-0.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
                    aria-label="Remove item"
                  >
                    <TrashIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="flex-shrink-0 mt-auto space-y-2">
        {cart.length > 0 && (
          <div className="text-[10px] text-gray-500 dark:text-gray-400 grid grid-cols-4 gap-1">
            <div className="text-center">
              <span className="block font-medium">{totalMacros.kcal}</span>
              <span className="text-[8px]">{translations.shop.cart.macros.kcal}</span>
            </div>
            <div className="text-center">
              <span className="block font-medium">{totalMacros.protein}g</span>
              <span className="text-[8px]">{translations.shop.cart.macros.protein}</span>
            </div>
            <div className="text-center">
              <span className="block font-medium">{totalMacros.fats}g</span>
              <span className="text-[8px]">{translations.shop.cart.macros.fats}</span>
            </div>
            <div className="text-center">
              <span className="block font-medium">{totalMacros.carbs}g</span>
              <span className="text-[8px]">{translations.shop.cart.macros.carbs}</span>
            </div>
          </div>
        )}

        <div className="border-t dark:border-zinc-700 pt-2 space-y-2">
          <p className="font-semibold text-gray-800 dark:text-white text-[11px]">
            {translations.shop.cart.total}: {formatCurrency(total)}
          </p>
          
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 p-1.5 rounded-lg border border-pink-100 dark:border-pink-900/30">
            <div className="flex items-center gap-1">
              <HeartIcon className="h-3 w-3 text-pink-500 dark:text-pink-400 animate-pulse" />
              <span className="font-medium text-gray-800 dark:text-white text-[10px]">
                {translations.shop.cart.shelterDonation.title}
              </span>
            </div>
            <p className="mt-0.5 font-medium text-pink-600 dark:text-pink-400 text-[10px]">
              {formatCurrency(shelterDonation)} {translations.shop.cart.shelterDonation.amount}
            </p>
          </div>

          {cart.length > 0 && (
            <div className="flex flex-col items-center space-y-1.5">
              <div className="md:hidden w-full">
                <button
                  onClick={handlePaymentClick}
                  className="w-full py-1.5 px-2 bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 flex items-center justify-center space-x-1.5 text-[10px]"
                >
                  <CreditCardIcon className="h-3 w-3" />
                  <span>PayMe</span>
                </button>
                <p className="text-[9px] text-gray-500 dark:text-gray-400 text-center mt-1">
                  {translations.shop.cart.tapToPay}
                </p>
              </div>

              <div className="hidden md:flex md:flex-col md:items-center md:space-y-1">
                <p className="text-[10px] text-gray-600 dark:text-gray-300 text-center">
                  {translations.shop.cart.scanToPay}
                </p>
                <div className="relative w-20 h-20 bg-white dark:bg-zinc-100 rounded-lg p-1.5 shadow-md">
                  <Image
                    src="/qr-code.png"
                    alt="Payment QR Code"
                    width={80}
                    height={80}
                    className="transition-all duration-200"
                    priority
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}