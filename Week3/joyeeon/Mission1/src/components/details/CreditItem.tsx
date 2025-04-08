import { Credit } from "../../types/credit"

interface CreditItemProps {
    credit:Credit;
}

const CreditItem = ({credit} : CreditItemProps) =>{
    const imgURL : string = 'https://image.tmdb.org/t/p/w500'

    return(
        <li key={credit.cast_id} 
        className="flex flex-col mb-6 justify-center items-center">
            {credit.profile_path ? (
                <img src={`${imgURL}${credit.profile_path}`} alt="프로필" 
                className="w-20 h-20 object-cover rounded-full"
                />
            ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex"> </div>
            )}
            
            <h6>{credit.name}</h6>
            <span className="text-xs text-gray-300">{credit.character}</span>
        </li>
    )
}

export default CreditItem