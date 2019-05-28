import React from 'react';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import CardPresentation from '../components/card_present'

export default class Custom extends TrackerReact(React.Component) {
    render() {
        return (
            <div>
                <div className='spicer'>
                    <h2 className='title mouser-selector' onClick={()=>{window.location.href = `/`}}>Tarjeta de presentacion</h2>
                    <div className='content'>
                        <CardPresentation form={true} match={this.props.match}/>
                    </div>                    
                </div>
                <div className='spicer'>
                    <h2 className='title mouser-selector' onClick={()=>{window.location.href = `/`}}>Vista previa</h2>
                    <div className='content'>
                        <CardPresentation form={false} match={this.props.match}/>

                        <button id='path_route' className="btn btn-dark mouser-selector" style={{marginTop: '20px'}} onClick={()=>{window.location.href = `/${this.props.match.params.domain}`}}>Ver Tarjeta</button>
                    </div>                    
                </div>
            </div>
        )
    }
}