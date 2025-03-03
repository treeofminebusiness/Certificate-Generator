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

        // Set text styles to match the certificate
        ctx.font = '50px serif'; // Adjust size and font to match
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        // Draw the Name in the correct spot
        ctx.fillText(name, canvas.width / 2, 400);

        // Draw the Message below the name
        ctx.font = '30px serif';
        ctx.fillText(message, canvas.width / 2, 450);

        // Make download button visible
        document.getElementById('download-btn').style.display = 'block';
    };

    img.onerror = function() {
        alert("Error: Certificate template image not found. Make sure it's uploaded correctly.");
    };
});

document.getElementById('download-btn').addEventListener('click', function () {
    const canvas = document.getElementById('certificate-canvas');
    const imgData = canvas.toDataURL('image/png');

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('Certificate.pdf');
});
