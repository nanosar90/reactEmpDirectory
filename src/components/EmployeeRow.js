import React from 'react'

export default function EmployeeRow(props) {
    return (
        <>
            <tr key={props.id}>
                <td> {props.first_name} </td>
                <td> {props.last_name} </td>
                <td> {props.email} </td>
                <td> {props.job_title} </td>
            </tr>
        </>
    )
}
