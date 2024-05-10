import { useState } from "react";
import { calcularAdicionalNoturno, calcularHoraTrabalho, calcularINSS, calcularIRRF } from "./calculos";
import Input from "./components/Input";

function App() {
  const [valorINSS, setValorINSS] = useState(0);
  const [valorIRRF, setValorIRRF] = useState(0);

  function handleOnSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const salarioBruto = parseFloat(fd.get("salario_bruto"));
    const totHorasNoturnas = parseFloat(fd.get("tot_horas_noturnas"));

    let inss = calcularINSS(salarioBruto);
    let irrf = calcularIRRF(salarioBruto, inss);
    setValorINSS(inss);
    setValorIRRF(irrf);

    const valorhoraTrabalho = calcularHoraTrabalho(salarioBruto);

    const valorAdicionalNoturno = valorhoraTrabalho * 0.3;

    const valorTotalAdicionalNoturno = calcularAdicionalNoturno(totHorasNoturnas, valorAdicionalNoturno);

    event.target.reset();
  }

  function handleOnClick() {
    setValorINSS(0);
  }

  return (
    <div className="w-full min-h-screen font-sans">
      <header className="py-4 text-center my-12 mx-auto">
        <h1 className="font-bold text-4xl tracking-wide text-teal-900">Calculadora de INSS</h1>
      </header>
      <main className="flex flex-col items-center justify-center p-12">
        <div className="border rounded-xl mx-auto bg-white p-4 shadow-xl">
          <form onSubmit={handleOnSubmit}>
            <Input text="Salário Bruto" type="number" step="0.01" name="salario_bruto" />
            <Input text="Horas Noturnas" type="number" step="0.01" name="tot_horas_noturnas" />
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
                <td>{valorINSS}</td>
              </tr>
              <tr>
                <td>IRRF</td>
                <td>{valorIRRF}</td>
              </tr>
              <tr>
                <td>Adicional Noturno (30%)</td>
                <td>{valorIRRF}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
