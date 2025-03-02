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
    image.src = "certificate_template.png";  // Make sure this matches your uploaded image filename

    image.onload = function () {
        // Set canvas size to match the certificate image
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the certificate image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Customize text styling
        ctx.font = "bold 50px Arial";  // Adjust font size as needed
        ctx.fillStyle = "black";
        ctx.textAlign = "center";

        // Insert the Name at the correct position
        ctx.fillText(name, canvas.width / 2, canvas.height / 2);

        // Insert the Message below the name
        ctx.font = "30px Arial";
        ctx.fillText(message, canvas.width / 2, canvas.height / 2 + 100);

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
