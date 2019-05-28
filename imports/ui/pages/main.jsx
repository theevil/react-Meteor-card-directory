import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class Main extends(React.Component) {
    constructor(props){
        super(props);
        this.state = {
            list_cards: [],
        };
    }

    componentWillMount(){
        Meteor.call('card.all', (err, callback) => {
            if(!err){
                this.setState({list_cards: callback})
            }
        })
        
    }
    
    render() {
        return (
            <div className='content'>
                <div className='card'>
                    {
                        this.state.list_cards.map((card) =>
                            <div className='item-list' onClick={()=>{window.location.href = `/custom/${card.domain}`}} id={card._id} key={card._id}>
                                {card.name}
                            </div>
                        )
                    }
                </div>
                <button className="btn btn-dark mouser-selector" style={{marginTop: '20px'}} onClick={()=>{window.location.href = `/new-card/1`}}>Nueva Tarjeta</button>
            </div>
        )
    }
}