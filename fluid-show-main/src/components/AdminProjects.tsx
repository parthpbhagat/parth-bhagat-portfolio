import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Save, X, Upload, GripVertical, Star, Image as ImageIcon } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  github: string;
  featured: boolean;
  highlights: string[];
  sort_order: number;
  images?: { id: string; image_url: string; sort_order: number }[];
}

const colorOptions = [
  { label: "Blue/Cyan", value: "from-blue-500/20 to-cyan-600/20" },
  { label: "Amber/Orange", value: "from-amber-500/20 to-orange-600/20" },
  { label: "Emerald/Teal", value: "from-emerald-500/20 to-teal-600/20" },
  { label: "Red/Orange", value: "from-red-500/20 to-orange-600/20" },
  { label: "Indigo/Blue", value: "from-indigo-500/20 to-blue-600/20" },
  { label: "Purple/Pink", value: "from-purple-500/20 to-pink-600/20" },
  { label: "Amber/Yellow", value: "from-amber-600/20 to-yellow-600/20" },
];

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const emptyProject = {
    title: "",
    description: "",
    tags: [] as string[],
    color: colorOptions[0].value,
    github: "",
    featured: false,
    highlights: [] as string[],
    sort_order: 0,
  };

  const [form, setForm] = useState(emptyProject);
  const [tagsInput, setTagsInput] = useState("");
  const [highlightsInput, setHighlightsInput] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "Failed to load projects", variant: "destructive" });
    } else {
      // Fetch images for each project
      const projectsWithImages = await Promise.all(
        (data || []).map(async (p: any) => {
          const { data: images } = await supabase
            .from("project_images")
            .select("*")
            .eq("project_id", p.id)
            .order("sort_order", { ascending: true });
          return { ...p, images: images || [] };
        })
      );
      setProjects(projectsWithImages);
    }
    setIsLoading(false);
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyProject, sort_order: projects.length });
    setTagsInput("");
    setHighlightsInput("");
    setShowForm(true);
  };

  const openEditForm = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      tags: project.tags,
      color: project.color,
      github: project.github,
      featured: project.featured,
      highlights: project.highlights,
      sort_order: project.sort_order,
    });
    setTagsInput(project.tags.join(", "));
    setHighlightsInput(project.highlights.join(", "));
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean),
      color: form.color,
      github: form.github.trim(),
      featured: form.featured,
      highlights: highlightsInput.split(",").map(h => h.trim()).filter(Boolean),
      sort_order: form.sort_order,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      const { error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", editingId);
      if (error) {
        toast({ title: "Failed to update", variant: "destructive" });
        return;
      }
      toast({ title: "Project updated!" });
    } else {
      const { error } = await supabase
        .from("projects")
        .insert(payload);
      if (error) {
        toast({ title: "Failed to add project", variant: "destructive" });
        return;
      }
      toast({ title: "Project added!" });
    }

    setShowForm(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast({ title: "Failed to delete", variant: "destructive" });
    } else {
      toast({ title: "Project deleted" });
      fetchProjects();
    }
  };

  const handleImageUpload = async (projectId: string, files: FileList) => {
    setUploading(true);
    const project = projects.find(p => p.id === projectId);
    const startOrder = project?.images?.length || 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop();
      const path = `${projectId}/${Date.now()}-${i}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(path, file);

      if (uploadError) {
        toast({ title: `Failed to upload ${file.name}`, variant: "destructive" });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(path);

      await supabase.from("project_images").insert({
        project_id: projectId,
        image_url: urlData.publicUrl,
        sort_order: startOrder + i,
      });
    }

    setUploading(false);
    toast({ title: "Images uploaded!" });
    fetchProjects();
  };

  const handleDeleteImage = async (imageId: string) => {
    const { error } = await supabase.from("project_images").delete().eq("id", imageId);
    if (error) {
      toast({ title: "Failed to delete image", variant: "destructive" });
    } else {
      fetchProjects();
    }
  };

  if (isLoading) return <div className="text-center py-8 text-muted-foreground">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Projects ({projects.length})</h2>
        <Button size="sm" onClick={openAddForm}>
          <Plus size={16} className="mr-2" /> Add Project
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="border border-border rounded-xl bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{editingId ? "Edit Project" : "New Project"}</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X size={18} />
            </Button>
          </div>

          <Input
            placeholder="Project title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            maxLength={200}
          />
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            maxLength={1000}
          />
          <Input
            placeholder="GitHub URL"
            value={form.github}
            onChange={e => setForm({ ...form, github: e.target.value })}
            maxLength={500}
          />
          <Input
            placeholder="Tags (comma separated): Power BI, DAX, Data Visualization"
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
          />
          <Input
            placeholder="Highlights (comma separated): $24.9M Revenue, 25K Orders"
            value={highlightsInput}
            onChange={e => setHighlightsInput(e.target.value)}
          />

          <div className="flex flex-wrap gap-4 items-center">
            <label className="text-sm text-muted-foreground">Color:</label>
            <select
              value={form.color}
              onChange={e => setForm({ ...form, color: e.target.value })}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
            >
              {colorOptions.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => setForm({ ...form, featured: e.target.checked })}
                className="rounded"
              />
              <Star size={16} className={form.featured ? "text-primary" : "text-muted-foreground"} />
              Featured
            </label>

            <Input
              type="number"
              placeholder="Sort order"
              value={form.sort_order}
              onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
              className="w-24"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" /> Save
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Project List */}
      {projects.length === 0 ? (
        <div className="text-center py-12 border border-border rounded-xl bg-card">
          <p className="text-muted-foreground">No projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} className="border border-border rounded-xl bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {project.featured && <Star size={14} className="text-primary fill-primary" />}
                    <h3 className="font-medium truncate">{project.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-secondary rounded-full text-xs text-secondary-foreground">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => openEditForm(project)}>
                    <Edit2 size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="hover:text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              {/* Images section */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <ImageIcon size={14} /> Images ({project.images?.length || 0})
                  </span>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={e => e.target.files && handleImageUpload(project.id, e.target.files)}
                    />
                    <span className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                      <Upload size={14} /> {uploading ? "Uploading..." : "Upload"}
                    </span>
                  </label>
                </div>
                {project.images && project.images.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {project.images.map(img => (
                      <div key={img.id} className="relative group aspect-video bg-muted rounded-lg overflow-hidden">
                        <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={() => handleDeleteImage(img.id)}
                          className="absolute top-1 right-1 p-1 bg-destructive/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
