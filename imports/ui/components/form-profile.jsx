import { Meteor } from 'meteor/meteor';
import React from 'react';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import { Card } from '../../api/card/card'

export default class FormProfile extends TrackerReact(React.Component) {
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
        };
    }

    componentWillMount(){
        if(this.props.match.params.domain){
            Meteor.call('card.domain', this.props.match.params.domain ,(err, callback) => {
                if(!err){
                    this.setState({id: callback._id})
                    delete callback['_id']
                    this.setState({data: callback})
                }
            })
        }
    }

    card(){
        return Card.findOne({domain: this.props.match.params.domain})
    }
    
    componentWillUnmount(){
        this.state.subscriptions.card.stop();
    }

    saveDomain = (event)=> {
        event.preventDefault()
        window.location.href = `/custom/${this.state.data.domain}/`
    }

    updateData = (event) => {
        event.preventDefault()
        let data = this.state.data

        data[`${event.target.id}`] = event.target.value

        this.setState({data : data})

        data['id'] = this.state.id

        Meteor.call('card.create', data, (err, callback) => {
            if (!err){
                this.setState({id : callback})
            }
        })

       
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
        }

        return (
            <form className='form' >
                <div className='form-children'>
                    <label htmlFor="name">Nombre:</label>
                    <input id="name" className='form-control' defaultValue={cards.name} onChange={this.updateData} />
                </div>

                <div className='form-children'>
                    <label htmlFor="age">Edad:</label>
                    <input id="age" className='form-control' defaultValue={cards.age} onChange={this.updateData} />
                </div>

                <div className='form-children'>
                    <label htmlFor="phone">Telefono:</label>
                    <input id="phone" className='form-control' defaultValue={cards.phone} onChange={this.updateData} />
                </div>

                <div className='form-children'>
                    <label htmlFor="descripcion">Descripcion:</label>
                    <textarea id="descripcion" className='form-control' defaultValue={cards.description} onChange={this.updateData} />
                </div>

                <hr/>

                <div className='form-children'>
                    <label htmlFor="domain">Dominio:</label>
                    <div>
                        <input id="domain" className='form-control' defaultValue={cards.domain} onChange={this.updateData}/>
                        <button className='btn btn-dark' onClick={this.saveDomain} style={{width: '100%', marginTop: '7px', marginBottom: '6px'}}>Guardar Dominio</button>
                    </div>
                </div>
            </form>
        )
    }
}