// Função para mostrar o menu correto
function showMenu(menu) {
    document.getElementById('servicos').style.display = 'none';
    document.getElementById('historico').style.display = 'none';
    document.getElementById(menu).style.display = 'block';
}

// Função para salvar o serviço
document.getElementById('serviceForm').onsubmit = function (event) {
    event.preventDefault();

    let nome = document.getElementById('nome').value;
    let contato = document.getElementById('contato').value;
    let placa = document.getElementById('placa').value;
    let marca = document.getElementById('marca').value;
    let empresa = document.getElementById('empresa').value;

    // Serviços selecionados
    let servicos = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        servicos.push(checkbox.nextSibling.textContent.trim());
    });

    let horarioEntrada = document.getElementById('horarioEntrada').value;
    let previsaoEntrega = document.getElementById('previsaoEntrega').value;
    let condicoes = [];
    if (document.getElementById('carroBatido').checked) condicoes.push('Carro Batido');
    if (document.getElementById('carroRiscado').checked) condicoes.push('Carro Riscado');
    if (document.getElementById('carroQuebrado').checked) condicoes.push('Carro Quebrado');

    let historico = JSON.parse(localStorage.getItem('historico')) || [];

    let novoServico = {
        nome,
        contato,
        placa,
        marca,
        empresa,
        servicos: servicos.join(', '),
        horarioEntrada,
        previsaoEntrega,
        condicoes: condicoes.join(', ')
    };

    historico.push(novoServico);
    localStorage.setItem('historico', JSON.stringify(historico));

    alert('Serviço salvo com sucesso!');
    showHistorico();
};

// Função para mostrar o histórico
function showHistorico() {
    let historico = JSON.parse(localStorage.getItem('historico')) || [];
    let historicoContent = document.getElementById('historicoContent');
    historicoContent.innerHTML = '';

    historico.forEach((servico, index) => {
        historicoContent.innerHTML += `
            <div class="historico-item">
                <h3>Serviço #${index + 1}</h3>
                <p><strong>Nome:</strong> ${servico.nome}</p>
                <p><strong>Contato:</strong> ${servico.contato}</p>
                <p><strong>Placa:</strong> ${servico.placa}</p>
                <p><strong>Marca:</strong> ${servico.marca}</p>
                <p><strong>Empresa:</strong> ${servico.empresa}</p>
                <p><strong>Serviços:</strong> ${servico.servicos}</p>
                <p><strong>Horário de Entrada:</strong> ${servico.horarioEntrada}</p>
                <p><strong>Previsão de Entrega:</strong> ${servico.previsaoEntrega}</p>
                <p><strong>Condições:</strong> ${servico.condicoes}</p>
            </div>
            <hr>
        `;
    });
}

// Executa a função showHistorico quando a página carrega
window.onload = function() {
    showMenu('servicos');  // Inicia na aba de serviços
    showHistorico();  // Exibe o histórico se houver
};
