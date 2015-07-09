# C-Sharp-Syntax-Highlighter

Para usar o syntaxe-highlighter basta colocar o codigo c# dentro de uma tag pre com class igual a "csharpcode", como no exemplo abaixo:
<pre>
&lt;pre class="csharpcode"&gt;
    public class Class1
    {
        public int Method1(string input)
        {
          //... do something
          return 0;
        }
    }
&lt;/pre&gt;
</pre>
Após isso, é só fazer referencia aos arquivos javascript e css.

Adicione referencia aos arquivos JS: core, dictionary, exec. 
Estes arquivos estão dentro da pasta "js" do repositorio.

Adicione referencia a apenas 1 dos arquivos CSS: theme-classic, theme-dark. 
Estes arquivos estão dentro da pasta "css" do repositorio.

Se restarem duvidas, basta olhar o arquivo Example.html na raiz do repositorio, ele é um exemplo da aplicação do syntax-highlighter
