const orderId = getOrderId();
confirmationPage(orderId);
// Get orderId from the URL
function getOrderId() {
    return new URL(window.location.href).searchParams.get("orderId");
}
// Display the orderId after confirmation page redirection, and clear the localstorage
function confirmationPage (orderId) {
    document.getElementById("orderId").textContent = orderId;
    localStorage.clear();
}
    
