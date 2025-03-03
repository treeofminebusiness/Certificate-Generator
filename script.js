document.getElementById('certificate-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (message.split(' ').length > 10) {
        alert("Your message must be 10 words or fewer.");
        return;
    }

    const canvas = document.getElementById('certificate-canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = 'certificate_template.png';

    img.onload = function () {
        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Text settings to match "OWNERSHIP"
        ctx.font = '70px serif'; // Match font size
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        // Positioning for name (inside the red-marked area)
        ctx.fillText(name, canvas.width / 2, 500); // Adjust Y-coordinate as needed

        // Positioning for message below the name but above the second underline
        ctx.font = '30px serif';
        ctx.fillText(message, canvas.width / 2, 580);

        // Auto-download PDF
        downloadPDF();
    };

    img.onerror = function() {
        alert("Error: Certificate template image not found.");
    };
});

// Auto-download function
function downloadPDF() {
    const canvas = document.getElementById('certificate-canvas');
    const imgData = canvas.toDataURL('image/png');

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('Certificate.pdf');
}
