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
    else if (option.value == "Go") {
        editor.setOption("mode", "text/x-go");
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
var downloadBtn = document.getElementById("downloadBtn");
var uploadBtn = document.getElementById("uploadBtn");
var clearBtn = document.getElementById("clearBtn");
var option = document.getElementById("lang"); // Reference to the language selection dropdown

downloadBtn.addEventListener("click", function () {
      var codeText = editor.getValue();
      var selectedLanguage = option.value;
      var filename = prompt("Enter filename:", "code"); 
    
      if (filename !== null && filename.trim() !== "") {
        var fileExtension = getFileExtension(selectedLanguage); // Function to get file extension based on language
        var fullFilename = filename + fileExtension;
        var blob = new Blob([codeText], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = fullFilename;
        document.body.appendChild(link);
        link.click();
        // Clean up the temporary URL and <a> element
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }
    });
    // Function to get file extension based on selected language
    function getFileExtension(language) {
      switch (language) {
        case "Cpp":
          return ".cpp";
        case "C":
          return ".c";
        case "Java":
          return ".java";
        case "Python":
          return ".py";
        case "Ruby":
          return ".rb";
        case "CSharp":
          return ".cs";
        case "Go":
            return ".go";
        default:
          return ".txt";
      }
    }
    // Upload button action
    uploadBtn.addEventListener("click", function () {
      var fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".txt, .cpp, .c, .java, .py, .rb, .cs, .go";
      fileInput.addEventListener("change", function (event) {
        var file = event.target.files[0];
        if (file) {
          var extension = getFileExtension(file.name);
          if (extension !== ".txt" && extension !== ".cpp" && extension !== ".c" &&
            extension !== ".java" && extension !== ".py" && extension !== ".rb" && extension !== ".cs") {
            alert("Invalid file type. Please select a valid file.");
            return;
          }
          
          var reader = new FileReader();
          reader.onload = function (e) {
            editor.setValue(e.target.result);
          };
          reader.readAsText(file);
        }
      });
      fileInput.click();
    });
document.addEventListener('DOMContentLoaded', function () {
    // Get the problem name from the hidden input field
    const problemNameInput = document.getElementById('problem-name');
    const problemName = problemNameInput.value;
    // Add an event listener to the "Run Code" button
    const runCodeButton = document.getElementById('run-code');
    runCodeButton.addEventListener('click', runCodeButtonClicked);
    function runCodeButtonClicked() {
        // Get the selected language
        const selectedLanguage = document.getElementById('lang').value;

        // Create a data object to send in the POST request
        const data = {
            problem_name: problemName, // Use the retrieved problem name
            language: selectedLanguage
        };

        // Send a POST request to your PHP script
        fetch('update_language_count.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(data => {
            // Handle the response from the server if needed
            console.log(data);
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('Error:', error);
        });
    }
});
