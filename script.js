document.getElementById('certificate-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = 'certificate_template.png'; // Make sure this is correct

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // **Name (200% Bigger)**
        ctx.font = '240px YOUR_FONT_HERE';  // Previously 120px, now doubled
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, 950);  // Same position, just bigger

        // **Message (Same as Before)**
        ctx.font = '50px YOUR_FONT_HERE'; // Keeping message size the same
        ctx.fillText(message, canvas.width / 2, 1100);  // Same position

        const link = document.createElement('a');
        link.download = 'certificate.pdf';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
});
