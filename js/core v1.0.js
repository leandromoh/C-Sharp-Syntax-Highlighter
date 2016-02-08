var texto;
var charEspeciais = "[\\[\\]{}();\\.,!@# $&+\\-*\\/\\\\]";
var latEsq = "(^|"+charEspeciais+")";
var latDir = "($|"+charEspeciais+")";

var _number = [];
_number.push(new RegExp(latEsq + "(\\d+)" + latDir,"gm"));

var _string = [];
_string.push(/'.*?'/g); // 'abc'
_string.push(/".*?"/g); // "abc"

var _comment = [];
_comment.push(/\/\/.*$/gm);          //comentario simples
_comment.push(/\/\*[\s\S]*?\*\//gm); //comentario multiline

var _className = [];
_className.push(/(new +)([A-Z]\w+)( *\()/g);     //new PessoaFisica (
_className.push(/( )([A-Z]\w+)(\.)/g);           // PessoaFisica.
_className.push(/()([A-Z]\w+)( +\w+ *[=;] *)/g); //PessoaFisica pessoa (=|;)
_className.push(/(class +)([A-Z]\w+)()/g);       //class PessoaFisica
_className.push(/(\( *)([A-Z]\w+)( +\w)/g);      //( PessoaFisica p

var _inheritance = [];
_inheritance.push(/class +[A-Z]\w+ *((:|,)( *[A-Z]\w+))+/g); 
_inheritance.push(/(:|,)( *[A-Z]\w+)()/g);

function createKeyWordGroup(group, className){
    group.className = typeof className === 'string' ? className : null;
    return group;
}

//defines the way to process an keyWordGroup
function keyWordGroupSwitch(group){
    if(group.className)
        replaceWithClassNameSpan(group);
    else
        group.forEach(replaceWithKeyWordSpan);
}

//for each keyword in the group, we will search it in the text
//and if we find it, we'll add an 'span tag with the class attribute
//equals the className of the group' around the keyword found in the text
function replaceWithClassNameSpan(group){
	var rep = "$1<span class='"+group.className+"'>$2</span>$3";
	group.forEach(function(keyword){
		var regex = new RegExp(latEsq + "(" + keyword + ")" + latDir,"gm");
		texto = texto.replace(regex, rep).replace(regex, rep);
	});
}

//matches the base class and interfaces that a class implements
//and replace the matches by a 'span tag with the class attribute
//equals the strClass parameter'
function replaceInheritanceAndInterfaceTokens(a, strClass){
    var am = texto.match(a[0]);
    if(!am) return; 
    var lastIndex = a.length - 1;
    am.forEach(function(str1){
        for(aux = str1, i = 1; i != lastIndex; i++)
            aux = aux.match(a[i])[0];
        var arrumado = aux.replace(a[lastIndex],"$1<span class='"+strClass+"'>$2</span>$3");
        var newStr1 = str1.replace(aux,arrumado);
        texto = texto.replace(str1,newStr1);
    });
}

//used for remove spans within comments'span
//exemple input => ...<span class="comment">// the <span class="string">"prop"</span> is a string</span>...
//exemple output => ...<span class="comment">// the "prop" is a string</span>...
function removeSubSpan(str){
	return str.replace(/(<span[^>]*>)((.|\n)(?!<\/span>))*?<span[^>]*>(.|\n)*?<\/span>((.|\n)(?!<span[^>]*>))*?(<\/span>)/gm, function(str){
		var b = str.match(/>[^<]+</gm).map(function(str){return str.replace(">","").replace("<","")}).join('');
		return new RegExp("<span[^>]*>","g").exec(str)+b+"<\/span>";
	});
}

//we will search the keyword in the text
//and if we find it, we'll add an 'span tag with the class attribute
//equals the keyword' around the keyword found in the text
function replaceWithKeyWordSpan(keyword){
	var regex = new RegExp(latEsq + "(" + keyword + ")" + latDir,"gm");
	var rep = "$1<span class='$2'>$2</span>$3";
	texto = texto.replace(regex, rep).replace(regex, rep);
}

//receives an array of regex's that matches something
//(e.g., an array where all regex's matches name of classes)
//and replace the matches by a 'span tag with the class attribute
//equals the strClass parameter'
function replaceTokensWithManyPatterns(obj,strClass,isThreeGroups){
	var rep = (isThreeGroups)? "$1<span class='"+strClass+"'>$2</span>$3" : "<span class='"+strClass+"'>$&</span>";
	for(i = 0; i < obj.length; i++) 
		texto = texto.replace(obj[i], rep);
}

function removeBug()
{
    var regex1 = /&lt;(.(?!&gt;))+.&gt;/g;
    var regex2 = /[="]/g;
    var regex3 = /&lt;\/[\w,]+&gt;/g;
    
    texto = texto.replace(regex3,'');
    var matches = texto.match(regex1);
    
    if(!matches) return;

    for(i=0; i<matches.length; i++)
        texto = texto.replace(matches[i],matches[i].replace(regex2,''));
}

function applySyntaxHighlighter(obj){
	texto = obj.innerHTML.replace(/>/g, '&gt;').replace(/</g, '&lt;');
	removeBug();
	replaceTokensWithManyPatterns(_string,"stringText"); //precisa ficar em primeiro, senao vai pegar as strings dos spans que vou inserir
	replaceInheritanceAndInterfaceTokens(_inheritance,"className");//precisa ficar antes de _className
	replaceTokensWithManyPatterns(_className,"className",true);
	replaceTokensWithManyPatterns(_number,"number",true);
	replaceTokensWithManyPatterns(_comment,"comment");
	keyWordDictionary.forEach(keyWordGroupSwitch);
	texto = removeSubSpan(texto);
	obj.innerHTML = texto;
}