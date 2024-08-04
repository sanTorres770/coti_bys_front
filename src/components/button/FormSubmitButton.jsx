export default function FormSubmitButton({value,handleSubmit}) {
    return (
        <button
            type="submit"
            onClick={() => handleSubmit}
            className="flex w-full justify-center rounded-md bg-indigo-600 mt-0 md:mt-6 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {value}
        </button>
    );
}