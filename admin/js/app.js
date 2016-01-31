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
                console.log(user);
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
    
    function editPostsView() {
        document.getElementById("new-post-container").style.display = "none";
        document.getElementById("new-post-btn").style.display = "block";
        document.getElementById("edit-posts-btn").style.display = "none";
    }
    
    function publishPost() {
        var formElement = document.getElementById("new-post-container");
        var newPost = {
            title: formElement.querySelector("input#post-title").value,
            body: formElement.querySelector("textarea#post-body").value,
            tags: formElement.querySelector("input#post-tags").value,
            date: new Date()
        }
        user.show(null, function(err, user){
           if(user){
               newPost.author = user.name || user.login;
               console.log(newPost);
           } else {
               console.log(err);
           }
        });
    }
    
    function addTag() {
        var tagsContainer = document.getElementById("tags-container");
        if(tagsContainer.children.length == 0){
            document.getElementById("tags-label").style.display = "block";
        }
        var view = {
            x: tagsContainer.children.length + 1
        }
        var template = document.getElementById("tag-input-template").innerHTML;
        var tagOutput = Mustache.render(template, view);
        tagsContainer.innerHTML += tagOutput;
    }
    
    function handleTagAction(event) {
        if (event.target !== event.currentTarget) {
            if(event.target.className == "remove-tag-btn"){
                removeTagInput(event.target);
            }
        }
        event.stopPropagation();
    }
    
    function removeTagInput(element){
        element.parentElement.remove(this);
    }
    
    var signInBtn = document.getElementById("sign-in-btn");
    signInBtn.addEventListener("click", loadAdmin, false);
    
    var newPostBtn = document.getElementById("new-post-btn");
    newPostBtn.addEventListener("click", newPostView, false);
    
    var editPostsBtn = document.getElementById("edit-posts-btn");
    editPostsBtn.addEventListener("click", editPostsView, false);
    
    var publishBtn = document.getElementById("publish-btn");
    publishBtn.addEventListener("click", publishPost, false);
    
    var addTagBtn = document.getElementById("add-tag-btn");
    addTagBtn.addEventListener("click", addTag, false);
    
    var tagsContainer = document.getElementById("tags-container");
    tagsContainer.addEventListener("click", handleTagAction, false);
    
});