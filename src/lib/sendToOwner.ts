export async function sendToOwner(fields: Record<string, string>, source: string): Promise<void> {
  const clean: Record<string, string> = { formular: source };
  for (const [key, value] of Object.entries(fields)) if (String(value ?? "").trim()) clean[key] = String(value).trim();
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email ?? "") ? clean.email : "noreply@webild.io";
  const res = await fetch(`${import.meta.env.VITE_API_URL}/emails/projects/${import.meta.env.VITE_PROJECT_ID}/sendMail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fromEmail: email, message: clean.message || source, formData: clean }),
  });
  if (!res.ok) throw new Error("send failed");
}
