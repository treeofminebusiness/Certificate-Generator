document.getElementById('certificateForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const canvas = document.getElementById('certificateCanvas');
    const ctx = canvas.getContext('2d');

    // Load certificate template
    const img = new Image();
    img.src = 'certificate_template.png'; // Make sure this path matches your uploaded file

    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Add name
        ctx.font = "40px Times New Roman";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(name, 400, 300); // Adjust position to match "NAME" placement

        // Add message
        ctx.font = "20px Times New Roman";
        ctx.fillText(message, 400, 350); // Adjust position as needed

        // Convert to PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("certificate.pdf");
    };
});
