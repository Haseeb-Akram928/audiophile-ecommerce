import { useState } from "react";
import { validateCoupon } from "@/services/apiCoupons";
import toast from "react-hot-toast";

export function useCheckoutCoupon() {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const applyCoupon = async (code) => {
    if (!code) return;
    
    try {
      setIsValidating(true);
      const coupon = await validateCoupon(code);
      setAppliedCoupon(coupon);
      const symbol = coupon.discount_type === 'percentage' ? '%' : '$';
      toast.success(`Coupon "${coupon.code}" applied! ${coupon.discount_value}${symbol} off.`);
    } catch (err) {
      toast.error(err.message);
      setAppliedCoupon(null);
    } finally {
      setIsValidating(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success("Coupon removed");
  };

  return { 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    isValidating 
  };
}
