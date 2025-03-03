document.getElementById("generate").addEventListener("click", generateCertificate);
document.getElementById("download").addEventListener("click", downloadCertificate);

function generateCertificate() {
    const name = document.getElementById("name").value.trim();
    let message = document.getElementById("message").value.trim();

    // Limit custom message to 10 words
    const words = message.split(/\s+/);
    if (words.length > 10) {
        message = words.slice(0, 10).join(" ");
        alert("Custom message is limited to 10 words.");
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "certificate-template.png";

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Name settings (150px)
        ctx.font = "bold 150px 'EB Garamond', serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(name.toUpperCase(), canvas.width / 2, canvas.height * 0.55);

        // Custom message settings (5px)
        ctx.font = "italic 5px 'EB Garamond', serif"; 
        ctx.fillText(message, canvas.width / 2, canvas.height * 0.63);

        document.getElementById("certificate").src = canvas.toDataURL("image/png");
    };
}

function downloadCertificate() {
    const link = document.createElement("a");
    link.download = "Japan_Tree_Certificate.png";
    link.href = document.getElementById("certificate").src;
    link.click();
}
