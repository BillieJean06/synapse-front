const SLA = {
  verde: 10,
  amarelo: 5,
  vermelho: 3,
  preto: 1,
};

export function calcularSLA(prioridade) {
  return new Date(Date.now() + SLA[prioridade] * 24 * 60 * 60 * 1000);
}
