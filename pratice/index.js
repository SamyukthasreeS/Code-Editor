var themeSelect = document.getElementById("themeSelect");
// Initialize the CodeMirror editor with default options
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "text/x-c++src",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
});
// Add an event listener to the theme select dropdown
themeSelect.addEventListener("change", function () {
    // Get the selected theme from the dropdown
    var selectedTheme = themeSelect.value;
    // Set the CodeMirror theme based on the selected theme
    editor.setOption("theme", selectedTheme);
});
    var option = document.getElementById("lang")
    option.addEventListener("change", function () {
        var selectedLanguage = option.value;

    if (option.value == "Java") {
        editor.setOption("mode", "text/x-java");
    }
    else if (option.value == "Python") {
        editor.setOption("mode", "text/x-python");
    }
    else if (option.value == "Ruby"){
        editor.setOption("mode", "text/x-ruby");
    }
    else if (option.value == "CSharp") {
        editor.setOption("mode", "text/x-csharp");
    }
    else {
        editor.setOption("mode", "text/x-c++src");
    }
    })
    var initialCodeSnippets = {
        Cpp:'#include <iostream>\nusing namespace std;\nint main() {\n    // Your C++ code here\n    return 0;\n}',
        C:'#include <stdio.h>\nint main() {\n    // Your C code here\n    return 0;\n}',
        Java:'public class Main {\n    public static void main(String[] args) {\n        // Your Java code here\n    }\n}',
        Python:'# Your Python code here',
        Ruby: '# Your Ruby code here',
        CSharp: 'using System;\nclass Program {\n    static void Main(string[] args) {\n        // Your C# code here\n    }\n}'
    };
    function template(){
        var selectedLanguage = option.value;
        if(initialCodeSnippets.hasOwnProperty(selectedLanguage))
        {
            editor.setValue(initialCodeSnippets[selectedLanguage])
        }
        else{
            editor.setValue("")
        }
    }
    function autosave(){
        var selectedLanguage = option.value;
        initialCodeSnippets[selectedLanguage]=editor.getValue()
        console.log("code saved...")
    }
    editor.on("change",autosave)


        function toggleEditMode() {
            const customTestCaseCheckbox = document.getElementById('customTestCase');
            const textareasToToggle = [
                document.getElementById('input1'),
                document.getElementById('input2'),
                document.getElementById('output1'),
                document.getElementById('output2')
            ];

            textareasToToggle.forEach(textarea => {
                textarea.readOnly = !customTestCaseCheckbox.checked;
            });
        }
        const customTestCaseCheckbox = document.getElementById('customTestCase');
        customTestCaseCheckbox.addEventListener('change', toggleEditMode);
        toggleEditMode();


        document.getElementById("run-all-code").addEventListener("click", function() {
            // Fetch the problem name from the h2 tag
            const problemName = document.getElementById("problem-title").textContent;
            const selectedLanguage = document.getElementById("lang").value;
            const code = editor.getValue();
            
            // Fetch user email from get_user_data.php
            fetch("get_user_data.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.email) {
                    const userEmail = data.email;
                    
                    // Send a POST request to update_language_count.php with user_email, selected_language, and problem_name
                    fetch("update_language_count.php", {
                        method: "POST",
                        body: JSON.stringify({
                            selected_language: selectedLanguage,
                            user_email: userEmail,
                            problem_name: problemName
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Handle the response from update_language_count.php
                        console.log(data);
                    })
                    .catch(error => {
                        // Handle errors
                        console.error(error);
                    });
                } else {
                    console.error("User email not found.");
                }
            })
            .catch(error => {
                console.error(error);
            });
        });
        
        
        
