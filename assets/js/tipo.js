const tipo = document.getElementById('tipo')
function educacao(){
    if(tipo.value == 0){
        tipo.setCustomValidity('Insira um tipo filho da mae')
    }
}
tipo.onchange = educacao