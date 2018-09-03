// Check Off Specific Todos By Clicking
$(document).ready(function(){
	
	$("ul").on("click", "li", function(){
		$(this).toggleClass("completed");
	});
	
	//Click on X to delete Todo
	$("ul").on("click", "span", function(event){
		$(this).parent().fadeOut(500,function(){
			$(this).remove();
		});
		event.stopPropagation();
	});
	
	$("input[type='text']").keypress(function(event){
		if(event.which === 13){
			//grabbing new todo text from input
			var todoText = $(this).val();
			$(this).val("");
			//create a new li and add to ul
			$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
		}
	});
	
	$("#toggle-form").click(function(){
		$("input[type='text']").fadeToggle();
	});
	
	$(".signBtn > .login").on("click",function(){
		loginPopUp();
	});
	
		$(".signBtn > .signUp").on("click",function(){
			$(".signup-form").removeClass("hide");
			$(".signup-form").addClass("animated bounceIn");
			setTimeout(()=>{$(".signup-form").removeClass("animated bounceIn")},1000);
			$(".cancelSignUp").on("click",function(event){
				event.stopPropagation();
						
				$(".signup-form").addClass("animated bounceOut");
				setTimeout(()=>{
					$(".signup-form").addClass("hide");
					$(".signup-form").removeClass("animated bounceOut");
					clearForms();
				},1000);
				
			});
			$(".loginRedirect").on("click",function(event){
				event.stopPropagation();
				loginRedirect()
				
			});
	});
	$(".signUpBtn").on("click",()=>{
		var signUpData=signUpForm();
		if(signUpData.validation){
           signupAjax(signUpData);
		}
	});
});
function clearForms(){
	var username=$(".username").val("")
	var email=$(".email").val("")
	var password=$(".password").val("")
	var confirm_password=$(".confirm_password").val("");
}
function loginRedirect(){
   
	$(".signup-form").addClass("animated bounceOut");
	setTimeout(()=>{
		$(".signup-form").addClass("hide");
		$(".signup-form").removeClass("animated bounceOut");
		clearForms();
	},1000);
	setTimeout(()=>{loginPopUp()},700);
}
function signupAjax(data){
	data.password="tHodAoaSpp"+data.password+"627846";
	$.ajax({
       
		url : 'http://localhost/Todo-App/TodoApp/server.php',
		type : 'POST',
		data : {
			'username' : data.username,
			'email':data.email,
			'password':data.password
		},
		dataType:'json',
		success : function(data) {              
			loginRedirect();
		},
		error : function(request,error)
		{
			loginRedirect();
			console.log(request);
			console.log(error);
		}
	});
}
function signUpForm(){
	var validation=true;
	$(".Error").text("");
	var username=$(".username").val().trim();
	var email=$(".email").val().trim();
	var password=$(".password").val().trim();
	var confirm_password=$(".confirm_password").val().trim();
	var re =/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

	if(username ==""){
		
	   $(".usernameError")
	   .text("- Username required")
	   .addClass("Error animated flash");
	   validation=false;
	}
	if(email=="" || !(re.test(email.trim())) ){
		$(".emailError")
		.text("- Invalid Email")
		.addClass("Error animated flash");
		validation=false;
	}
	if(password==""){
		$(".passwordError")
		.text("- password required")
		.addClass("Error animated flash");
		validation=false;
	}else if(password=="" && confirm_password !=""){
		$(".passwordError")
		.text("- password required")
		.addClass("Error animated flash");
		validation=false;
	}
	if(confirm_password=="" && password!=""){
		$(".confirm_passwordError")
		.text("- confirmation password required")
		.addClass("Error animated flash");
		validation=false;
	}else if(password !== confirm_password && password!=""){
		
		$(".confirm_passwordError")
		.text("- password doesn't match!")
		.addClass("Error animated flash");
		validation=false;
	}
	
	
	setTimeout(()=>{
		$(".Error").removeClass("animated flash")
	},1200);
	
	var signObject={username:username,email:email,password:password,validation:validation};
	return signObject;
}
function loginPopUp (){
	$(".loginModal").removeClass("hide");
	$(".loginModal").addClass("animated bounceIn");
	setTimeout(()=>{$(".signupModal").removeClass("animated bounceIn")},1000);
	$(".cancel").on("click",function(){
		
		$(".loginModal").addClass("animated bounceOut");
		setTimeout(()=>{
			$(".loginModal").addClass("hide");
			$(".loginModal").removeClass("animated bounceOut");
		},1000);
	});
}