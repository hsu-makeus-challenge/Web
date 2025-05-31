import Spinner from "../../assets/Spinner.gif"

const IsLoading = () =>{
    return (
        <section className="flex flex-col items-center">
        <img src={Spinner} alt="로딩중" />
        <div>로딩중...</div>
        </section>
    )
}

export default IsLoading;