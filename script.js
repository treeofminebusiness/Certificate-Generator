document.getElementById('certificate-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = 'certificate_template.png'; // Ensure this file is correctly placed in your project

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // **Name (250px, centered)**
        ctx.font = '250px YOUR_FONT_HERE';  // Keep it at 250px
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, 950);  // Positioning remains the same

        // **Message (50px, adjusted position)**
        ctx.font = '50px YOUR_FONT_HERE'; 
        ctx.fillText(message, canvas.width / 2, 1120);  // Slightly adjusted lower

        // **Convert to PDF**
        html2canvas(canvas).then((capturedCanvas) => {
            const imgData = capturedCanvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('certificate.pdf');
        });
    };
});
