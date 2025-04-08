import { Detail } from "../../types/details"

interface DetailItemProps {
    detail: Detail;
}

const DetailPanel = ({ detail }: DetailItemProps) => {
    const imgURL: string = 'https://image.tmdb.org/t/p/w1280'

    return (
        <header className="relative rounded-md h-[300px] overflow-hidden text-white">
            <img src={`${imgURL}${detail.backdrop_path}`} alt="background"
                className="absolute p-2 w-full h-[300px] rounded-md object-cover opacity-80"
            />
            <div className="relative z-10 flex flex-col justify-center h-full bg-gradient-to-r from-black/90 p-5">
                <h2 className="text-2xl font-bold mb-2">{detail.title}</h2>
                <h6>평균 {detail.vote_average}</h6>
                <h6>{detail.release_date.slice(0, 4)}</h6>
                <h6>{detail.runtime}분</h6>
                <h4>{detail.tagline || ""}</h4>
                <div className="mt-5 w-100 text-sm leading-relaxed"
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >{detail.overview}</div>
            </div>

        </header>
    )
}

export default DetailPanel