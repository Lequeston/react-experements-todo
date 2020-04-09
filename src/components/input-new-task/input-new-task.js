import React, {Component} from 'react';
import AddNewListItemPanel from '../add-new-list-item-panel';
import ItemAddFiler from '../item-add-filter';

class InputNewTask extends Component {

    state = {
        label: '',
    }

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value,
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const newLabel = this.state.label;
        this.props.onAddItem(newLabel);
        this.onClear();
    }

    onClear = () => {
        this.setState({
            label: '',
        });
    }

    render(){

        return(
            <form 
                className='bottom-panel d-flex'
                onSubmit={this.onSubmit}>
                    <AddNewListItemPanel 
                        onLabelChange={this.onLabelChange}
                        text={this.state.label}/>
                    <ItemAddFiler
                        onClear={this.onClear}/>
            </form>
        );
    }
};

export default InputNewTask;
