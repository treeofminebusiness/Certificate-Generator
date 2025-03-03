document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");
    const bg = new Image();
    bg.src = "certificate-template.png"; // ✅ Make sure this file exists in the same folder

    // ✅ Set Canvas to A4 size (Portrait: 2480 x 3508)
    canvas.width = 2480;
    canvas.height = 3508;

    bg.onload = function () {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    };
});

// Generate certificate with name and message
function generateCertificate() {
    let name = document.getElementById("nameInput").value.trim();
    let message = document.getElementById("messageInput").value.trim();

    if (!name) {
        alert("Please enter a name.");
        return;
    }

    // ✅ Convert name to ALL CAPS
    name = name.toUpperCase();

    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");

    // ✅ CLEAR the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bg = new Image();
    bg.src = "certificate-template.png"; // ✅ Ensure the file exists

    bg.onload = function () {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // ✅ Name is 200% bigger than before (super large)
        ctx.font = "bold 400px 'EB Garamond', serif";  
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, canvas.height * 0.72);  

        // ✅ Limit message to 10 words
        const words = message.split(" ");
        if (words.length > 10) {
            alert("Your message is too long! Only the first 10 words will be used.");
            message = words.slice(0, 10).join(" ");
        }

        // ✅ Message has a thinner font, like the fixed writing at the bottom
        ctx.font = "300px 'EB Garamond', serif";  
        ctx.fillText(message, canvas.width / 2, canvas.height * 0.78);
    };

    bg.onerror = function () {
        alert("Error loading certificate image! Check the file name and path.");
    };
}

// Download the certificate
function downloadCertificate() {
    const canvas = document.getElementById("certificateCanvas");
    const link = document.createElement("a");

    // ✅ Ensure high-quality A4 download
    link.download = "Japan_Tree_Certificate.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
}
