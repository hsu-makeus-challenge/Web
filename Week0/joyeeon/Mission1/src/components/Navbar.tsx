const Navbar: React.FC = () =>{
    return(
        <nav className="navbar">
            <img className="icon"
            src="UMC_logo.png" alt="로고" />

            <article className = "taps">
                <ul>소개</ul>
                <ul>프로젝트</ul>
                <ul>Q&A</ul>
                <ul>지원하기</ul>
                
            </article>
            <button style={{backgroundColor:'transparent', border:'none'}}>
                <img  className="hambuger" src="Hambuger.png" alt="햄버거" />
            </button>
            
        </nav>
    )
}

export default Navbar;