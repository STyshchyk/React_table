import React, {useMemo, useState, useEffect} from "react";
import Table from "./components/Table";
import './index.css'
function App() {
    const url = "https://oril-coins-test.herokuapp.com/list"
    const [data, setData] = useState([])
    const [userLoaded, setUserLoaded] = useState(false);
    const fetchUser = async () => {
        try {
            let response = await fetch(url);
            let json = await response.json();
            return {success: true, data: json};
        } catch (error) {
            // console.log(error);
            return {success: false};
        }
    }
    useEffect(() => {
        (async () => {
            setUserLoaded(false);
            let res = await fetchUser();
            if (res.success) {
                setData(res.data);
                setUserLoaded(true);
            }
        })();
    }, []);

    return (
        <div  className="App">
            <Table values={data}/>
        </div>
    );
}

export default App;
