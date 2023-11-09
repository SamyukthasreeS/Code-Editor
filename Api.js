//Personal judge0 api key
API_KEY = "f7124238cemshcddeb944bce9858p1bb8f4jsn99631ecda652";
var language_to_id = {
        "Go": 60,
        "C": 50,
        "CSharp": 51,
        "Cpp": 54,
        "Java": 62,
        "Python": 71,
        "Ruby": 72
};
function encode(str) {
        return btoa(unescape(encodeURIComponent(str || "")));
    }
function decode(bytes) {
        var escaped = escape(atob(bytes || ""));
            try {
                return decodeURIComponent(escaped);
            } catch {
                return unescape(escaped);
            }
    }
function errorHandler(jqXHR, textStatus, errorThrown) {
        $("#output").val(`${JSON.stringify(jqXHR, null, 4)}`);
        $("#run").prop("disabled", false);
        }
function check(token){
        $("#output").val($("#output").val() + "");
        $.ajax({
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
        type: "GET",
        headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
            },
        success: function (data, textStatus, jqXHR) {
            if ([1, 2].includes(data["status"]["id"])){
                $("#output").val($("#output").val() + "\nStatus: " + data["status"]["description"]);
                setTimeout(function() { check(token) }, 1000);
            }
            else {
                var output = [decode(data["compile_output"]), decode(data["stdout"])].join("\n").trim();
                $("#output").val(output);
                $("#run").prop("disabled", false);
            }
        },
        error: errorHandler
    });
    }
    function compileP() {
        $("#run").prop("disabled", true);
        $("#output").val("");
        var sourceCode = encode(editor.getValue());
        var input = encode($("#input").val());
        
        console.log("Source Code:", sourceCode);
        
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
                "stdin": input,
                "redirect_stderr_to_stdout": true
            }),
            success: function(data, textStatus, jqXHR) {
                $("#output").val($("#output").val() + "");
                setTimeout(function() {
                    check(data["token"]);
                },1000);
            },
            error: errorHandler
        });
    }