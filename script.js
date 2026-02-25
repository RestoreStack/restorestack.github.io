const API_ENDPOINT = "https://api.restorestack.com/submit"; 
// nanti ganti dengan endpoint tunnel kamu

const form = document.getElementById("restoreForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const snapshotUrl = document.getElementById("snapshotUrl").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!snapshotUrl.includes("web.archive.org")) {
        message.textContent = "Invalid Wayback URL.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Submitting request...";
    message.style.color = "#94a3b8";

    try {
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                snapshotUrl: snapshotUrl,
                email: email
            })
        });

        if (response.ok) {
            message.textContent = "Restore request submitted successfully.";
            message.style.color = "lightgreen";
            form.reset();
        } else {
            message.textContent = "Server error. Try again later.";
            message.style.color = "red";
        }

    } catch (error) {
        message.textContent = "Unable to connect to server.";
        message.style.color = "red";
    }
});
