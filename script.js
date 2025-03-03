document.getElementById('certificate-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = 'certificate_template.png'; // Make sure this file is in your repository

    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const scaleFactor = canvas.width / 1000; // Adjust size dynamically

        // **Custom Name Placement & Size (50% smaller than last version)**
        const nameFontSize = (125 / 15 / 2) * scaleFactor; // 50% smaller
        ctx.font = `bold ${nameFontSize}px "YourCertificateFont"`;
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        const nameX = canvas.width / 2;
        const nameY = canvas.height * 0.57; // Positioned under "OWNERSHIP"
        ctx.fillText(name, nameX, nameY);

        // **Custom Message Placement & Size (50% smaller than last version)**
        const messageFontSize = (22 / 15 / 2) * scaleFactor; // 50% smaller
        ctx.font = `bold ${messageFontSize}px "YourCertificateFont"`;

        const messageX = canvas.width / 2;
        const messageY = nameY + 90; // Positioned just below the name
        ctx.fillText(message, messageX, messageY);

        // Convert canvas to PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('certificate.pdf');
    };
});
