var keyWordDictionary = [

	//Namespace Keywords
	createKeyWordGroup(["using","namespace"],"keyword"),
	
	//Types
	createKeyWordGroup(["byte","short","int","decimal","float","double","long"],"type"),
	createKeyWordGroup(["sbyte","ushort","uint","ulong"],"type"),
	createKeyWordGroup(["struct","enum"],"type"),
	createKeyWordGroup(["bool","char","void","var"],"type"),
	
	//Reference Types
	createKeyWordGroup(["class","delegate","dynamic","interface","object","string"],"type"),
	
	//Modifiers
	createKeyWordGroup(["public","private","protected","internal"],"modifier"),
	createKeyWordGroup(["abstract","async","const","event","extern","override"],"modifier"),
	createKeyWordGroup(["partial","readonly","sealed","static","unsafe","virtual","volatile"],"modifier"),
	
	//Statement Keywords
	createKeyWordGroup(["if","else","switch","case"],"statement"),
	createKeyWordGroup(["do","for","foreach","while"],"statement"),
	createKeyWordGroup(["break", "continue", "default", "goto", "return", "yield"],"statement"),
	createKeyWordGroup(["throw","try","catch","finally"],"statement"),
	createKeyWordGroup(["checked","unchecked","fixed","lock"],"statement"),
	
	//Method Parameters
	createKeyWordGroup(["params","ref","out"],"keyword"),
	
	//Operator Keywords
	createKeyWordGroup(["as","await","is","new","sizeof","typeof","true","false","stackalloc"],"keyword"),
	
	//Conversion Keywords
	createKeyWordGroup(["explicit","implicit","operator"],"keyword"),
	
	//Access Keywords
	createKeyWordGroup(["base","this"],"keyword"),
	
	//Contextual Keywords
	createKeyWordGroup(["get","global","remove","set"],"keyword"),
	
	//Literal Keywords
	createKeyWordGroup(["null"],"keyword"),
	
	//Query Keywords
	createKeyWordGroup(["from","where","select","group","into","orderby","join","let","in","on","equals","by","ascending","descending"],"query"),

];