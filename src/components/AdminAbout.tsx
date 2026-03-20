import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, X, RefreshCw } from "lucide-react";

interface AboutData {
  id: string;
  title: string;
  title_highlight: string;
  paragraph1: string;
  paragraph2: string;
  skills: string[];
}

const AdminAbout = () => {
  const [data, setData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const { toast } = useToast();

  const fetchAbout = async () => {
    setIsLoading(true);
    const { data: rows, error } = await supabase
      .from("about_info")
      .select("*")
      .limit(1)
      .single();

    setIsLoading(false);
    if (error) {
      toast({ title: "Failed to load about info", variant: "destructive" });
    } else {
      setData(rows as AboutData);
    }
  };

  useEffect(() => { fetchAbout(); }, []);

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    const { error } = await supabase
      .from("about_info")
      .update({
        title: data.title,
        title_highlight: data.title_highlight,
        paragraph1: data.paragraph1,
        paragraph2: data.paragraph2,
        skills: data.skills,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);

    setIsSaving(false);
    if (error) {
      toast({ title: "Failed to save", variant: "destructive" });
    } else {
      toast({ title: "About section updated!" });
    }
  };

  const addSkill = () => {
    if (!newSkill.trim() || !data) return;
    setData({ ...data, skills: [...data.skills, newSkill.trim()] });
    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    if (!data) return;
    setData({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  if (isLoading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;
  if (!data) return <div className="text-center py-12 text-muted-foreground">No about data found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">About Section</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchAbout}>
            <RefreshCw size={16} />
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            <Save size={16} className="mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="border border-border rounded-xl bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Heading</label>
            <Input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Turning ideas into"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Highlight Word</label>
            <Input
              value={data.title_highlight}
              onChange={(e) => setData({ ...data, title_highlight: e.target.value })}
              placeholder="reality"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Paragraph 1</label>
          <Textarea
            value={data.paragraph1}
            onChange={(e) => setData({ ...data, paragraph1: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Paragraph 2</label>
          <Textarea
            value={data.paragraph2}
            onChange={(e) => setData({ ...data, paragraph2: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Skills</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-secondary rounded-full text-sm text-secondary-foreground flex items-center gap-1.5"
              >
                {skill}
                <button onClick={() => removeSkill(i)} className="hover:text-destructive">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill..."
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <Button variant="outline" size="sm" onClick={addSkill}>
              <Plus size={16} className="mr-1" /> Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
