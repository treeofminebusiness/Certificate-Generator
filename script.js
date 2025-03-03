// Wait for the page to load
window.onload = function() {
    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");

    const template = new Image();
    template.src = "certificate_template.png"; // Ensure this file is correctly linked

    template.onload = function() {
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
    };

    document.getElementById("generate").addEventListener("click", function() {
        const name = document.getElementById("nameInput").value;
        const message = document.getElementById("messageInput").value;

        if (!name) {
            alert("Please enter a name.");
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

        ctx.textAlign = "center";
        ctx.fillStyle = "black";

        // Font size scaling
        const scaleFactor = canvas.width / 800;  
        
        // Adjusted Name Formatting (15 times smaller)
        const nameFontSize = (125 / 15) * scaleFactor;  
        const nameY = 480; // Positioned below "OWNERSHIP" but above the line
        ctx.font = `bold ${nameFontSize}px serif`;
        ctx.fillText(name, canvas.width / 2, nameY);

        // Adjusted Message Formatting
        const messageFontSize = (22 / 15) * scaleFactor;  
        const messageY = nameY + 90;  // Positioned below the name
        ctx.font = `italic ${messageFontSize}px serif`;
        ctx.fillText(message, canvas.width / 2, messageY);
    });

    // Automatic PDF Download After Generation
    document.getElementById("download").addEventListener("click", function() {
        const link = document.createElement("a");
        link.download = "Certificate.pdf";
        link.href = canvas.toDataURL("image/pdf").replace("image/pdf", "application/pdf");
        link.click();
    });
};
