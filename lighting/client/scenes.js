Template.lightScenes.helpers({
    scenes: function () {
        return lightscenes.find();
    },
    
    sceneSelector: {
        collection: lightscenes,
        displayTemplate: 'lightscenesListItem',
        fields: [{field: 'title', type: String}],
        sort: [['title', 1]],
        addbutton: false
    },
});

Template.lightScenes.events({
    'click .scene-add': function (event) {
        Meteor.call('sceneAdd');
    },
    
    'click .scene-clone': function (event, template) {
        Meteor.call('sceneClone', this._id);
    }
});