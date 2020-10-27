import React from 'react'
import { contest_url, draftTables_url } from '../draft_kings/urls'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            contest_id: 95207245,
            draft_group_id: null,
            country_code: null,
            data: []
        }
    }
    componentDidMount(){
        axios.get(draftTables_url(40674))
        .then(response => {
            this.setState({
                data: response.data.draftables
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                <h1>DraftKings Lineup Optimizer</h1>
                <TableContainer>
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Position</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.data.map((row) => (
                        <TableRow key={row.draftableId}>
                            <TableCell>{row.position}</TableCell>
                            <TableCell>{row.displayName}</TableCell>
                            <TableCell>{row.draftStatAttributes[0].value}</TableCell>
                            <TableCell>{row.salary}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default Main;