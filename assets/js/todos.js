// Check Off Specific Todos By Clicking
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
});

	$(".signBtn > .signUp").on("click",function(){
		$(".signup-form").removeClass("hide");
		$(".signup-form").addClass("animated bounceIn");
		setTimeout(()=>{$(".signup-form").removeClass("animated bounceIn")},1000);
		$(".cancelSignUp").on("click",function(event){
			event.stopPropagation();
			event.stopImmediatePropagation()
			
			$(".signup-form").addClass("animated bounceOut");
			setTimeout(()=>{
				$(".signup-form").addClass("hide");
				$(".signup-form").removeClass("animated bounceOut");
			},1000);
		});
});