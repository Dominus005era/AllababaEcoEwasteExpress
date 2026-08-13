-- EcoTrace Supabase Database Schema & RLS Policies
-- Paste this entire SQL script into your Supabase Dashboard ➔ SQL Editor ➔ Run

-- 1. Create Profiles Table linked to Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'donor', -- 'donor', 'recycler', 'admin'
  upi_id TEXT,
  cpcb_license TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create E-Waste Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  device_name TEXT NOT NULL,
  category TEXT NOT NULL,
  estimated_value NUMERIC(10, 2) NOT NULL,
  co2_saved TEXT,
  pickup_address TEXT,
  pickup_time TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'Pickup Booked', -- 'Pickup Booked', 'Completed', 'Smelter Processing'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies for Profiles
CREATE POLICY "Public profiles are viewable by authenticated users" 
  ON public.profiles FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 5. Create RLS Policies for Submissions
CREATE POLICY "Users can view their own submissions or recyclers can view all" 
  ON public.submissions FOR SELECT 
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('recycler', 'admin')
  ));

CREATE POLICY "Donors can create submissions" 
  ON public.submissions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Recyclers can update submission status" 
  ON public.submissions FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('recycler', 'admin')
  ));
