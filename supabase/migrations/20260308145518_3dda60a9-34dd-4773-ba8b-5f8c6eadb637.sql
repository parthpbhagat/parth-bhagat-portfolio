
-- Create certificate categories enum
CREATE TYPE public.cert_category AS ENUM ('nsdc', 'hackerrank', 'hp_life', 'simplilearn', 'other');

-- Create certificates table
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category cert_category NOT NULL DEFAULT 'other',
  link TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  issuer TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  skills TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can view certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert certificates" ON public.certificates FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update certificates" ON public.certificates FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete certificates" ON public.certificates FOR DELETE TO authenticated USING (true);

-- Create storage bucket for certificate images
INSERT INTO storage.buckets (id, name, public) VALUES ('certificate-images', 'certificate-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view certificate images" ON storage.objects FOR SELECT USING (bucket_id = 'certificate-images');
CREATE POLICY "Authenticated users can upload certificate images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'certificate-images');
CREATE POLICY "Authenticated users can update certificate images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'certificate-images');
CREATE POLICY "Authenticated users can delete certificate images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'certificate-images');

-- Seed existing certificates
INSERT INTO public.certificates (name, category, link, date, image_url, sort_order, skills, status) VALUES
-- NSDC
('NSDC Skill Certificate', 'nsdc', '', '', '', 0, ARRAY['Python','SQL','Excel','HTML','CSS','C','C++','Power BI'], 'In Progress'),
-- HackerRank
('Python (Basic)', 'hackerrank', 'https://www.hackerrank.com/certificates/iframe/e089c7e204d7', 'December 2025', '', 1, '{}', ''),
('Software Engineer', 'hackerrank', 'https://www.hackerrank.com/certificates/iframe/1282187483c1', 'December 2025', '', 2, '{}', ''),
('SQL (Basic)', 'hackerrank', 'https://www.hackerrank.com/certificates/iframe/d15b330465ee', 'December 2025', '', 3, '{}', ''),
('SQL (Intermediate)', 'hackerrank', 'https://www.hackerrank.com/certificates/iframe/71e49cece4ce', 'December 2025', '', 4, '{}', ''),
('SQL (Advanced)', 'hackerrank', 'https://www.hackerrank.com/certificates/iframe/2485af92b929', 'December 2025', '', 5, '{}', ''),
-- HP Life
('Data Science & Analytics', 'hp_life', 'https://www.life-global.org/certificate/6a9c6aff-a83b-4cf0-9500-aefcbb8bc14a', 'December 2025', '', 6, '{}', ''),
('Success Mindset', 'hp_life', 'https://www.life-global.org/certificate/7aa65c92-9dfc-4acf-8191-6a9b9947fc7b', 'December 2025', '', 7, '{}', ''),
-- SimpliLearn
('Introduction to Data Science', 'simplilearn', 'https://simpli-web.app.link/e/7z2dvKP1lZb', 'December 2025', '', 8, '{}', ''),
('Get Started with Databricks for ML', 'simplilearn', 'https://simpli-web.app.link/e/PAoSWZNwfZb', 'December 2025', '', 9, '{}', ''),
('Power BI for Beginners', 'simplilearn', 'https://simpli-web.app.link/e/powerbi', 'December 2025', '', 10, '{}', ''),
('Introduction to MS Excel', 'simplilearn', 'https://simpli-web.app.link/e/excel', 'January 2026', '', 11, '{}', ''),
('Generative AI with AWS', 'simplilearn', '', 'January 2026', '', 12, '{}', ''),
('Resume Review Agentic System with CrewAI', 'simplilearn', '', 'January 2026', '', 13, '{}', ''),
-- Other
('Power BI Workshop', 'other', '', 'January 2026', '', 14, '{}', ''),
('TechWar 2026 - Python Analyzers', 'other', '', 'January 2026', '', 15, '{}', ''),
('FutureForward 2026 - Industry Mentors Meet', 'other', '', 'February 2026', '', 16, '{}', '');

-- Set issuer for other certificates
UPDATE public.certificates SET issuer = 'OfficeMaster' WHERE name = 'Power BI Workshop';
UPDATE public.certificates SET issuer = 'Red & White Skill Education' WHERE name IN ('TechWar 2026 - Python Analyzers', 'FutureForward 2026 - Industry Mentors Meet');
