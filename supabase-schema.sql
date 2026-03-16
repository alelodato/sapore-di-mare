-- ============================================================
-- Sapore Di Mare — Supabase Schema
-- ============================================================

-- Reservations table
CREATE TABLE IF NOT EXISTS public.reservations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  date        DATE NOT NULL,
  time        TIME NOT NULL,
  guests      INTEGER NOT NULL CHECK (guests BETWEEN 1 AND 20),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast user + date lookups
CREATE INDEX IF NOT EXISTS reservations_user_id_date_idx
  ON public.reservations (user_id, date);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Users can only read their own reservations
CREATE POLICY "Users can view own reservations"
  ON public.reservations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own reservations
CREATE POLICY "Users can create own reservations"
  ON public.reservations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reservations
CREATE POLICY "Users can update own reservations"
  ON public.reservations
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reservations
CREATE POLICY "Users can delete own reservations"
  ON public.reservations
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- Updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
