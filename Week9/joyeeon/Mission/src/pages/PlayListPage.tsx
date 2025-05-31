import AllDeleteBtn from "../components/playlist/AllDeleteBtn";
import CartSummary from "../components/playlist/CaltSummary";
import PlayList from "../components/playlist/PlayList";
import Layout from "../layouts/Layout";


const PlayListPage = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <PlayList />
                <div className="flex flex-row justify-between items-start w-full px-20">
                    <AllDeleteBtn />
                    <CartSummary />
                </div>
            </div>
        </Layout>
    );
}

export default PlayListPage;