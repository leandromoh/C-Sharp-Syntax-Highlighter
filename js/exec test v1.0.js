document.addEventListener("DOMContentLoaded", function(event) { 
	textarea = document.getElementById("textarea");
	pre = document.getElementById("csharpcode");
	auxDiv = document.getElementById("aux");

	textarea.onkeyup = function(){
        pre.innerHTML = this.value;
        auxDiv.onclick();
    }
    
	auxDiv.onclick = function(){
        applySyntaxHighlighter(pre);
    };

    textarea.onkeyup();
    
    function onkeydownWithTab(e){
        if(e.keyCode == 9 || e.which == 9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "    " + this.value.substring(this.selectionEnd);
            this.selectionEnd = s + "    ".length; 
        }
    }
    
	var textareas = document.getElementsByTagName('textarea');
	var i = textareas.length;
    
	while(i--){
        textareas[i].onkeydown = onkeydownWithTab;
    }
});