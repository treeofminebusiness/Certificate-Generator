document.getElementById('certificate-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    let message = document.getElementById('message').value.trim();

    // Limit message to 10 words
    const wordCount = message.split(/\s+/).length;
    if (wordCount > 10) {
        alert("Your personal message must be 10 words or fewer.");
        return;
    }

    // Load the certificate image
    const canvas = document.getElementById('certificate-canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = "certificate_template.png";  // Make sure the template is updated

    image.onload = function () {
        // Set canvas size to match the certificate image
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the certificate image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Customize text styling
        ctx.fillStyle = "black";
        ctx.textAlign = "center";

        // Insert Name (Bigger & Positioned Correctly)
        ctx.font = "bold 80px Times New Roman";  // Match original font
        ctx.fillText(name, canvas.width / 2, canvas.height * 0.48); // Adjust position

        // Insert Message (Smaller & Below Name)
        ctx.font = "40px Times New Roman"; // Match original style
        ctx.fillText(message, canvas.width / 2, canvas.height * 0.55); // Adjust position

        // Convert canvas to PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("certificate.pdf");
    };
});
