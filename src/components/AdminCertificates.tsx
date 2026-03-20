import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, Edit2, X, Upload, Image } from "lucide-react";

type CertCategory = "nsdc" | "hackerrank" | "hp_life" | "simplilearn" | "other";

interface Certificate {
  id: string;
  name: string;
  category: CertCategory;
  link: string;
  date: string;
  issuer: string;
  image_url: string;
  skills: string[];
  status: string;
  sort_order: number;
}

const categoryLabels: Record<CertCategory, string> = {
  nsdc: "NSDC Skill Certificate",
  hackerrank: "HackerRank Certificates",
  hp_life: "HP Life Certificates",
  simplilearn: "SimpliLearn Certificates",
  other: "Other Certificates",
};

const categoryOptions: CertCategory[] = ["nsdc", "hackerrank", "hp_life", "simplilearn", "other"];

const emptyCert: Omit<Certificate, "id"> = {
  name: "",
  category: "other",
  link: "",
  date: "",
  issuer: "",
  image_url: "",
  skills: [],
  status: "",
  sort_order: 0,
};

const AdminCertificates = () => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Certificate, "id">>(emptyCert);
  const [isAdding, setIsAdding] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchCerts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("sort_order", { ascending: true });
    setIsLoading(false);
    if (error) {
      toast({ title: "Failed to load certificates", variant: "destructive" });
    } else {
      setCerts((data as unknown as Certificate[]) || []);
    }
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("certificate-images").upload(path, file);
    setUploading(false);
    if (error) {
      toast({ title: "Upload failed", variant: "destructive" });
      return;
    }
    const { data: urlData } = supabase.storage.from("certificate-images").getPublicUrl(path);
    setForm({ ...form, image_url: urlData.publicUrl });
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    if (editingId) {
      const { error } = await supabase
        .from("certificates")
        .update({
          name: form.name,
          category: form.category,
          link: form.link,
          date: form.date,
          issuer: form.issuer,
          image_url: form.image_url,
          skills: form.skills,
          status: form.status,
          sort_order: form.sort_order,
          updated_at: new Date().toISOString(),
        } as any)
        .eq("id", editingId);
      if (error) {
        toast({ title: "Update failed", variant: "destructive" });
      } else {
        toast({ title: "Certificate updated" });
        setEditingId(null);
        fetchCerts();
      }
    } else {
      const { error } = await supabase
        .from("certificates")
        .insert({
          name: form.name,
          category: form.category,
          link: form.link,
          date: form.date,
          issuer: form.issuer,
          image_url: form.image_url,
          skills: form.skills,
          status: form.status,
          sort_order: form.sort_order,
        } as any);
      if (error) {
        toast({ title: "Failed to add certificate", variant: "destructive" });
      } else {
        toast({ title: "Certificate added" });
        setIsAdding(false);
        fetchCerts();
      }
    }
    setForm(emptyCert);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("certificates").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", variant: "destructive" });
    } else {
      setCerts(certs.filter((c) => c.id !== id));
      toast({ title: "Certificate deleted" });
    }
  };

  const startEdit = (cert: Certificate) => {
    setEditingId(cert.id);
    setIsAdding(false);
    setForm({
      name: cert.name,
      category: cert.category,
      link: cert.link,
      date: cert.date,
      issuer: cert.issuer,
      image_url: cert.image_url,
      skills: cert.skills,
      status: cert.status,
      sort_order: cert.sort_order,
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm(emptyCert);
  };

  const CertForm = () => (
    <div className="border border-border rounded-xl bg-card p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Name *</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <Label>Category</Label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as CertCategory })}
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{categoryLabels[c]}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Date</Label>
          <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="e.g. January 2026" />
        </div>
        <div>
          <Label>Issuer</Label>
          <Input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} />
        </div>
        <div>
          <Label>Link</Label>
          <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
        </div>
        <div>
          <Label>Status</Label>
          <Input value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} placeholder="e.g. In Progress" />
        </div>
        <div>
          <Label>Sort Order</Label>
          <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
        </div>
      </div>

      {/* Image upload */}
      <div>
        <Label>Certificate Image</Label>
        <div className="flex items-center gap-3 mt-1">
          {form.image_url && (
            <img src={form.image_url} alt="Preview" className="w-20 h-14 object-cover rounded border border-border" />
          )}
          <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm hover:bg-secondary transition-colors">
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload Image"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
          </label>
          {form.image_url && (
            <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, image_url: "" })}>
              <X size={14} />
            </Button>
          )}
        </div>
      </div>

      {/* Skills (for NSDC type) */}
      {form.category === "nsdc" && (
        <div>
          <Label>Skills</Label>
          <div className="flex gap-2 mt-1">
            <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="Add skill" />
            <Button variant="outline" size="sm" onClick={addSkill}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.skills.map((skill) => (
              <span key={skill} className="px-2 py-1 bg-secondary rounded-full text-xs flex items-center gap-1">
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-destructive"><X size={12} /></button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={handleSave}><Save size={16} className="mr-2" />{editingId ? "Update" : "Add"}</Button>
        <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
      </div>
    </div>
  );

  // Group by category
  const grouped = categoryOptions.reduce((acc, cat) => {
    acc[cat] = certs.filter((c) => c.category === cat);
    return acc;
  }, {} as Record<CertCategory, Certificate[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Certificates ({certs.length})</h2>
        {!isAdding && !editingId && (
          <Button size="sm" onClick={() => { setIsAdding(true); setForm(emptyCert); }}>
            <Plus size={16} className="mr-2" />Add Certificate
          </Button>
        )}
      </div>

      {(isAdding || editingId) && <CertForm />}

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        categoryOptions.map((cat) =>
          grouped[cat].length > 0 ? (
            <div key={cat} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">{categoryLabels[cat]}</h3>
              <div className="space-y-2">
                {grouped[cat].map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between gap-3 p-3 border border-border rounded-xl bg-card">
                    <div className="flex items-center gap-3 min-w-0">
                      {cert.image_url && <img src={cert.image_url} alt="" className="w-12 h-8 object-cover rounded" />}
                      {!cert.image_url && <Image size={16} className="text-muted-foreground shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{cert.name}</p>
                        <p className="text-xs text-muted-foreground">{cert.date}{cert.issuer ? ` • ${cert.issuer}` : ""}{cert.status ? ` • ${cert.status}` : ""}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(cert)}><Edit2 size={14} /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(cert.id)} className="hover:text-destructive"><Trash2 size={14} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
};

export default AdminCertificates;
