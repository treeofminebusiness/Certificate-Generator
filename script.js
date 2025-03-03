// Load the certificate template
const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");
const template = new Image();
template.src = "certificate-template.png"; // Ensure this matches the correct filename

// Adjust A4 size for clarity
canvas.width = 794; // A4 width
canvas.height = 1123; // A4 height

// Ensure the image is drawn properly
template.onload = function () {
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
};

// Function to generate the certificate
function generateCertificate() {
    // Clear the canvas and redraw the template
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

    // Get user input
    let name = document.getElementById("nameInput").value.toUpperCase();
    let message = document.getElementById("messageInput").value;

    // Limit message to 10 words
    let words = message.split(/\s+/);
    if (words.length > 10) {
        document.getElementById("warning").style.display = "block";
        message = words.slice(0, 10).join(" ");
    } else {
        document.getElementById("warning").style.display = "none";
    }

    // Text properties
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    // **NAME SETTINGS**
    ctx.font = "bold 72px 'EB Garamond'"; // 200% bigger
    ctx.fillText(name, canvas.width / 2, 550); // Adjusted to fit above the second line

    // **MESSAGE SETTINGS**
    ctx.font = "italic 32px 'EB Garamond'"; // Thinner font
    ctx.fillText(message, canvas.width / 2, 600); // Adjusted to align with design

}

// Function to download certificate
function downloadCertificate() {
    const link = document.createElement("a");
    link.download = "Japan_Tree_Certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}
