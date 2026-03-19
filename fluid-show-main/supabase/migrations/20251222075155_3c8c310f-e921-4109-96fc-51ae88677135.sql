-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a contact message (public form)
CREATE POLICY "Anyone can submit a contact message"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view messages
CREATE POLICY "Authenticated users can view messages"
ON public.contact_messages
FOR SELECT
USING (auth.uid() IS NOT NULL);