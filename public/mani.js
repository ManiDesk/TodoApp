$(document).ready(function() {
    // create TextArea from input HTML element
    $("#invitation").kendoTextArea({
        label: "Send invitation:",
        rows: 10,
        maxLength:200,
        placeholder: "Enter your text here."
    });

    $("#invitation").on('input', function (e) {
        $('.k-counter-container .k-counter-value').html($(e.target).val().length);
    });

    $("#invitationForm").kendoValidator();

    $("form").submit(function (event) {
        event.preventDefault();
    });
})