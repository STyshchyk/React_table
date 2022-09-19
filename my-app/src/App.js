import React, {useState, useEffect} from "react";
import Table from "./components/Table";
import './index.css'
import Input from "./components/Input";

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

    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    function getFilteredData() {
        let array = [];
        if (search !== "") {
            data.forEach(elem => {
                if (elem.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) array.push(elem)
            })
            return array;
        }
        return data;
    }

    return (
        <div className="App">
            <input
                type="text"
                onChange={e => {
                    handleSearch(e);
                }}
                placeholder="Search"
            >
            </input>
            <Table values={getFilteredData()}/>
        </div>
    );
}

export default App;
