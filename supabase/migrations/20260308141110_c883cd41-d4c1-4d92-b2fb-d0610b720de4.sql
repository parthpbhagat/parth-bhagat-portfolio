
CREATE TABLE public.about_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Turning ideas into',
  title_highlight text NOT NULL DEFAULT 'reality',
  paragraph1 text NOT NULL DEFAULT '',
  paragraph2 text NOT NULL DEFAULT '',
  skills text[] NOT NULL DEFAULT '{}'::text[],
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.about_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view about info" ON public.about_info FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update about info" ON public.about_info FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can insert about info" ON public.about_info FOR INSERT TO authenticated WITH CHECK (true);

INSERT INTO public.about_info (title, title_highlight, paragraph1, paragraph2, skills) VALUES (
  'Turning ideas into',
  'reality',
  'I''m Parth Bhagat, a passionate Data Analyst with a keen eye for creating seamless digital experiences. With expertise in modern web technologies, I bring creative visions to life through clean, efficient code.',
  'When I''m not coding, you''ll find me exploring new design trends, contributing to open-source projects, or enjoying a good cup of coffee.',
  ARRAY['Python', 'SQL', 'Advance Excel', 'Power BI', 'Tailwind']
);
