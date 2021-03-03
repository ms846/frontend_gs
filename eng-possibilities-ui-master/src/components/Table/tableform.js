import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import './table.css'
import InfoIcon from '@material-ui/icons/Info'
import Alert from '@material-ui/lab/Alert';
import SimpleModal from "./simplemodal";
import TablePopup from "./tablepopup";
import { Modal } from '@material-ui/core';

class TableForm extends Component {
    constructor() {
        super()

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
        this.stateMins = {
            energy: 5,
            financial: 4,
            estate: 15,
            technology: 6,
            pharmaceuticals: 10,
            airline: 10,
            retail: 10,
            gaming: 12
        }


        this.state = {
            alert: false,
            seen: false,
            invalids: [],
            energy: null,
            financial: null,
            estate: null,
            technology: null,
            pharmaceuticals: null,
            airline: null,
            retail: null,
            gaming: null
        }
    }

    handleChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            ...this.state,
            [name]:  Number(value), 
        })
    }

    togglePop = () => {
        console.log("state changed")
        this.setState({
           ...this.state,
          seen: !this.state.seen
        })
    }

    isValid = (value, min, max) =>
    value !== '' &&
    value !== '-' &&
    value !== null &&
    (min === undefined || value >= min) &&
    (max === undefined || value <= max);

    checkStateValidity(states) {
        var stateWithErrors = []
        var sum = 0 
        const toSkip = ['seen', 'name', 'invalids', 'sum']
        for (const property in states) {

            if (toSkip.includes(property)) {
                continue
            }

            console.log(property)

            sum += states[property]
            console.log(sum)
            if (!this.isValid(states[property], this.stateMins[property], 100)) {
                stateWithErrors.push(property)
            }
            console.log(stateWithErrors);
          }
        
        
        return [stateWithErrors, sum]
    }

    handleClick(event) {

        const {name, value, min} = event.target
        console.log(this.state)

        const [invalidStates, totalAllocation] = this.checkStateValidity(this.state)
    
        console.log(invalidStates)

        if (invalidStates.length === 0 && totalAllocation <= 100) {
            console.log("valid")
            this.setState({
                ...this.state,
                alert: false,
                sum: 0
            }, () => {
                if (this.props.onClick) {
                    this.props.onClick(this.state)
                }
            })
        } else {
            this.setState({
                ...this.state,
                alert: true,
                invalids: invalidStates
            })
        }
    }

    render() {
        return (

            <div className="input-container">
                <div>
                    <div className="btn" onClick={this.togglePop}>
                    <button>Info</button>
                    </div>
                    {this.state.seen ? 
                        <SimpleModal/>
                    : null}
                </div>

                {this.state.alert ? 
                <Alert severity="info">
                    {this.state.invalids.join(', ')} are below the threshold— 
                    <strong>Please change!</strong>
                </Alert> 
                : null}
            <div className="table-form">
                <form autoComplete="off">
                    <label>
                        Energy:
                        <input
                            name="energy"
                            value={this.state.energy}
                            type="number"
                            min="5"
                            onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>
                        Technology:
                        <input
                            name="technology"
                            value={this.state.technology}
                            type="number"
                            onChange={this.handleChange}
                            min="6"/>
                    </label>
                    <br />
                    <label>
                        Financial Services:
                        <input
                            name="financial"
                            value={this.state.financial}
                            type="number"
                            onChange={this.handleChange}
                            min="4"/>
                    </label>
                    <br />
                    <label>
                        Real Estate:
                        <input
                        name="estate"
                            value={this.state.estate}
                            type="number"
                            onChange={this.handleChange}
                            min="15"/>
                    </label>
                    <br />
                    </form>
                    <form>
                    <label>
                        Pharmaceuticals:
                        <input
                        name="pharmaceuticals"
                            value={this.state.pharmaceuticals}
                            type="number"
                            onChange={this.handleChange}
                            min="10"/>
                    </label>
                    <br />
                    <label>
                        Airline:
                        <input
                        name="airline"
                            value={this.state.airline}
                            type="number"
                            onChange={this.handleChange}
                            min="10"/>
                    </label>
                    <br />
                    <label>
                        Retail:
                        <input
                        name="retail"
                            value={this.state.retail}
                            type="number"
                            onChange={this.handleChange}
                            min="10"/>
                    </label>
                    <br />
                    <label>
                        Gaming:
                        <input
                        name="gaming"
                            value={this.state.gaming}
                            type="number"
                            onChange={this.handleChange}
                            min="12"/>
                    </label>
                    <br />
                </form>
            </div>
            <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.handleClick}
                >
                    Submit
                </Button>   
            </div>
        )
    }
}

export default TableForm