var texto;
var charEspeciais = "[\\[\\]{}();\\.,!@# $&+\\-*\\/\\\\]";
var latEsq = "(^|"+charEspeciais+")";
var latDir = "($|"+charEspeciais+")";

var _number = new Array();
_number.push(new RegExp(latEsq + "(\\d+)" + latDir,"gm"));

var _string = new Array();
_string.push(/'.*?'/g); // 'abc'
_string.push(/".*?"/g); // "abc"

var _comment = new Array();
_comment.push(/\/\/.*$/gm);          //comentario simples
_comment.push(/\/\*[\s\S]*?\*\//gm); //comentario multiline

var _className = new Array();
_className.push(/(new +)([A-Z]\w+)( *\()/g);     //new PessoaFisica (
_className.push(/( )([A-Z]\w+)(\.)/g);           // PessoaFisica.
_className.push(/()([A-Z]\w+)( +\w+ *[=;] *)/g); //PessoaFisica pessoa (=|;)
_className.push(/(class +)([A-Z]\w+)()/g);       //class PessoaFisica
_className.push(/(\( *)([A-Z]\w+)( +\w)/g);      //( PessoaFisica p

var _inheritance = new Array();
_inheritance.push(/class +[A-Z]\w+ *((:|,)( *[A-Z]\w+))+/g); 
_inheritance.push(/(:|,)( *[A-Z]\w+)()/g);

function zzz(arr, className){
    x = arr;
    x.className = className || null;
    return x;
}

function ttt(arr){
    if(arr.className)
        yyy(arr);
    else
        arr.forEach(kkk);
}

function yyy(arr){
	var rep = "$1<span class='"+arr.className+"'>$2</span>$3";
	arr.forEach(function(str){
		var regex = new RegExp(latEsq + "(" + str + ")" + latDir,"gm");
		texto = texto.replace(regex, rep).replace(regex, rep);
	});
}

function xxx(a, strClass){
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

function removeSubSpan(str){
	return str.replace(/(<span[^>]*>)((.|\n)(?!<\/span>))*?<span[^>]*>(.|\n)*?<\/span>((.|\n)(?!<span[^>]*>))*?(<\/span>)/gm, function(str){
		var b = str.match(/>[^<]+</gm).map(function(str){return str.replace(">","").replace("<","")}).join('');
		return new RegExp("<span[^>]*>","g").exec(str)+b+"<\/span>";
	});
}

function kkk(str){
	var regex = new RegExp(latEsq + "(" + str + ")" + latDir,"gm");
	var rep = "$1<span class='$2'>$2</span>$3";
	texto = texto.replace(regex, rep).replace(regex, rep);
}

function fff(obj,strClass,isThreeGroups){
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

function ddd(obj){
	texto = obj.innerHTML.replace(/>/g, '&gt;').replace(/</g, '&lt;');
	removeBug();
	fff(_string,"stringText"); //precisa ficar em primeiro, senao vai pegar as strings dos spans que vou inserir
	xxx(_inheritance,"className");//precisa ficar antes de _className
	fff(_className,"className",true);
	fff(_number,"number",true);
	fff(_comment,"comment");
	kwrds.forEach(ttt);
	texto = removeSubSpan(texto);
	obj.innerHTML = texto;
}