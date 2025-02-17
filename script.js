const ApiUrl = 'https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889';
let data = [];

const fetchData = async () => {
    try {
        const response = await fetch(ApiUrl);
        data = await response.json();
        dataSet();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

fetchData();

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

function dataSet() {
    const cartTableBody = document.getElementById('cartTableBody');
    cartTableBody.innerHTML = '';

    data.items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img class="productImage" src="${item.image}" alt="${item.product_title}"></td>
            <td style="color: rgba(159, 159, 159, 1);">${item.product_title}</td>
            <td style="color: rgba(159, 159, 159, 1);">Rs. ${formatCurrency(item.price / 100)}</td>
            <td><button id="price">${item.quantity}</button></td>
            <td>Rs. ${formatCurrency((item.price * item.quantity) / 100)}</td>
            <td><button class="delete-btn" onclick="removeItem(${index})"><img src="./assets/delete.svg"/></button></td>
        `;
        cartTableBody.appendChild(row);
    });

    const CardContainer = document.getElementById('productCart');
    CardContainer.innerHTML = '';

    data.items.forEach((item, index) => {
        const card = document.createElement('div'); 
        card.classList.add('card'); 

        card.innerHTML = `
         
            <img src="${item.image}" alt=""/>
            <div class="left">
            <h2>${item.product_title}</h2>
            <div class='row'>
                <h4>${item.quantity}</h4>
                <h4> ${formatCurrency(item.price / 100)}</h4>
            </div></div>
           
        `;

        CardContainer.appendChild(card);
    });

    document.getElementById('SubTotal').innerText = formatCurrency(data.items_subtotal_price / 100);
    document.getElementById('Total').innerText = formatCurrency(data.items_subtotal_price / 100);
}
