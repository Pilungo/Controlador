// Função para mostrar o menu correto
function showMenu(menu) {
    document.getElementById('servicos').style.display = 'none';
    document.getElementById('historico').style.display = 'none';
    document.getElementById('faturamento').style.display = 'none';
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
        let [nomeServico, preco] = checkbox.value.split(' - ');
        servicos.push({ nome: nomeServico, preco: parseFloat(preco.replace('R$', '').replace(',', '.')) });
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
        servicos: servicos,
        horarioEntrada,
        previsaoEntrega,
        condicoes: condicoes.join(', '),
        data: new Date().toISOString() // Adiciona a data e hora do serviço
    };

    historico.push(novoServico);
    localStorage.setItem('historico', JSON.stringify(historico));

    showAlert('Serviço salvo com sucesso!', 'success');
    showHistorico();
    calcularFaturamento();
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
                <p><strong>Serviços:</strong> ${servico.servicos.map(s => s.nome + ' - R$' + s.preco.toFixed(2)).join(', ')}</p>
                <p><strong>Horário de Entrada:</strong> ${servico.horarioEntrada}</p>
                <p><strong>Previsão de Entrega:</strong> ${servico.previsaoEntrega}</p>
                <p><strong>Condições:</strong> ${servico.condicoes}</p>
                <p><strong>Data:</strong> ${new Date(servico.data).toLocaleString()}</p>
            </div>
            <hr>
        `;
    });
}

// Função para mostrar o feedback
function showAlert(message, type) {
    let alertBox = document.createElement('div');
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    document.getElementById('feedback').appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000); // Remove o alerta após 3 segundos
}

// Função para calcular o faturamento
function calcularFaturamento() {
    let historico = JSON.parse(localStorage.getItem('historico')) || [];
    let hoje = new Date();
    let faturamentoDia = 0, faturamentoMes = 0, faturamentoAno = 0;

    historico.forEach(servico => {
        servico.servicos.forEach(servicoItem => {
            let dataServico = new Date(servico.data);
            if (dataServico.toDateString() === hoje.toDateString()) {
                faturamentoDia += servicoItem.preco;
            }
            if (dataServico.getMonth() === hoje.getMonth() && dataServico.getFullYear() === hoje.getFullYear()) {
                faturamentoMes += servicoItem.preco;
            }
            if (dataServico.getFullYear() === hoje.getFullYear()) {
                faturamentoAno += servicoItem.preco;
            }
        });
    });

    document.getElementById('faturamentoDia').textContent = faturamentoDia.toFixed(2);
    document.getElementById('faturamentoMes').textContent = faturamentoMes.toFixed(2);
    document.getElementById('faturamentoAno').textContent = faturamentoAno.toFixed(2);
}

// Função para filtrar o histórico
function filterHistorico() {
    let searchValue = document.getElementById('searchInput').value.toLowerCase();
    let items = document.querySelectorAll('.historico-item');

    items.forEach(item => {
        let nome = item.querySelector('p strong').nextSibling.textContent.toLowerCase();
        if (nome.includes(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Executa as funções necessárias quando a página carrega
window.onload = function() {
    showMenu('servicos');  // Inicia na aba de serviços
    showHistorico();  // Exibe o histórico se houver
    calcularFaturamento(); // Calcula o faturamento inicial
};
