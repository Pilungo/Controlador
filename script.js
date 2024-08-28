function calcularTotal() {
    let total = 0;

    if (document.getElementById('lavagemSimples').checked) total += 30;
    if (document.getElementById('lavagemCompleta').checked) total += 50;
    if (document.getElementById('enceramento').checked) total += 70;
    if (document.getElementById('limpezaMotor').checked) total += 100;
    if (document.getElementById('higienizacaoAr').checked) total += 60;
    if (document.getElementById('cristalizacaoVidros').checked) total += 80;
    if (document.getElementById('higienizacaoBancos').checked) total += 90;
    if (document.getElementById('higienizacaoInteriores').checked) total += 110;
    if (document.getElementById('higienizacaoEstofados').checked) total += 130;

    document.getElementById('total').value = `R$ ${total},00`;
}
