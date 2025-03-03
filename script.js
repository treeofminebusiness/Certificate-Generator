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
        // **Dynamic Scaling for Mobile**
        const scaleFactor = Math.min(window.innerWidth / img.width, 1); // Scale down for small screens
        const canvasWidth = img.width * scaleFactor;
        const canvasHeight = img.height * scaleFactor;

        // Apply new dimensions
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

        // **Adjust Text Size Based on Scale**
        const nameFontSize = 70 * scaleFactor;
        const messageFontSize = 30 * scaleFactor;

        ctx.font = `${nameFontSize}px serif`;
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        // **Positioning Text Dynamically**
        ctx.fillText(name, canvasWidth / 2, 500 * scaleFactor); // Adjust Y as needed
        ctx.font = `${messageFontSize}px serif`;
        ctx.fillText(message, canvasWidth / 2, 580 * scaleFactor);

        // **Auto-download PDF**
        downloadPDF(canvas);
    };

    img.onerror = function() {
        alert("Error: Certificate template image not found.");
    };
});

// **Updated PDF Download (Mobile Optimized)**
function downloadPDF(canvas) {
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
