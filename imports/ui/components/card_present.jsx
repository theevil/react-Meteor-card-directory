import React from 'react';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import FormProfile from './form-profile'

import { Card } from '../../api/card/card'

export default class CardPresentation extends TrackerReact(React.Component) {
    constructor(props) {
        super(props);
        
        this.state = {
            data: {
                name: '',
                domain: '',
                age: '',
                phone: '',
                description: ''
            },
            id: '',
            subscriptions:{
                'card': Meteor.subscribe('cards.domain', this.props.match.params.domain)
            }
        }
    }

    card(){
        return Card.findOne({domain: this.props.match.params.domain})
    }
    
    componentWillUnmount(){
        this.state.subscriptions.card.stop();
    }
    
    render() {
        let cards = {
            name: '',
            domain: '',
            age: '',
            phone: '',
            description: ''
        }

        if (this.props.match.params.domain){
            cards = this.card();
    
            if (!cards){
                return (
                    <div className='card'>
                        <h1>Cargando ...</h1>
                    </div>
                );
            }
        }

        return (
            <div className='card'>
                <img className='center image' src={'https://cdn-images-1.medium.com/max/1600/1*DsD06sTC-X5AVj_m9nElRg.jpeg'} />

                {this.props.form?
                    <FormProfile match={this.props.match}/>
                    :
                    <div>
                        <h1>Nombre: {cards.name!=''?cards.name:''}</h1>
                        <p>Dominio: <strong>{cards.domain!=''?cards.domain:''}</strong></p>
                        <p>Edad: {cards.age!=''?cards.age:''}</p>
                        <p>Telefono: {cards.phone!=''?cards.phone:''}</p>
                        <p>Descripcion: {cards.description!=''?cards.description:''}</p>
                    </div>                   
                }
            </div>
        )
    }
}