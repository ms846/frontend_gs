import React, { Component } from 'react'
import "./table.css"

class TableInput extends Component{
    constructor(props) {
        super(props)

        // const node = this.allocation.current

        this.state = {
            sectorPercentage: null
        }

        this.handleChange = this.handleChange.bind(this)

    }

    // handleChange(event) {
    //     const allocation = event.target.value
    //     this.props.onChange(this.props.id, allocation)
    // }
    

    // componentDidUpdate(prevState){
    //     if (prevState.sectorPercentage != this.state.sectorPercentage){
    //         this.props.handleAllocation(index, this.s)
    //     }
    // }

    handleChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            sectorPercentage: value,
            [name]:  value, 
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state)
            }
        })
    }

    render() {
        return (
            <div>
                <form className="row-data">
                    <input
                        type="number"
                        name={this.props.category}
                        value={this.state.sectorPercentage}
                        onChange={this.handleChange}
                        min={10}
                    />
                    <input
                        type="checkbox"
                        value=""
                        onChecked={this.handleChange}
                    />
                </form>
            </div>
        )
    }
}

export default TableInput