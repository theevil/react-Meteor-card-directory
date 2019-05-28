import { Meteor } from 'meteor/meteor';
import { Card } from './card';

Meteor.methods({
    'card.create' (data){
        if (data.id == ''){
            return Card.insert({
                name: data.name,
                age: data.age,
                phone: data.phone,
                domain: data.domain,
                description: data.descripcion
            })
        }else{
            Card.update({_id: data.id}, { $set:{
                name: data.name,
                age: data.age,
                phone: data.phone,
                domain: data.domain,
                description: data.descripcion
            }})
            return data.id
        }
    },

    'card.get'(id){
        return Card.findOne({_id: id})
    },

    'card.domain'(domain){
        return Card.findOne({domain: domain})
    },

    'card.all'(){
        return Card.find().fetch()
    }
})