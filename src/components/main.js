import React from 'react'
import { contest_url, draftTables_url } from '../draft_kings/urls'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import '../styles/styles.css'

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            all: [],
            qb: [],
            rb: [],
            wr: [],
            te: [],
            dst: [],
            lineup: [
                {
                    pos: 'QB',
                    player: null
                },
                {
                    pos: 'RB',
                    player: null
                },
                {
                    pos: 'RB',
                    player: null
                },
                {
                    pos: 'WR',
                    player: null
                },
                {
                    pos: 'WR',
                    player: null
                },
                {
                    pos: 'WR',
                    player: null
                },
                {
                    pos: 'TE',
                    player: null
                },
                {
                    pos: 'FLEX',
                    player: null
                },
                {
                    pos: 'DST',
                    player: null
                },

            ],
            added: new Set(),
            salary: '50,000'
        }
    }
    componentDidMount(){
        axios.get(draftTables_url(41095))
        .then(response => {
            var playerId = new Set()
            var d = response.data.draftables.filter(val => {
                if (!playerId.has(val.playerId)){
                    playerId.add(val.playerId)
                    return (val.playerId)
                }
            })
            this.setState({
                data: d
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render(){
        const renderOpp = (row) => {
            if (row.competition.nameDisplay[0].value === row.teamAbbreviation){
                return(
                    <p><b>{row.competition.nameDisplay[0].value}</b> {row.competition.nameDisplay[1].value + row.competition.nameDisplay[2].value }</p>
                )
            }else{
                return(
                    <p>{row.competition.nameDisplay[0].value + row.competition.nameDisplay[1].value} <b>{row.competition.nameDisplay[2].value}</b></p>
                )
            }
        }
        const renderStatus = (status) => {
            if (status === 'None'){
                return ""
            }else{
                return status
            }
        }
        const handleAdd = (player) => {
            var pos = 0
            switch(player.position){
                case "QB":
                    pos = 0
                    break;
                case "RB":
                    pos = 1
                    break;
                case 'WR':
                    pos = 3
                    break;
                case 'TE':
                    pos = 6
                    break;
                case 'FLEX':
                    pos = 7
                    break;
                case 'DST':
                    pos = 8
                    break;
                default:
                    break;
            }
            if (this.state.lineup[pos].lineup == null){
                const updateLineup = this.state.lineup.slice()
                updateLineup[pos].player = player
                this.setState(({ added, lineup }) => ({
                    added: new Set(added).add(player.draftableId),
                    lineup: updateLineup
                }))
            }
        }
        const handleRemove = (player) => {
            var pos = 0
            switch(player.position){
                case "QB":
                    pos = 0
                    break;
                case "RB":
                    pos = 1
                    break;
                case 'WR':
                    pos = 3
                    break;
                case 'TE':
                    pos = 6
                    break;
                case 'FLEX':
                    pos = 7
                    break;
                case 'DST':
                    pos = 8
                    break;
                default:
                    break;
            }
            const updateLineup = this.state.lineup.slice()
            updateLineup[pos].player = null
            this.setState(({ added, lineup }) => {
                const newChecked = new Set(added)
                newChecked.delete(player.draftableId)
                return {
                    added: newChecked,
                    lineup: updateLineup
                }
            })
        }
        return(
            <div>
                <h1>DraftKings Lineup Optimizer</h1>
                <Grid container
                    direction="row"
                    justify="space-evenly"
                    alignItems="flex-start"
                    >
                    <Grid item>
                        <Paper>
                            <TableContainer>
                                <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Position</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>OPP</TableCell>
                                        <TableCell>Value</TableCell>
                                        <TableCell>Salary</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.state.data.map((row) => (
                                    <TableRow key={row.draftableId} selected={this.state.added.has(row.draftableId)}>
                                        <TableCell>{row.position}</TableCell>
                                        <TableCell>{row.displayName + " " + renderStatus(row.status)}</TableCell>
                                        <TableCell>{renderOpp(row)}</TableCell>
                                        <TableCell>{row.draftStatAttributes.find(val => {return val.id === 90}).value}</TableCell>
                                        <TableCell>{row.salary}</TableCell>
                                        <TableCell>
                                            {
                                                this.state.added.has(row.draftableId)?
                                                <IconButton onClick={() => handleRemove(row)}>
                                                    <HighlightOffIcon/>
                                                </IconButton>
                                                :
                                                <IconButton onClick={() => handleAdd(row)}>
                                                    <AddCircleOutlineIcon/>
                                                </IconButton>  
                                            }
                                            
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className='sidebar'>
                            <div>
                                Salary Remaining: $ 50,000
                                Proj: 0.0 pts
                            </div>
                            <TableContainer>
                                <Table width="100%">
                                    <TableBody>
                                            <TableRow>
                                                {
                                                    this.state.lineup.map((row) =>{
                                                        return(
                                                            <TableRow>
                                                                <TableCell component="th" align="left" scope="row">
                                                                    <b>{row.pos}</b>
                                                                </TableCell>
                                                                <TableCell style={{ width: '100%' }}>
                                                                    {
                                                                        row.player?
                                                                        <p>{row.player.displayName}</p>
                                                                        :
                                                                        <p></p>
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Main;