document.getElementById("generate").addEventListener("click", function () {
    const name = document.getElementById("name").value.toUpperCase();
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.src = "certificate_template.png";  // Make sure this file exists in the correct path
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Name Styling
        ctx.font = "150px 'EB Garamond'";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, canvas.height * 0.58); // Keep only the name

        document.getElementById("certificate").src = canvas.toDataURL();
    };
});
