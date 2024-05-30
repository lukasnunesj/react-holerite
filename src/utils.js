
export function maskMoney(event) {
  const { value } = event.currentTarget;

  return value
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".");
};

export function sanitizeCurrency(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1.$2");
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function calcTotalHoras(horasArray) {
  let [totalHoras, totalMinutos] = [0, 0];
  for (let i = 0; i < horasArray.length; i++) {
    let [horas, minutos] = horasArray[i].split(":").map(Number);
    totalHoras += horas;
    totalMinutos += minutos;
  }
  totalHoras += Math.floor(totalMinutos / 60);
  totalMinutos = totalMinutos % 60;
  return `${totalHoras.toString().length > 1 ? totalHoras : `0${totalHoras}`}:${totalMinutos.toString().padStart(2, "0")}`;
}