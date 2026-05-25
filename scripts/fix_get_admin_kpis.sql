-- ============================================================
-- FIX: get_admin_kpis
-- Problem: queries auth.users which anon role cannot access
-- Fix: use public.profiles for user count + SECURITY DEFINER
-- ============================================================

-- Must DROP first when changing return type signature
DROP FUNCTION IF EXISTS get_admin_kpis();

CREATE OR REPLACE FUNCTION get_admin_kpis()
RETURNS TABLE (
  total_revenue   NUMERIC,
  total_orders    BIGINT,
  total_users     BIGINT,
  pending_orders  BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER   -- runs as the function owner (postgres), not the caller
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    -- Total revenue from all non-cancelled/refunded orders
    COALESCE(
      (SELECT SUM(o.total_amount)
       FROM orders o
       WHERE o.status NOT IN ('cancelled', 'refunded')),
      0
    )::NUMERIC AS total_revenue,

    -- Total orders ever placed
    (SELECT COUNT(*) FROM orders)::BIGINT AS total_orders,

    -- Total registered users (from profiles, accessible to anon)
    (SELECT COUNT(*) FROM profiles)::BIGINT AS total_users,

    -- Orders with pending status
    (SELECT COUNT(*) FROM orders WHERE status = 'pending')::BIGINT AS pending_orders;
END;
$$;

-- Grant execute to authenticated and anon roles
GRANT EXECUTE ON FUNCTION get_admin_kpis() TO authenticated;
GRANT EXECUTE ON FUNCTION get_admin_kpis() TO anon;
