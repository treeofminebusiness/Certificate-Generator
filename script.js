document.getElementById("generate").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim().toUpperCase() || "YOUR NAME";
    const message = document.getElementById("message").value.trim() || "Custom message here";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = "./certificate_template.png";  // Ensure correct path
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Name Styling
        ctx.font = "150px 'EB Garamond'";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, canvas.height * 0.58);

        // Custom Message Styling (Raised & Visible)
        ctx.font = "25px 'EB Garamond'";
        ctx.fillStyle = "black";
        ctx.fillText(message, canvas.width / 2, canvas.height * 0.60);  // Moved up slightly

        const certificateElement = document.getElementById("certificate");
        if (certificateElement) {
            certificateElement.src = canvas.toDataURL();
        } else {
            console.error("Element with ID 'certificate' not found!");
        }
    };

    img.onerror = function () {
        console.error("Failed to load image: " + img.src);
    };
});
