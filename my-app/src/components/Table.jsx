import React, {useState} from 'react';
import classes from "./Table.module.css";

const Table = (props) => {


    const [order, setOrder] = useState(false)
    const [order2, setOrder2] = useState(false)
    let dataArr = props.values;

    function getProperData(elem) {
        const date = new Date(elem)
        return `${date.getDay()}.${date.getHours()}.${date.getFullYear()}`;
    }

    function sortName() {
        if (!order) {
            dataArr.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            setOrder(true)
        }
        if (order) {
            dataArr.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
            setOrder(false)
        }
    }

    function sortState() {
        if (!order2) {
            dataArr.sort(function (x, y) {
                return (x.isActive === y.isActive) ? 0 : x.isActive ? -1 : 1;
            });
            setOrder2(true)
        }
        if (order2) {
            dataArr.sort(function (x, y) {
                return (y.isActive === x.isActive) ? 0 : y.isActive ? -1 : 1;
            });
            setOrder2(false)
        }
    }

    return (
        <table className={classes.myTable}>
            <thead>
            <tr>
                <th onClick={sortName} className={order ? classes.headerSortDown : classes.headerSortUp}>Name</th>
                <th>Date</th>
                <th onClick={sortState} className={order2 ? classes.headerSortDown : classes.headerSortUp}>State</th>
            </tr>
            </thead>
            <tbody>
            {dataArr.map(elem => {

                return <tr key={elem.id}>
                    <td>{elem.name}</td>
                    <td>{getProperData(elem.date)}</td>
                    <td className={elem.isActive ? "" : classes.red}>{elem.isActive ? "Active" : "Disable"}</td>
                </tr>
            })}
            </tbody>
        </table>
    );
};

export default Table;