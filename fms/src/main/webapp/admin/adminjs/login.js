$(document).ready(function() {
  $("#login_btn").click(login);
});

function login() {
  var userName = $("#login-userName").val();
  var password = $("#login-password").val();
  ajaxUtil({"userName":userName,"password":password}, path+"/verifyUserPassword.shtml", function(r) {
      if (r.success == "true") {
        $("#note").html("");
        ajaxSubmitWithFunc("#login-form");
      } else {
        $("#note").html(r.reason);
      }
    }
  );
}

document.onkeydown = function(e) {
  var theEvent = e || window.event;
  var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
  if (code == 13) {
    $("#login_btn").focus();
    document.all('login_btn').click();
    return false;
  }
};
