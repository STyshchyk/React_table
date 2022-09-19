import React, {useState} from 'react';
import classes from "./Table.module.css";

const Table = (props) => {
    const [order, setOrder] = useState(false)
    let dataArr = props.values;

    function getProperData(elem) {
        const date = new Date(elem)
        return `${date.getDay()}.${date.getHours()}.${date.getFullYear()}`;
    }

    function sort() {
        if (!order) {
            console.log("sort1")
            dataArr.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            setOrder(true)
        }
        if (order) {
            console.log("sort")
            dataArr.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
            setOrder(false)
        }
    }

    return (
        <table className={classes.myTable}>
            <thead>
            <tr>
                <th onClick={sort}>Name</th>
                <th>Date</th>
                <th>State</th>
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