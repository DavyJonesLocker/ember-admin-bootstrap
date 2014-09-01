import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  dogs: DS.hasMany('dog', {async: true})
});
