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
        const scaleFactor = Math.min(window.innerWidth / img.width, 1);
        const canvasWidth = img.width * scaleFactor;
        const canvasHeight = img.height * scaleFactor;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

        // **Font Settings (Same as "OWNERSHIP")**
        const ownershipFontSize = 90 * scaleFactor;
        ctx.font = `bold ${ownershipFontSize}px serif`;
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        // **Move text 10 times down**
        const moveDown = 10 * (ownershipFontSize / 2); // Move down based on font size

        // **Name Position (Under 'OWNERSHIP')**
        const nameY = (canvasHeight * 0.42) + moveDown;  

        // **Message Position (Above Second Underline)**
        const messageY = (canvasHeight * 0.50) + moveDown;  

        ctx.fillText(name, canvasWidth / 2, nameY);
        ctx.font = `italic ${ownershipFontSize / 2}px serif`;  
        ctx.fillText(message, canvasWidth / 2, messageY);

        // **Auto-download PDF**
        downloadPDF(canvas);
    };

    img.onerror = function() {
        alert("Error: Certificate template image not found.");
    };
});

// **Auto PDF Download**
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
