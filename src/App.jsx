import axios from "axios";
import { useState } from "react";
import Input from "./components/Input";
import Table from "./components/Table";
import { sanitizeCurrency } from "./utils";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  const [folha, setFolha] = useState({
    salarioBruto: 0,
    totalINSS: 0,
    totalIRRF: 0,
    totalAdicionalNoturno: 0,
    totalHorasExtras75: 0,
    totalHorasExtras100: 0,
    totalDSRNoturno: 0,
    totalDSRHoraExtra: 0,
    totalGeral: 0,
    totalDebitos: 0,
    planoMedico: 0,
    outrosDescontos: 0,
    valorValeAdiantamento: 0,
  });

  async function handleOnSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const salarioBruto = sanitizeCurrency(fd.get("salario_bruto"));
    const horasNoturnas = fd.get("horas_noturnas");
    const horasExtras75 = fd.get("horas_extras_75");
    const horasExtras100 = fd.get("horas_extras_100");
    const diasUteis = fd.get("dias_uteis");
    const domingosFeriados = fd.get("domingos_feriados");
    const plano_medico = sanitizeCurrency(fd.get("plano_medico"));
    const outros_descontos = sanitizeCurrency(fd.get("outros_descontos"));

    const response = await axios.get("api/holerite", {
      params: {
        SalarioBruto: salarioBruto,
        HorasNoturnas: horasNoturnas,
        HorasExtras75: horasExtras75,
        HorasExtras100: horasExtras100,
        DiasUteis: diasUteis,
        DomingosFeriados: domingosFeriados,
        PlanoMedico: plano_medico,
        OutrosDescontos: outros_descontos,
      },
    });
    setFolha(response.data.dados);
  }

  function handleOnClick() {
    setFolha({
      salarioBruto: 0,
      totalINSS: 0,
      totalIRRF: 0,
      totalAdicionalNoturno: 0,
      totalHorasExtras75: 0,
      totalHorasExtras100: 0,
      totalDSRNoturno: 0,
      totalDSRHoraExtra: 0,
      totalGeral: 0,
      totalDebitos: 0,
      planoMedico: 0,
      outrosDescontos: 0,
    });
  }

  return (
    <div className="w-full min-h-screen font-sans">
      <header className="py-4 text-center my-12 mx-auto">
        <h1 className="font-bold text-4xl tracking-wide text-teal-900">Previsão de folha de pagamento</h1>
      </header>
      <main className="flex flex-col items-center justify-center p-4 md:p-12">
        <div className=" w-full lg:w-2/4 border rounded-xl mx-auto bg-white p-4 shadow-xl">
          <form onSubmit={handleOnSubmit}>
            <div className="flex lg:flex-row flex-col justify-between lg:gap-4">
              <Input text="Salário Bruto" mask="money" name="salario_bruto" required placeholder="0,00" />
              <Input text="Horas Noturnas" mask="time" name="horas_noturnas" placeholder="99:99" />
              <Input text="Horas Extras 75%" mask="time" name="horas_extras_75" placeholder="99:99" />
              <Input text="Horas 100%" mask="time" name="horas_extras_100" placeholder="99:99" />
            </div>
            <div className="flex lg:flex-row flex-col justify-between lg:gap-4">
              <Input text="Dias Uteis" mask="number" step="1" name="dias_uteis" placeholder="0" />
              <Input text="Domingos e feriados" mask="number" step="1" name="domingos_feriados" placeholder="0" />
              <Input text="Plano Médico" mask="money" name="plano_medico" placeholder="0,00" />
              <Input text="Outros Descontos" mask="money" name="outros_descontos" placeholder="0,00" />
            </div>
            <div className="flex flex-row justify-between gap-4"></div>
            <div className="mt-auto flex w-full justify-end gap-1">
              <button type="reset" onClick={handleOnClick} className="py-2 px-4 text-teal-950">
                Limpar
              </button>
              <button className="py-2 px-4 text-sm font-medium rounded-lg text-white bg-teal-600">Calcular</button>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-2/4 my-8 overflow-x-auto shadow-md rounded-lg">
          <Table folha={folha} />
        </div>
      </main>
    </div>
  );
}

export default App;
