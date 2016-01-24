document.addEventListener("DOMContentLoaded", function(event) {
    var github;
    function signIn() {
        var formElement = document.getElementById("form-container");
        return new Github({
            username: formElement.querySelector("#gitHubUsername").value,
            password: formElement.querySelector("#gitHubPassword").value,
            auth: "basic"
        });
    }
    var signInBtn = document.getElementById("signInBtn");
    signInBtn.addEventListener("click", function(){
        github = signIn();
        var user = github.getUser();
        user.repos(function(err, repos) {
            console.log(repos);
        });
    }, false);
});