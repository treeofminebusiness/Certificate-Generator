document.getElementById("generate").addEventListener("click", function () {
    const name = document.getElementById("name").value.toUpperCase();
    const message = document.getElementById("message").value;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Use an absolute or correct relative path
    img.src = "./certificate_template.png";  // Ensure this file exists in the project folder

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Name Styling
        ctx.font = "150px 'EB Garamond'";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, canvas.height * 0.58);

        // Custom Message Styling (Fixed size & positioning)
        ctx.font = "15px 'EB Garamond'";  // Adjusted to 15px
        ctx.fillStyle = "black";
        ctx.fillText(message, canvas.width / 2, canvas.height * 0.65);  // Moved higher

        // Set the generated image
        document.getElementById("certificate").src = canvas.toDataURL();
    };

    img.onerror = function () {
        console.error("Error loading certificate template. Check the file path.");
        alert("Certificate template not found. Make sure 'certificate_template.png' is in the correct location.");
    };
});

// Download Function
document.getElementById("download").addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = document.getElementById("certificate").src;
    link.download = "Japan_Tree_Certificate.png";
    link.click();
});
