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

        // **Restored Name Placement**
        ctx.font = '120px YOUR_FONT_HERE';  // Adjusted back to original working size
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, 950);  // Adjusted back to old position

        // **Restored Message Placement**
        ctx.font = '50px YOUR_FONT_HERE'; // Adjusted back to previous size
        ctx.fillText(message, canvas.width / 2, 1100);  // Adjusted back to old position

        const link = document.createElement('a');
        link.download = 'certificate.pdf';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
});
