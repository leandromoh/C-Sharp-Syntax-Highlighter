function uuu(obj){
	pre.innerHTML = obj.value;
	pre.onclick();
}

document.addEventListener("DOMContentLoaded", function(event) { 
	textarea = document.getElementById("textarea");
	pre = document.getElementById("csharpcode");
	
	textarea.setAttribute("onkeyup","uuu(this)");
	pre.setAttribute("onclick","applySyntaxHighlighter(this)");

	textarea.onkeyup();
	
	var spaces = "    ";
	var textareas = document.getElementsByTagName('textarea');
	var count = textareas.length;
	for(var i=0;i<count;i++){
		textareas[i].onkeydown = function(e){
			if(e.keyCode==9 || e.which==9){
				e.preventDefault();
				var s = this.selectionStart;
				this.value = this.value.substring(0,this.selectionStart) + spaces + this.value.substring(this.selectionEnd);
				this.selectionEnd = s + spaces.length; 
			}
		}
	}
});