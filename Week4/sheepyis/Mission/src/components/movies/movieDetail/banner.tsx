import { Movie } from "../../../types/movie";

interface BannerProps {
    data: Movie;
}

const Banner = ({ data }: BannerProps) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    const Year = data.release_date?.slice(0, 4);
    
    return (
        <div className="w-[90%] h-[30vw] bg-cover bg-center rounded-[0.8vw] bg-blend-darken bg-[rgba(0,0,0,0.4)] relative mt-[2vw]" 
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className="w-1/2 h-full absolute top-0 left-0 border-b-[0.2vw] border-b-white text-white p-[2vw]">
               <p className="text-[2vw] font-bold">{data.title}</p>
               <p className="text-[1vw] mt-[1vw]">
                    평균: {data.vote_average}<br />
                    {Year}<br />
                    {data.runtime}분
                </p>
                
                <p className="italic text-[1.5vw] mt-[2vw]">{data.tagline}</p>

                <p className="text-[1vw]">{data.overview}</p>
            </div>
        </div>
    )
}

export default Banner;