import { formatCurrency } from "../utils";

function Table({ folha }) {
  const trClasses = "bg-white border-b hover:bg-teal-50";
  const thClasses = "lg:pl-8 lg:pr-6 lg:py-4 pl-6 pr-4 py-2 font-medium text-black whitespace-nowrap ";
  const tdClasses = "lg:px-6 lg:py-3 px-4 py-2 text-right";

  const data = { ...folha };

  return (
    <>
      <section className="w-full lg:3/4 xl:w-2/3 mt-8 overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-md text-left text-black ">
          <tr className={trClasses}>
            <th className="lg:pl-8 lg:pr-6 lg:py-4 pl-6 pr-4 py-2 font-bold whitespace-nowrap">Total Horas Extras:</th>
            <td className={`${tdClasses} font-semibold`}>{folha.totalHoras}</td>
          </tr>
        </table>
      </section>
      <section className="w-full lg:3/4 xl:w-2/3 my-8 overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-teal-700 ">
          <thead className="text-xs text-teal-800 uppercase bg-teal-300">
            <tr>
              <th className="lg:px-6 lg:py-3 px-4 py-2">Salário Bruto</th>
              <th className="lg:px-6 lg:py-3 px-4 py-2 text-right">{formatCurrency(data.salarioBruto)}</th>
            </tr>
          </thead>
          <tbody>
            <tr className={trClasses}>
              <th scope="row" className={thClasses}>
                ( + ) Adicional Noturno (30%)
              </th>
              <td className={tdClasses}>{formatCurrency(data.totalAdicionalNoturno)}</td>
            </tr>
            <tr className={trClasses}>
              <th scope="row" className={thClasses}>
                ( + ) Horas extras 75%
              </th>
              <td className={tdClasses}>{formatCurrency(data.totalHorasExtras75)}</td>
            </tr>
            <tr className={trClasses}>
              <th scope="row" className={thClasses}>
                ( + ) Horas extras 100%
              </th>
              <td className={tdClasses}>{formatCurrency(data.totalHorasExtras100)}</td>
            </tr>
            <tr className={trClasses}>
              <th scope="row" className={thClasses}>
                ( + ) DSR Horas Noturnas
              </th>
              <td className={tdClasses}>{formatCurrency(data.totalDSRNoturno)}</td>
            </tr>
            <tr className={trClasses}>
              <th scope="row" className={thClasses}>
                ( + ) DSR Horas Extras
              </th>
              <td className={tdClasses}>{formatCurrency(data.totalDSRHoraExtra)}</td>
            </tr>

            <tr className="bg-teal-100">
              <th className="lg:px-6 lg:py-3 px-4 py-2">Total Debitos</th>
              <th className="lg:px-6 lg:py-3 px-4 py-2 text-right">{formatCurrency(data.totalDebitos)}</th>
            </tr>

            <tr className={trClasses}>
              <th scope="row" className={thClasses}>
                ( - ) Vale/Adiantamento (40%)
              </th>
              <td className={`${tdClasses}`}>{formatCurrency(data.valorValeAdiantamento)}</td>
            </tr>
            <tr className={trClasses}>
              <th scope="row" className={thClasses}>
                ( - ) INSS
              </th>
              <td className={`${tdClasses}`}>{formatCurrency(data.totalINSS)}</td>
            </tr>
            <tr className={trClasses}>
              <th scope="row" className={thClasses}>
                ( - ) IRRF
              </th>
              <td className={`${tdClasses} `}>{formatCurrency(data.totalIRRF)}</td>
            </tr>
            <tr className={trClasses}>
              <th scope="row" className={thClasses}>
                ( - ) Plano Médico
              </th>
              <td className={`${tdClasses} `}>{formatCurrency(data.planoMedico)}</td>
            </tr>
            <tr className={trClasses}>
              <th scope="row" className={thClasses}>
                ( - ) Outros Descontos
              </th>
              <td className={`${tdClasses} `}>{formatCurrency(data.outrosDescontos)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="font-bold text-teal-900 bg-teal-300">
              <th scope="row" className="lg:px-6 lg:py-3 px-4 py-2 text-base">
                Total
              </th>
              <td className={tdClasses}>{formatCurrency(data.totalGeral)}</td>
            </tr>
          </tfoot>
        </table>
      </section>
      <p className="w-full xl:w-2/3 -mt-4 mb-8 text-center text-xs text-black">
        Valores aproximados, calculados com as tabelas de INSS e IRRF de 2026 e sem dependentes. Não substitui o holerite.
      </p>
    </>
  );
}

export default Table;
