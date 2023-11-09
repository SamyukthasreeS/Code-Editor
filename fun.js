function showLoginAlert() {
    alert("Please login to save files.");
}
$(document).ready(function() {
    const enableTestCaseCheckbox = document.getElementById('enableTestCase');
    const testCase1Textarea = document.getElementById('testCase1');

    enableTestCaseCheckbox.addEventListener('change', function () {
        testCase1Textarea.readOnly = !enableTestCaseCheckbox.checked;
    });
   
    $("#run").click(function() {
        if (enableTestCaseCheckbox.checked) {
            setTimeout(function() {
                var outputValue = $("#output").val().trim();
                var testCaseValue1 = $("#testCase1").val().trim();

                if (outputValue === testCaseValue1) {
                    $("#testCase1").css("background-color", "lightgreen");
                } else {
                    $("#testCase1").css("background-color", "lightcoral");
                }
            }, 7000);
        }
    });
});