import { formatCurrency } from "../utils";

function Table({ folha }) {
  const trClasses = "bg-white border-b hover:bg-teal-50";
  const thClasses = "pl-8 pr-6 py-4 font-medium text-teal-900 whitespace-nowrap ";
  const tdClasses = "px-6 py-3 text-right";

  const data = { ...folha };
  data.totalDebitos = data.totalDebitos === undefined ? 0 : parseFloat(data.salarioBruto) + data.totalAdicionalNoturno + data.totalHorasExtras75 + data.totalHorasExtras100 + data.totalDSRNoturno + data.totalDSRHoraExtra;
  data.totalGeral = data.totalDebitos - data.totalINSS - data.totalIRRF - parseFloat(data.plano_medico) - parseFloat(data.outros_descontos);

  return (
    <table className="w-full text-sm text-left text-teal-700 ">
      <thead className="text-xs text-teal-800 uppercase bg-teal-300">
        <tr>
          <th className="px-6 py-3">Titulo</th>
          <th className="px-6 py-3 text-right">Valor (R$)</th>
        </tr>
      </thead>
      <tbody>
        <tr className={trClasses}>
          <th scope="row" className={thClasses}>
            Adicional Noturno (30%)
          </th>
          <td className={tdClasses}>{formatCurrency(data.totalAdicionalNoturno)}</td>
        </tr>
        <tr className={trClasses}>
          <th scope="row" className={thClasses}>
            Horas extras 75%
          </th>
          <td className={tdClasses}>{formatCurrency(data.totalHorasExtras75)}</td>
        </tr>
        <tr className={trClasses}>
          <th scope="row" className={thClasses}>
            Horas extras 100%
          </th>
          <td className={tdClasses}>{formatCurrency(data.totalHorasExtras100)}</td>
        </tr>
        <tr className={trClasses}>
          <th scope="row" className={thClasses}>
            DSR Horas Noturnas
          </th>
          <td className={tdClasses}>{formatCurrency(data.totalDSRNoturno)}</td>
        </tr>
        <tr className={trClasses}>
          <th scope="row" className={thClasses}>
            DSR Horas Extras
          </th>
          <td className={tdClasses}>{formatCurrency(data.totalDSRHoraExtra)}</td>
        </tr>

        <tr className="bg-teal-100">
          <th className="px-6 py-3">Total Debitos</th>
          <th className="px-6 py-3 text-right">{formatCurrency(data.totalDebitos)}</th>
        </tr>

        <tr className={trClasses}>
          <th scope="row" className={thClasses}>
            INSS
          </th>
          <td className={`${tdClasses}`}>
            <span className="font-bold pr-4">-</span>
            {formatCurrency(data.totalINSS)}
          </td>
        </tr>
        <tr className={trClasses}>
          <th scope="row" className={thClasses}>
            IRRF
          </th>
          <td className={`${tdClasses} `}>
            <span className="font-bold pr-4">-</span>
            {formatCurrency(data.totalIRRF)}
          </td>
        </tr>
        <tr className={trClasses}>
          <th scope="row" className={thClasses}>
            Plano Médico
          </th>
          <td className={`${tdClasses} `}>
            <span className="font-bold pr-4">-</span>
            {formatCurrency(data.plano_medico)}
          </td>
        </tr>
        <tr className={trClasses}>
          <th scope="row" className={thClasses}>
            Outros Descontos
          </th>
          <td className={`${tdClasses} `}>
            <span className="font-bold pr-4">-</span>
            {formatCurrency(data.outros_descontos)}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr className="font-bold text-teal-900 bg-teal-300">
          <th scope="row" className="px-6 py-3 text-base">
            Total
          </th>
          <td className={tdClasses}>{formatCurrency(data.totalGeral)}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;
