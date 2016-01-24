document.addEventListener("DOMContentLoaded", function(event) {
    
    var github, user, repo;
    
    function signIn() {
        var formElement = document.getElementById("form-container");
        return new Github({
            username: formElement.querySelector("#github-username").value,
            password: formElement.querySelector("#github-password").value,
            auth: "basic"
        });
    }
    
    function loadAdmin() {
        github = signIn();
        user = github.getUser();
        user.show(null, function(err, user){
            if(user){
                document.getElementById("form-container").style.display = "none";
                document.getElementById("admin-container").style.display = "block";
                repo = github.getRepo(user.login, "strudel");
                repo.show(function(err, repo){
                    console.log(repo);
                });
            } else {
                console.log(err);
            }
        });
    }
    
    function newPostView() {
        document.getElementById("new-post-container").style.display = "block";
        document.getElementById("new-post-btn").style.display = "none";
        document.getElementById("edit-posts-btn").style.display = "block";
    }
    
    var signInBtn = document.getElementById("sign-in-btn");
    signInBtn.addEventListener("click", loadAdmin, false);
    
    var newPostBtn = document.getElementById("new-post-btn");
    newPostBtn.addEventListener("click", newPostView, false);
    
});