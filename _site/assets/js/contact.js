var onContactUsSubmit = function () {
    $(document).ready(function () {

        if ($("#contact-us-form input[name='name']").val() === "" ||
            $("#contact-us-form input[name='email']").val() === "") {
            $(".errors").show();
            $("#contact-us-form button").show();
        } else {
            $(".errors").hide();
            $.post($("#contact-us-form").attr('action'), JSON.stringify({
                name: $("#contact-us-form input[name='name']").val(),
                companyName: $("#contact-us-form input[name='companyName']").val(),
                email: $("#contact-us-form input[name='email']").val(),
                phone: $("#contact-us-form input[name='phone']").val(),
                interestedIn: $("#contact-us-form select[name='interestedIn']").val(),
                message: $("#contact-us-form textarea[name='message']").val(),
                'g-recaptcha-response': $("#contact-us-form textarea[name='g-recaptcha-response']").val()
            }), function (data) {

                // success at contacting
                $(".thanks").show();

                if (typeof ga !== 'undefined') {
                    ga('send', 'event', 'cta', 'contactUs', 'strsocialWebsite');
                }

                $("#contact-us-form button").hide();
                $("#contact-us-form input[name='name']").val('');
                $("#contact-us-form input[name='companyName']").val('');
                $("#contact-us-form input[name='email']").val('');
                $("#contact-us-form input[name='phone']").val('');
                // $("#contact-us-form input[name='interestedIn']").val('');
                $("#contact-us-form textarea[name='message']").val('');
            }, 'json');
        }
    });
};

$(document).ready(function () {
    $(".errors").hide();
    $(".sending").hide();
    $(".thanks").hide();

    $("#contact-us-form button").click(function(event) {
        $(".sending").show();
        $("#contact-us-form button").hide();
    });
});
