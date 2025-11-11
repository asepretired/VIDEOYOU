async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const result = document.getElementById("result");

  if (!fileInput.files.length) {
    result.innerText = "Pilih file terlebih dahulu.";
    return;
  }

  const file = fileInput.files[0];
  result.innerText = "Mengupload...";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("https://transfer.sh/", {
      method: "POST",
      body: file
    });
    const link = await res.text();
    result.innerHTML = `
      <p>Upload selesai!</p>
      <a href="${link.trim()}" target="_blank">${link.trim()}</a>
    `;
    await navigator.clipboard.writeText(link.trim());
  } catch (e) {
    result.innerText = "Gagal upload: " + e.message;
  }
}
