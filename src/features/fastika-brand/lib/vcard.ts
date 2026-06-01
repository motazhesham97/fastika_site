/**
 * Helper to generate and download a client-side vCard (.vcf) file
 */
export function downloadVCard(name: string, phone: string, email: string, location: string) {
  const cleanPhone = phone.replace(/[^\d+]/g, ""); // strip non-numeric characters except +
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `ORG:${name}`,
    `TEL;TYPE=CELL,VOICE:${cleanPhone}`,
    `EMAIL;TYPE=PREF,INTERNET:${email}`,
    `ADR;TYPE=WORK:;;${location};;;;`,
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${name.replace(/\s+/g, "_")}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
