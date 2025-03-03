document.getElementById("generate").addEventListener("click", function () {
    const name = document.getElementById("name").value.toUpperCase();
    const message = document.getElementById("message").value;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.src = "certificate_template.png";  // Ensure this file is in the correct path
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Name Styling
        ctx.font = "150px 'EB Garamond'";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, canvas.height * 0.58);

        // Custom Message Styling (Moved 10 times higher)
        ctx.font = "15px 'EB Garamond'";  
        ctx.fillStyle = "black";
        ctx.fillText(message, canvas.width / 2, canvas.height * 0.52);  // Lifted higher

        document.getElementById("certificate").src = canvas.toDataURL();
    };
});
