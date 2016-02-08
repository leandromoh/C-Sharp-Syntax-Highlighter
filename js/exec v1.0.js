document.addEventListener("DOMContentLoaded", function(event) { 
	var codes = document.getElementsByClassName("csharpcode");
	[].forEach.call(codes, applySyntaxHighlighter);
});