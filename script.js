document.getElementById('certificate-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (message.split(' ').length > 10) {
        alert("Your message must be 10 words or fewer.");
        return;
    }

    const canvas = document.getElementById('certificate-canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = 'certificate_template.png'; // Ensure this file is correctly uploaded

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Style for Name
        ctx.font = '50px serif'; // Adjust to match original certificate
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, 400); // Adjust position to fit "NAME" section

        // Style for Message
        ctx.font = '30px serif';
        ctx.fillText(message, canvas.width / 2, 450); // Adjust to place under the name

        document.getElementById('download-btn').style.display = 'block';
    };
});

document.getElementById('download-btn').addEventListener('click', function () {
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
});
