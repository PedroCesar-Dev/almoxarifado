function adicionarCorAoFocarInput(){
    const listInput = document.querySelectorAll("input");
    listInput.forEach(function(campo){
        campo.addEventListener('focus', function(){
            campo.style.backgroundColor="#17B169";
        });

        campo.addEventListener('blur', function(){
            campo.style.backgroundColor="white";
        });

    })
    
}

function carregarCategorias(){
    const selectCategoria = document.getElementById('categoriaMotivo');
    
    const optFirst = document.createElement('option');
    optFirst.value=-1;
    optFirst.text="Selecionar";
    selectCategoria.add(optFirst);
    
    categorias.forEach(function(categoria){
        var opt = document.createElement('option');
        opt.value=categoria.idCategoria;
        opt.text=categoria.Descricao;
        selectCategoria.add(opt);
    })
}

function carregarMotivos(){
    const selectMotivos = document.getElementById('Motivo');
    selectMotivos.innerHTML="";
    
    const optFirst = document.createElement('option');
    optFirst.value=-1;
    optFirst.text="Selecionar";
    selectMotivos.add(optFirst);

    const valorCategoria = document.getElementById('categoriaMotivo').value;
    const motivosFiltrados = motivos.filter((m)=> m.idCategoria==valorCategoria)
    
    motivosFiltrados.forEach(function(motivo){
        var opt = document.createElement('option');
        opt.value=motivo.idMotivo;
        opt.text=motivo.Descricao;
        selectMotivos.add(opt);
    })
}

document.getElementById('categoriaMotivo').addEventListener('change', function(){
    carregarMotivos();
})

document.getElementById('CodigoProduto').addEventListener("keyup", function(){
    const codigoPesquisado = document.getElementById('CodigoProduto').value;
    let produtosFiltrados = produtos.filter((p)=> p.idProduto==codigoPesquisado);

    if(produtosFiltrados.length !=='undefined'){
        document.getElementById('DescricaoProduto').value = produtosFiltrados[0].Descricao;
        document.getElementById('Estoque').value = produtosFiltrados[0].Estoque;
        document.getElementById('Quantidade').disabled = false
    }else{
        document.getElementById('DescricaoProduto').value = "";
    }
})


document.getElementById('idDepartamento').addEventListener("keyup",function(){
    const codigoPesquisado = document.getElementById('idDepartamento').value;
    let departamentosFiltrados = departamentos.filter((p)=> p.idDep==codigoPesquisado);

    if (departamentosFiltrados.length>0) {
        document.getElementById('departamento').value=departamentosFiltrados[0].Descricao;
        
    }else{
        document.getElementById('departamento').value="";
    }
});

document.getElementById('idFuncionario').addEventListener("keyup",function(){
    const codigoPesquisado = document.getElementById('idFuncionario').value;
    let funcionariosFiltrados = funcionarios.filter((p)=> p.idFuncionario==codigoPesquisado);

    if (funcionariosFiltrados.length>0) {
        document.getElementById('NomeFuncionario').value = funcionariosFiltrados[0].Nome;
        document.getElementById('cargo').value = funcionariosFiltrados[0].Cargo;
        
    }else{
        document.getElementById('NomeFuncionario').value="";
    }
});

document.getElementById('btnVerificar').addEventListener('click',function(){
    const elementosObrigatorios = document.querySelectorAll('[data-obrigatorio="true"]');
    console.log(elementosObrigatorios);
    
    elementosObrigatorios.forEach(function(item){
        
        if (item.value=="" || item.value==-1){
            item.style.backgroundColor='red';
        } 
    })
    const chkUrgenteValue = document.getElementById('urgente').checked;
    const chkMedioValue = document.getElementById('medio').checked;
    const chkBaixoValue = document.getElementById('baixo').checked;
    if (chkUrgenteValue==false && chkMedioValue==false && chkBaixoValue==false){
        const divPrioridade = document.getElementById("radioPrioridade");        
        divPrioridade.classList.remove('radioPrioridade');
        divPrioridade.classList.add('radioPrioridadeDesabilitado');        
        document.getElementById('urgente').classList.remove('chkPrioridade');
        document.getElementById('urgente').classList.add('chkPrioridadeDesabilitado');
        document.getElementById('medio').classList.remove('chkPrioridade');
        document.getElementById('medio').classList.add('chkPrioridadeDesabilitado');
        document.getElementById('baixo').classList.remove('chkPrioridade');
        document.getElementById('baixo').classList.add('chkPrioridadeDesabilitado');
    }
});

