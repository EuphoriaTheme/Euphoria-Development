document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');

    productList.addEventListener('click', function (event) {
        const productLink = event.target.closest('.product-link');
        if (productLink) {
            const productId = productLink.getAttribute('data-id');
            fetch('assets/data/products.json')
                .then(response => response.json())
                .then(data => {
                    const product = data[productId];
                    if (product) {
                        showModal(product);
                    }
                });
            event.preventDefault(); // Prevent default link behavior
        }
    });

    function showModal(product) {
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalDownloadLink').href = product.downloadLink;
    
        // Populate screenshots
        const screenshotsContainer = document.getElementById('modalScreenshots');
        screenshotsContainer.innerHTML = ''; // Clear previous screenshots
        product.screenshots.forEach(screenshot => {
            const img = document.createElement('img');
            img.src = screenshot;
            img.alt = `${product.name} Screenshot`;
            img.className = 'img-thumbnail shadow-sm';
            img.style.width = '100px';
            img.style.height = 'auto';
            screenshotsContainer.appendChild(img);
        });
    
        modal.show();
    }
});