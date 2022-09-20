import React, {useState, useEffect, useRef} from "react";
import Table from "./components/Table";
import './index.css'

function App() {
    const url = "https://oril-coins-test.herokuapp.com/list"
    const [data, setData] = useState([])
    const [itemData, setItemData] = useState([])
    const [userLoaded, setUserLoaded] = useState(false);
    const [search, setSearch] = React.useState('');
    const [refValue, setRef] = useState()

    const fetchUser = async (url) => {
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
            let res = await fetchUser(url);
            if (res.success) {
                setData(res.data);
                setUserLoaded(true);
            }
        })();
    }, []);

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

export default App
