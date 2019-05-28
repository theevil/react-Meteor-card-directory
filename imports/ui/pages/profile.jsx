import React from 'react';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import CardPresentation from '../components/card_present'

export default class Profile extends TrackerReact(React.Component) {
    render() {
        return (
            <div className='profile-spicer'>
                <h2 className='title mouser-selector' onClick={()=>{window.location.href = `/`}}>Tarjeta Personal</h2>
                <div className='content'>
                    <CardPresentation form={false} match={this.props.match}/>
                </div>
            </div>
        )
    }
}