import { useEffect, useState } from "react";
import { calcularAdicionalNoturno, calcularDSRHorasExtras, calcularHoraTrabalho, calcularHorasExtras, calcularINSS, calcularIRRF } from "./calculos";
import Input from "./components/Input";
import { sanitizeCurrency } from "./utils";
import axios from "axios";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
function App() {
  const [valorINSS, setValorINSS] = useState(0);
  const [valorIRRF, setValorIRRF] = useState(0);
  const [valorTotalAdicionalNoturno, setValorTotalAdicionalNoturno] = useState(0);
  const [valorTotalHE75, setValorTotalHE75] = useState(0);
  const [valorTotalHE100, setValorTotalHE100] = useState(0);
  const [valorTotalDSRNoturno, setValorTotalDSRNoturno] = useState(0);
  const [valorTotalDSRHE, setValorTotalDSRHE] = useState(0);
  const [vTotal, setVTotal] = useState();

  async function handleOnSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const salarioBruto = sanitizeCurrency(fd.get("salario_bruto"));
    const horasNoturnas = fd.get("horas_noturnas");
    const horasExtras75 = fd.get("horas_extras_75");
    const horasExtras100 = fd.get("horas_extras_100");
    const diasUteis = fd.get("dias_uteis");
    const domingosFeriados = fd.get("domingos_feriados");

    const response = await axios.get("http://localhost:5042/api/holerite", {
      params: {
        SalarioBruto: salarioBruto,
        HorasNoturnas: horasNoturnas,
        HorasExtras75: horasExtras75,
        HorasExtras100: horasExtras100,
        DiasUteis: diasUteis,
        DomingosFeriados: domingosFeriados,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = response.data.dados;
    setValorINSS(data.totalINSS);
    setValorIRRF(data.totalIRRF);
    setValorTotalAdicionalNoturno(data.totalAdicionalNoturno);
    setValorTotalHE75(data.totalHorasExtras75);
    setValorTotalHE100(data.totalHorasExtras100);
    setValorTotalDSRNoturno(data.totalDSRNoturno);
    setValorTotalDSRHE(data.totalDSRHoraExtra);
    setVTotal(parseFloat(salarioBruto) + data.totalAdicionalNoturno + data.totalHorasExtras75 + data.totalHorasExtras100 + data.totalDSRNoturno + data.totalDSRHoraExtra - data.totalINSS - data.totalIRRF);
  }

  function handleOnClick() {
    setValorINSS(0);
    setValorIRRF(0);
    setValorTotalAdicionalNoturno(0);
  }

  return (
    <div className="w-full min-h-screen font-sans">
      <header className="py-4 text-center my-12 mx-auto">
        <h1 className="font-bold text-4xl tracking-wide text-teal-900">Previsão de folha de pagamento</h1>
      </header>
      <main className="flex flex-col items-center justify-center p-12">
        <div className="border rounded-xl mx-auto bg-white p-4 shadow-xl">
          <form onSubmit={handleOnSubmit}>
            <div className="flex flex-row justify-between gap-4">
              <Input text="Salário Bruto" mask="money" name="salario_bruto" />
              <Input text="Horas Noturnas" mask="time" name="horas_noturnas" />
              <Input text="Horas Extras 75%" mask="time" name="horas_extras_75" />
            </div>
            <div className="flex flex-row justify-between gap-4">
              <Input text="Horas 100%" mask="time" name="horas_extras_100" />
              <Input text="Dias Uteis" mask="number" step="1" name="dias_uteis" />
              <Input text="Domingos e feriados" mask="number" step="1" name="domingos_feriados" />
            </div>
            <div className="mt-auto flex w-full justify-end gap-1">
              <button type="reset" onClick={handleOnClick} className="py-2 px-4 text-teal-950">
                Limpar
              </button>
              <button className="py-2 px-4 text-sm font-medium rounded-lg text-white bg-teal-600">Calcular</button>
            </div>
          </form>
        </div>
        <div className="my-8">
          <table>
            <tbody>
              <tr>
                <td>INSS</td>
                <td className="text-right">-{valorINSS}</td>
              </tr>
              <tr>
                <td>IRRF</td>
                <td className="text-right">-{valorIRRF}</td>
              </tr>
              <tr>
                <td>Adicional Noturno (30%)</td>
                <td className="text-right">{valorTotalAdicionalNoturno}</td>
              </tr>
              <tr>
                <td>Horas extras 75%</td>
                <td className="text-right">{valorTotalHE75}</td>
              </tr>
              <tr>
                <td>Horas extras 100%</td>
                <td className="text-right">{valorTotalHE100}</td>
              </tr>
              <tr>
                <td>DSR Horas Noturnas</td>
                <td className="text-right">{valorTotalDSRNoturno}</td>
              </tr>
              <tr>
                <td>DSR Horas Extras</td>
                <td className="text-right">{valorTotalDSRHE}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>{vTotal}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