function eventoClickPrioridadeHabilitarCor(){
    const checkboxesPrioridade = document.querySelectorAll('.chkPrioridade');    
    console.log(checkboxesPrioridade);
    checkboxesPrioridade.forEach(function(checkbox) {
        checkbox.addEventListener('click', function() {    
            const divPrioridade = document.getElementById("radioPrioridade");
            divPrioridade.classList.add('radioPrioridade');
            divPrioridade.classList.remove('radioPrioridadeDesabilitado');        
            document.getElementById('urgente').classList.add('chkPrioridade');
            document.getElementById('urgente').classList.remove('chkPrioridadeDesabilitado');
            document.getElementById('medio').classList.add('chkPrioridade');
            document.getElementById('medio').classList.remove('chkPrioridadeDesabilitado');
            document.getElementById('baixo').classList.add('chkPrioridade');
            document.getElementById('baixo').classList.remove('chkPrioridadeDesabilitado');
        });
    });
}

document.getElementById('btnAdicionarItens').addEventListener('click', function(){
    
    const tabelaItens = document. getElementById('tabelaItens');
    const campoProduto = document.getElementById('CodigoProduto');
    const campoDescricaoProduto = document.getElementById('DescricaoProduto');
    const campoQuantidade = document.getElementById('Quantidade');
    const totalRequisicao = document.getElementById('total');

    const linha = document.createElement('tr');

    const tdCodigo = document.createElement('td');
    const tdDescricao = document.createElement('td');
    const tdQuantidade = document.createElement('td');
    const tdUnd = document.createElement('td');
    const tdPreco = document.createElement('td');
    const tdTotalLinha = document.createElement('td');
    const tdBtnRemover = document.createElement('td');
    const tdTotalRequisicao = document.createElement('td');
    const produtoPesquisado = produtos.filter((p)=> p.idProduto==campoProduto.value);

    tdCodigo.innerHTML = campoProduto.value;
    tdDescricao.innerHTML = campoDescricaoProduto.value;
    tdQuantidade.innerHTML = campoQuantidade.value;
    tdUnd.innerHTML = produtoPesquisado[0].Unidade;
    tdPreco.innerHTML = produtoPesquisado[0].Preco;
    tdTotalLinha.innerHTML = campoQuantidade.value*produtoPesquisado[0].Preco;
    tdTotalRequisicao.innerHTML = totalRequisicao.value;

    totalRequisicao.value = parseInt(totalRequisicao.value) + parseInt(campoQuantidade.value*produtoPesquisado[0].Preco);
    linha.appendChild(tdCodigo);
    linha.appendChild(tdDescricao);
    linha.appendChild(tdQuantidade);
    linha.appendChild(tdUnd);
    linha.appendChild(tdPreco);
    linha.appendChild(tdTotalLinha);
    tdBtnRemover.appendChild(criarBtnRemover(tabelaItens, linha));
    linha.appendChild(tdBtnRemover);
    tabelaItens.appendChild(linha);
})

function criarBtnRemover(tabelaItens, objLinha, numeroLinha){
    const btnRemoverItem = document.createElement('div');
        btnRemoverItem.className = "BtnRemover";
        btnRemoverItem.id = "btnRemover" + numeroLinha;
        btnRemoverItem.innerHTML = '<span id="btnRemover">Remover</span>';

        btnRemoverItem.addEventListener('click', function(){
            if(objLinha && tabelaItens.contains(objLinha)){
                tabelaItens.removeChild(objLinha);
            }

            const totalRequisicao = document.getElementById('total');
            const colunas = objLinha.getElementsByTagName('td');
            let valorLinha = colunas[5].innerText;

            totalRequisicao.value = parseInt(totalRequisicao.value-parseInt(valorLinha));
        });

        return btnRemoverItem;
}


adicionarCorAoFocarInput();
carregarCategorias();
