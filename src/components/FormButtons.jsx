import LoadingIcon from "./utils/LoadingIcon";

function FormButtons({ onClickReset, isLoading }) {
  function handleClick(event) {
    event.preventDefault();
  }
  return (
    <div className="mt-auto flex w-full justify-end gap-1">
      <button type="reset" onMouseDown={onClickReset} className="py-2 px-4 text-teal-950">
        Limpar
      </button>
      <button disabled={isLoading} onMouseDown={handleClick} className=" items-center text-center w-24 flex justify-center text-sm font-medium rounded-lg text-white bg-teal-600">
        {!isLoading && "Calcular"}
        {isLoading && <LoadingIcon />}
      </button>
    </div>
  );
}

export default FormButtons;
