// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");
    const bg = new Image();
    bg.src = "certificate-template.jpg"; // Replace with your actual certificate image URL

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Load and draw the background when the image is ready
    bg.onload = function () {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    };
});

// Function to generate the certificate
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
    bg.src = "certificate-template.jpg"; // Make sure this image exists

    bg.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // Set font styles
        ctx.font = "40px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";

        // Place the name in the certificate
        ctx.fillText(name, canvas.width / 2, 280);

        // Limit message to 10 words
        const words = message.split(" ").slice(0, 10);
        message = words.join(" ");

        // Display the message below the name
        ctx.font = "25px Arial";
        ctx.fillText(message, canvas.width / 2, 340);
    };
}

// Function to download the certificate
function downloadCertificate() {
    const canvas = document.getElementById("certificateCanvas");
    const link = document.createElement("a");
    link.download = "Japan_Tree_Certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}
