import TopTabs from "../components/home/TopTabs";
import FamilyHeader from "../components/home/FamilyHeader";

function Home() {
    return (
        <div>
            <TopTabs />
            <FamilyHeader/>
            <h2>Upcoming Events</h2>
            <h2>Tasks</h2>
            <h2>Shopping Lists</h2>
            <h2>Meal Plan</h2>
        </div>
    );
}

export default Home;