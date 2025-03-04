document.getElementById("generate").addEventListener("click", function () {
    const name = document.getElementById("name").value.toUpperCase();

    if (!name) {
        alert("Please enter a name.");
        return;
    }

    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = "certificate-template.png"; // Make sure this file is in the same directory

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Name Styling
        ctx.font = "150px 'EB Garamond'";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, canvas.height * 0.58);

        // Enable Download
        const downloadLink = document.getElementById("download");
        downloadLink.href = canvas.toDataURL();
        downloadLink.style.display = "block";
        downloadLink.textContent = "Download Your Certificate";
    };
});
