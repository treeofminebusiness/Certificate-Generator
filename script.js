document.getElementById('certificate-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = 'certificate_template.png'; // Ensure this file exists in your project

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // **Name (250px)**
        ctx.font = '250px YOUR_FONT_HERE';  // Reduced from 300px to 250px
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, 950);  // Same position, slightly smaller text

        // **Message (50px, slightly lower)**
        ctx.font = '50px YOUR_FONT_HERE'; 
        ctx.fillText(message, canvas.width / 2, 1120);  // Adjusted position slightly lower

        const link = document.createElement('a');
        link.download = 'certificate.png'; // Save as PNG instead of PDF first
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
});
