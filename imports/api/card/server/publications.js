import { Meteor } from 'meteor/meteor';
import { Card } from '../card';

Meteor.publish('cards.all' , ( ) => {
    return Card.find();
});

Meteor.publish('cards.domain' , (domain) => {
    return Card.findOne({domain: domain})
});
