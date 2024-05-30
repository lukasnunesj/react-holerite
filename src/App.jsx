import axios from "axios";
import { useState } from "react";
import FormButtons from "./components/FormButtons";
import Input from "./components/Input";
import Table from "./components/Table";
import { calcTotalHoras, sanitizeCurrency } from "./utils";

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
    totalHoras: "00:00",
  });
  const [loadState, setLoadState] = useState({
    isLoading: false,
    loaded: false,
  });

  async function handleOnSubmit(event) {
    event.preventDefault();
    setLoadState(prevState => ({ ...prevState, isLoading: true, loaded: false }));
    const fd = new FormData(event.target);
    const salarioBruto = sanitizeCurrency(fd.get("salario_bruto"));
    const horasNoturnas = fd.get("horas_noturnas");
    const horasExtras75 = fd.get("horas_extras_75");
    const horasExtras100 = fd.get("horas_extras_100");
    const diasUteis = fd.get("dias_uteis");
    const domingosFeriados = fd.get("domingos_feriados");
    const plano_medico = sanitizeCurrency(fd.get("plano_medico"));
    const outros_descontos = sanitizeCurrency(fd.get("outros_descontos"));

    const totalHoras = calcTotalHoras([`${horasNoturnas}`, `${horasExtras75}`, `${horasExtras100}`]);

    try {
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
      setFolha({ ...response.data.dados, totalHoras });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadState(prevState => ({ ...prevState, isLoading: false, loaded: true }));
    }
  }

  function handleOnClickReset() {
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
    setLoadState(prevState => ({ ...prevState, isLoading: false, loaded: false }));
  }

  return (
    <div className="w-full flex flex-col items-stretch min-h-screen font-sans">
      <header className="py-12 text-center bg-teal-700">
        <h1 className="font-bold text-4xl tracking-wide text-white">Previsão de folha de pagamento</h1>
      </header>
      <main className="flex flex-col items-center justify-center p-4 md:p-12">
        <section className="w-full lg:3/4 xl:w-2/3 border rounded-xl mx-auto bg-white p-4 shadow-xl">
          <form onSubmit={handleOnSubmit}>
            <div className="flex lg:flex-row flex-col justify-between lg:gap-4">
              <Input text="Salário Bruto" mask="money" name="salario_bruto" required placeholder="0,00" />
              <Input text="Horas Extras Noturnas" mask="time" name="horas_noturnas" placeholder="99:99" />
              <Input text="Horas Extras 75%" mask="time" name="horas_extras_75" placeholder="99:99" />
              <Input text="Horas Extras 100%" mask="time" name="horas_extras_100" placeholder="99:99" />
            </div>
            <div className="flex lg:flex-row flex-col justify-between lg:gap-4">
              <Input text="Dias Uteis" mask="number" step="1" name="dias_uteis" placeholder="0" />
              <Input text="Domingos e feriados" mask="number" step="1" name="domingos_feriados" placeholder="0" />
              <Input text="Plano Médico" mask="money" name="plano_medico" placeholder="0,00" />
              <Input text="Outros Descontos" mask="money" name="outros_descontos" placeholder="0,00" />
            </div>
            <FormButtons onClickReset={handleOnClickReset} isLoading={loadState.isLoading} />
          </form>
        </section>
        {loadState.loaded && <Table folha={folha} />}
      </main>
      <footer className="flex-1 flex items-end justify-center py-4 text-center mt-12">
        <p className="text-center text-sm  text-black">
          Desenvolvido por{" "}
          <a className="text-teal-100 font-bold" href="https://github.com/lukasnunesj" target="_blank" rel="noreferrer">
            Lucas N. Joaquim
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
