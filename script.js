window.onload = function () {
    const canvas = document.getElementById('certificateCanvas');
    const ctx = canvas.getContext('2d');

    const certificateImage = new Image();
    certificateImage.src = 'certificate-template.png';

    certificateImage.onload = function () {
        ctx.drawImage(certificateImage, 0, 0, canvas.width, canvas.height);
    };
};

function generateCertificate() {
    const canvas = document.getElementById('certificateCanvas');
    const ctx = canvas.getContext('2d');

    const name = document.getElementById('name').value.trim().toUpperCase();
    let message = document.getElementById('message').value.trim();

    // Limit message to 10 words
    const words = message.split(/\s+/);
    if (words.length > 10) {
        message = words.slice(0, 10).join(' ');
        alert("⚠️ Your message exceeded 10 words. Only the first 10 words were used.");
    }

    // Reload background
    const certificateImage = new Image();
    certificateImage.src = 'certificate-template.png';
    certificateImage.onload = function () {
        ctx.drawImage(certificateImage, 0, 0, canvas.width, canvas.height);

        ctx.textAlign = 'center';

        // Name - Big, bold, capitalized (200% bigger)
        ctx.font = '250px "EB Garamond", bold'; 
        ctx.fillStyle = 'black';
        ctx.fillText(name, canvas.width / 2, 1800);

        // Message - Smaller, normal style (same size as fixed text at bottom)
        ctx.font = '120px "EB Garamond", normal';
        ctx.fillText(message, canvas.width / 2, 2000);
    };
}

function downloadCertificate() {
    const canvas = document.getElementById('certificateCanvas');
    const link = document.createElement('a');
    link.download = 'Japan_Tree_Certificate.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
