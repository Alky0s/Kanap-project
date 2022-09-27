function confirmationPage () {
    const getOrderId = localStorage.getItem('orderId');
    document.getElementById('orderId').innerHTML = `${getOrderId}`;
    localStorage.clear();
}
confirmationPage();