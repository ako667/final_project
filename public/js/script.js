$(document).ready(function() {
    let cartCount = 0;
    let totalPrice = 0;

    $(".add-to-cart").click(function() {
        let price = parseInt($(this).data("price"));
        cartCount++;
        totalPrice += price;

        $("#cart-count").text(cartCount);
        $("#total-sum").text(totalPrice + " тг");

        if (cartCount > 0) {
            $("#paymentSection").slideDown();
        }
    });

    $("#paymentForm").submit(function(e) {
        e.preventDefault();

        let cardNumber = $("#cardNumber").val().trim();
        let expiry = $("#expiry").val().trim();
        let cvv = $("#cvv").val().trim();

        if (cardNumber === "" || expiry === "" || cvv === "") {
            $("#paymentMessage").text("Пожалуйста, заполните все поля").css("color", "red");
            return;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            $("#paymentMessage").text("Номер карты должен быть 16 цифр").css("color", "red");
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            $("#paymentMessage").text("Срок действия в формате MM/YY").css("color", "red");
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            $("#paymentMessage").text("CVV должен быть 3 цифры").css("color", "red");
            return;
        }

        $("#paymentMessage").text("Оплата успешна! Спасибо за покупку 💖").css("color", "green");
        cartCount = 0;
        totalPrice = 0;
        $("#cart-count").text(cartCount);
        $("#total-sum").text("0 тг");
        $("#paymentForm")[0].reset();
        $("#paymentSection").slideUp();
    });
});
