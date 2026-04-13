import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAdminReviews, approveReview, 
  getAdminCoupons, createCoupon, toggleCoupon,
  getSiteSettings, updateSiteSetting 
} from "@/services/apiAdminContent";
import { useAdminUser } from "../auth/useAdminUser";
import toast from "react-hot-toast";

// -- REVIEWS --
export function useAdminReviews() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["admin_reviews"],
    queryFn: getAdminReviews,
  });
  return { reviews, isLoading };
}

export function useApproveReview() {
  const queryClient = useQueryClient();
  const { user } = useAdminUser();

  const { mutate: moderateReview, isPending } = useMutation({
    mutationFn: ({ reviewId, isApproved }) => approveReview({ reviewId, isApproved, adminId: user?.id }),
    onSuccess: () => {
      toast.success("Review status updated");
      queryClient.invalidateQueries({ queryKey: ["admin_reviews"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { moderateReview, isPending };
}

// -- COUPONS --
export function useAdminCoupons() {
  const { data: coupons, isLoading } = useQuery({
    queryKey: ["admin_coupons"],
    queryFn: getAdminCoupons,
  });
  return { coupons, isLoading };
}

export function useManageCoupons() {
  const queryClient = useQueryClient();

  const { mutate: addCoupon, isPending: isCreating } = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      toast.success("Coupon created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin_coupons"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: toggleStatus, isPending: isToggling } = useMutation({
    mutationFn: toggleCoupon,
    onSuccess: () => {
      toast.success("Coupon status updated");
      queryClient.invalidateQueries({ queryKey: ["admin_coupons"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { addCoupon, isCreating, toggleStatus, isToggling };
}

// -- SETTINGS --
export function useAdminSettings() {
  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin_settings"],
    queryFn: getSiteSettings,
  });
  return { settings, isLoading };
}

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { user } = useAdminUser();

  const { mutate: updateSetting, isPending } = useMutation({
    mutationFn: ({ settingKey, value }) => updateSiteSetting({ settingKey, value, adminId: user?.id }),
    onSuccess: () => {
      toast.success("Settings updated");
      queryClient.invalidateQueries({ queryKey: ["admin_settings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateSetting, isPending };
}
