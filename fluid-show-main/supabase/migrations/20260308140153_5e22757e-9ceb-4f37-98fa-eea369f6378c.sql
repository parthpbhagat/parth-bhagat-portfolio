
-- Create projects table
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  color text NOT NULL DEFAULT 'from-blue-500/20 to-cyan-600/20',
  github text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  highlights text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create project_images table
CREATE TABLE public.project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Public read access for projects
CREATE POLICY "Anyone can view projects" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view project images" ON public.project_images
  FOR SELECT USING (true);

-- Authenticated users can manage projects
CREATE POLICY "Authenticated users can insert projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects" ON public.projects
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects" ON public.projects
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert project images" ON public.project_images
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update project images" ON public.project_images
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete project images" ON public.project_images
  FOR DELETE TO authenticated USING (true);

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

-- Storage policies
CREATE POLICY "Anyone can view project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can delete project images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'project-images');
