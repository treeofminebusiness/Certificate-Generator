document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");
    const bg = new Image();
    bg.src = "certificate-template.png"; // ✅ Make sure this file exists

    // ✅ Set Canvas to A4 size (Portrait: 2480 x 3508)
    canvas.width = 2480;
    canvas.height = 3508;

    bg.onload = function () {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    };
});

// Generate certificate with name and message
function generateCertificate() {
    const name = document.getElementById("nameInput").value.trim();
    let message = document.getElementById("messageInput").value.trim();

    if (!name) {
        alert("Please enter a name.");
        return;
    }

    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");

    const bg = new Image();
    bg.src = "certificate-template.png"; // ✅ Ensure the file is correctly named

    bg.onload = function () {
        // ✅ CLEAR CANVAS TO FORCE REDRAW
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // ✅ Move the name **EXACTLY TO THE MIDDLE**
        ctx.font = "150px 'EB Garamond', serif";  
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, canvas.height / 2 - 100);

        // ✅ Limit message to 10 words
        const words = message.split(" ").slice(0, 10);
        message = words.join(" ");

        // ✅ Move message **RIGHT BELOW the name**
        ctx.font = "100px 'EB Garamond', serif";  
        ctx.fillText(message, canvas.width / 2, canvas.height / 2 + 50);
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
