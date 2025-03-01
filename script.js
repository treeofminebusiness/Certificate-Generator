document.getElementById('certificate-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  
  document.getElementById('customer-name').textContent = name;
  document.getElementById('customer-message').textContent = message;
  
  const certificateElement = document.getElementById('certificate-template');
  certificateElement.style.display = 'block';
  
  html2canvas(certificateElement).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('Certificate.pdf');

    certificateElement.style.display = 'none';
  });
});
