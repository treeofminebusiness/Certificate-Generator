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
    img.src = 'certificate_template.png'; // Make sure this file exists in your GitHub repo

    img.onload = function () {
        // Set canvas size to match the certificate template
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Set text styles to match "OWNERSHIP"
        ctx.font = '70px serif'; // Adjusted to match "OWNERSHIP" font size
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        // Draw the Name in the correct marked area
        ctx.fillText(name, canvas.width / 2, 600); // Adjust Y-position as needed

        // Draw the Message below the name, still above the thin line
        ctx.font = '30px serif';
        ctx.fillText(message, canvas.width / 2, 680);

        // Automatically download the PDF
        downloadPDF();
    };

    img.onerror = function() {
        alert("Error: Certificate template image not found. Make sure it's uploaded correctly.");
    };
});

// Function to download the PDF automatically
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
