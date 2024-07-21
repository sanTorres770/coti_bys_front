export default function Icon({svg}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
            <path fillRule="evenodd"
                  d={svg}
                  clipRule="evenodd"/>
        </svg>
    );
}
