import React, { useState, useEffect } from 'react'
import EmployeeRow from './EmployeeRow';
import currentEmployees from '../data/employee.json'


export default function EmployeeTable(props) {
    const [employees, setEmployees] = useState([])
    const [displayEmployees, setdisplayEmployees] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [newFilterValues, setNewFilterValues] = useState([]);

    const createEmployeeRows = (theArray) => {
        const display = theArray.map((ele, idx) => {
            return (<EmployeeRow
                key={idx}
                id={ele.login.uuid}
                first_name={ele.name.first}
                last_name={ele.name.last}
                email={ele.email}
                job_title={ele.cell}
            />)
        });
        
        return display;
    }

    // Lifecycle function
    useEffect(() => {
        fetch('https://randomuser.me/api/?results=50')
            .then(response => {
                // network failure, request prevented
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response);
                }
        
        
                return Promise.reject(new Error(response.statusText));
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
                return data.results ;
            })
            .then((data) => { 
                console.log(data)
                const display = createEmployeeRows(data)

                console.log("display", display);

                setdisplayEmployees([...displayEmployees, display])
                return data
             })
            .then((data) => {
                setEmployees((prev) => {
                    return [...prev, ...data]
                });
                // setEmployees(data.results)
             })
            .catch(error => {
                // common error
                return null;
            });
        
        
    }, []);

    const handleFilterChange = (evt) => {
        evt.preventDefault();
        if (evt.target.value === "No Filter") {
            const display = createEmployeeRows(employees)

            setdisplayEmployees(display)
            setFiltered(false);
            return 1;
        }
        // ANCHOR TThis is just atest
        let result = employees.filter(myemploy => {
            if (myemploy.gender === evt.target.value) {

                return myemploy;
            }
        })

        const mapResult = createEmployeeRows(result)

        if (mapResult !== null) {
            setNewFilterValues([...mapResult]);
            setFiltered(true)
        }
        else {
            setFiltered(false)
        }
    }

    const handleSortChange = (evt) => {
        evt.preventDefault();
        const sortEmploy = [...employees]

        sortEmploy.sort((a, b) => {
            if (a.name.last < b.name.last) { return -1; }
            if (a.name.last > b.name.last) { return 1; }
            return 0;
        });

        const display = createEmployeeRows(sortEmploy);

        setNewFilterValues(display)
        setFiltered(true)
    }

    return (
        <div>
            <div id="filterId">
                <label>
                    Filter Employees by:
                </label>
                <select onChange={handleFilterChange}>
                    <option value="No Filter">Filter</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    {/* <option value="Tester">Tester</option>
                    <option value="Manager">Manager</option>
                    <option value="Account Executive">Account Executive</option>
                    <option value="Help Desk">Help Desk</option> */}
                </select>
            </div>
            <div id="sortId">
                <label>
                    Sort Employees by:
                </label>
                <select onChange={handleSortChange}>
                    <option value="last_name">Sort</option>
                    <option value="last_name">Last Name</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Job Title</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered ? newFilterValues : displayEmployees}
                </tbody>
            </table>
        </div>
    )
}
