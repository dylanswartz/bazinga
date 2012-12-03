window.onload = function() {
  var fullname = "";
  if(sessionStorage && sessionStorage.email) {
    fullname = sessionStorage.fname + " " + sessionStorage.lname;
    $("#loggedinUser").html('<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Welcome, ' + fullname + '<b class="caret"></b></a><ul class="dropdown-menu"><li><a id="logout" href="#"><i class="icon-off"></i> Logout</a></li></ul></li>');
    $("#loggedinUser").removeClass("hidden");
    $("#loggedinUser").addClass("nav");
    
    $("#loginLink").addClass("hidden");
  }
  
  $.getJSON("api/categories.php", function(data){
    var cat = [];

    $.each(data, function(key, val) {
      cat.push('<li><a href="category.php?cat=' +  val.category + '">' + val.category + '</a></li>');
    });

    
    $('<ul/>', {
          html: cat.join(''),
          class: "nav nav-list"
    }).appendTo('#categoriesNav');
    
  });
  
  $("#logout").on("click", function() {
    sessionStorage.clear();
    window.location.href = "index.php";
  });
  
  $("#loginBtn").on("click", function(e){
    e.preventDefault();
    
    var email = $("#email").val();
    var pass  = md5($("#password").val());
    
    $.getJSON("api/login.php?email="+email+"&password="+pass, function(data){
      var user = data[0];
      
      if (user) {
        sessionStorage.clear();
        sessionStorage.fname = user.fname;
        sessionStorage.lname = user.lname;
        sessionStorage.email = user.email;
        console.log(user.fname + "logged in");
        window.location.href = "index.php";
      } else {
        console.log("fail");
      }
      

    });
    
  });
  
}