const orderId = getOrderId();
confirmationPage(orderId);

function getOrderId() {
    return new URL(window.location.href).searchParams.get("orderId");
}
function confirmationPage (orderId) {
    document.getElementById('orderId').textContent = orderId;
    localStorage.clear();
}
    
