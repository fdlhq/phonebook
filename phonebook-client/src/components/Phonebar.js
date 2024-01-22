import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownZA, faArrowUpZA, faUserPlus } from '@fortawesome/free-solid-svg-icons'


const ButtonSortAsc = () => {
    return( <>
        <button className='btnSortAsc'><FontAwesomeIcon icon={faArrowDownZA}/></button>
        </>)
}

const ButtonSortDesc = () => {
    return( <>
        <button className='btnSortDesc'><FontAwesomeIcon icon={faArrowUpZA}/></button>
        </>)
}

const ButtonAdd = () => {
    return(
        <button className='btnAddName'>
            <FontAwesomeIcon icon={faUserPlus}/>
        </button>
    )
}


export default function Phonebar(){
    return (
        <div className='container-phonebar'>
            <div className='container-form'>
        <ButtonSortAsc/>
        <input className='input-form' placeholder='cari nama kamu'/>
        <ButtonAdd/>
        </div>
        </div>
        
        
    )
}