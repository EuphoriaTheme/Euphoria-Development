document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');

    productList.addEventListener('click', function (event) {
        const productCard = event.target.closest('.col');
        if (productCard) {
            const productName = productCard.querySelector('h4').innerText;
            fetch('assets/data/products.json')
                .then(response => response.json())
                .then(data => {
                    const product = data.find(p => p.name === productName);
                    if (product) {
                        showModal(product);
                    }
                });
        }
    });

    function showModal(product) {
        const modal = document.createElement('div');
        modal.classList.add('modal', 'fade');
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${product.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${product.image}" class="img-fluid" alt="${product.name}">
                        <p>${product.description}</p>
                        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                        <p><strong>User Count:</strong> <span id="user-count">100</span></p>
                        <a href="#" class="btn btn-primary">Download</a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();

        modal.addEventListener('hidden.bs.modal', function () {
            modal.remove();
        });
    }
});