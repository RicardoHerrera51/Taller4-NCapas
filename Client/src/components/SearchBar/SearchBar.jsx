import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar() {
    return (

        <form className="flex gap-2">
            <div className="w-full lg:w-64">
                {/* Hacer dinamico el placeholder */}
                <input type="text" className="input bg-white border-none text-greenish-black text-sm rounded-full block w-full h-8" placeholder="Search a song..." required />
            </div>
            <button className="btn btn-xs h-8 w-8 rounded-full border-none bg-light-green hover:bg-darkest-green active:bg-dark-green">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff", }} size="sm" />
            </button>
        </form>

    )
}
