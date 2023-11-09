// Personal judge0 api key
const API_KEY = "f7124238cemshcddeb944bce9858p1bb8f4jsn99631ecda652";
const language_to_id = {
    "Bash": 46,
    "C": 50,
    "CSharp": 51,
    "Cpp": 54,
    "Java": 62,
    "Python": 71,
    "Ruby": 72
};
// Function to encode a string
function encode(str) {
    return btoa(unescape(encodeURIComponent(str || "")));
}
// Function to decode bytes
function decode(bytes) {
    var escaped = escape(atob(bytes || ""));
    try {
        return decodeURIComponent(escaped);
    } catch {
        return unescape(escaped);
    }
}
// Function to handle errors
function errorHandler(jqXHR, textStatus, errorThrown) {
    $("#output").val(`${JSON.stringify(jqXHR, null, 4)}`);
    $("#run-all-code").prop("disabled", false);
}

// Function to check the status of a submission
function check(token, outputId) {
    $("#" + outputId).val($("#" + outputId).val() + "");
    $.ajax({
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
        type: "GET",
        headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        },
        success: function (data, textStatus, jqXHR) {
            if ([1, 2].includes(data["status"]["id"])) {
                $("#" + outputId).val($("#" + outputId).val() + "\nStatus: " + data["status"]["description"]);
                setTimeout(function () {
                    check(token, outputId);
                }, 1000);
            } else {
                var output = [decode(data["compile_output"]), decode(data["stdout"])].join("\n").trim();
                $("#" + outputId).val(output);
                $("#run-all-code").prop("disabled", false);
                compareAndHighlight(outputId, "expected" + outputId);
            }
        },
        error: errorHandler
    });
}

// Function to compile and run code for all test cases
function compileAndRunAll() {
    $("#run-all-code").prop("disabled", true);

    // Get the source code from the CodeMirror editor
    var sourceCode = encode(editor.getValue());

    // Get the input data from the specified textareas
    var input1 = encode($("#input1").val());
    var input2 = encode($("#input2").val());

    // Clear the output textareas and reset their background color
    $("#testcase1").val("");
    $("#testcase1").css("background-color", "white");
    $("#testcase2").val("");
    $("#testcase2").css("background-color", "white");

    // Reset result labels
    $("#result1").text("");
    $("#result2").text("");

    // Compile and run code for Test Case 1
    $.ajax({
        url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true",
        type: "POST",
        contentType: "application/json",
        headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        },
        data: JSON.stringify({
            "language_id": language_to_id[$("#lang").val()],
            "source_code": sourceCode,
            "stdin": input1,
            "redirect_stderr_to_stdout": true
        }),
        success: function(data, textStatus, jqXHR) {
            setTimeout(function() {
                check(data["token"], "testcase1", "output1", "result1");
                // Check test case against output after 7 seconds
                setTimeout(function() {
                    var outputValue = $("#output1").val().trim();
                    var testCaseValue1 = $("#testcase1").val().trim();

                    if (outputValue === testCaseValue1) {
                        $("#testcase1").css("background-color", "lightgreen");
                    } else {
                        $("#testcase1").css("background-color", "lightcoral");
                    }
                }, 4000);
            }, 1000);
        },
        error: errorHandler
    });

    // Compile and run code for Test Case 2
    $.ajax({
        url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true",
        type: "POST",
        contentType: "application/json",
        headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        },
        data: JSON.stringify({
            "language_id": language_to_id[$("#lang").val()],
            "source_code": sourceCode,
            "stdin": input2,
            "redirect_stderr_to_stdout": true
        }),
        success: function(data, textStatus, jqXHR) {
            setTimeout(function() {
                check(data["token"], "testcase2", "output2", "result2");
                // Check test case against output after 7 seconds
                setTimeout(function() {
                    var outputValue = $("#output2").val().trim();
                    var testCaseValue2 = $("#testcase2").val().trim();

                    if (outputValue === testCaseValue2) {
                        $("#testcase2").css("background-color", "lightgreen");
                    } else {
                        $("#testcase2").css("background-color", "lightcoral");
                    }
                }, 4000);
            }, 1000);
        },
        error: errorHandler
    });
}