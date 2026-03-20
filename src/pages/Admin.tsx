import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Mail, Trash2, RefreshCw, ArrowLeft, FolderKanban, UserCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import AdminProjects from "@/components/AdminProjects";
import AdminAbout from "@/components/AdminAbout";
import AdminCertificates from "@/components/AdminCertificates";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"messages" | "projects" | "about" | "certificates">("messages");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      } else {
        fetchMessages();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchMessages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    setIsLoading(false);
    if (error) {
      toast({ title: "Failed to load messages", variant: "destructive" });
    } else {
      setMessages(data || []);
    }
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Failed to delete message", variant: "destructive" });
    } else {
      setMessages(messages.filter((m) => m.id !== id));
      toast({ title: "Message deleted" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) return null;

  const tabs = [
    { id: "messages" as const, label: "Messages", icon: Mail, count: messages.length },
    { id: "projects" as const, label: "Projects", icon: FolderKanban },
    { id: "about" as const, label: "About", icon: UserCircle },
    { id: "certificates" as const, label: "Certificates", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
            <h1 className="text-xl font-serif font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
              {tab.count !== undefined && (
                <span className="px-1.5 py-0.5 bg-secondary rounded-full text-xs">{tab.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "messages" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">
                Contact Messages ({messages.length})
              </h2>
              <Button variant="outline" size="sm" onClick={fetchMessages} disabled={isLoading}>
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 border border-border rounded-xl bg-card">
                <Mail size={40} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="border border-border rounded-xl bg-card p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium truncate">{msg.name}</span>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-primary hover:underline text-sm truncate"
                          >
                            {msg.email}
                          </a>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                          {formatDate(msg.created_at)}
                        </p>
                        <p className="text-foreground whitespace-pre-wrap">{msg.message}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMessage(msg.id)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "projects" && <AdminProjects />}
        {activeTab === "about" && <AdminAbout />}
        {activeTab === "certificates" && <AdminCertificates />}
      </main>
    </div>
  );
};

export default Admin;
