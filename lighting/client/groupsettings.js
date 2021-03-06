Template.lightGroupSettings.helpers({
    stages: function () {
        return stages.find({_id: {$ne: this.stage}});
    },
    
    titleOf: function (stageid) {
        var stage = stages.findOne({_id: stageid});
        if (stage) {return stage.title;}
        else {return 'Unassigned';}
    },

    members: function () {
        var members = [];
        this.members.forEach(function (memberid) {
            members.push(lights.findOne(memberid));
        });
        return members;
    },
    
    lightSelector: {
        collection: lights,
        displayTemplate: 'light',
        fields: [{field: 'title', type: String}, {field: 'stage', type: Stage}],
        sort: [['title', 1]],
        addbutton: true
    }
});

Template.lightGroupSettings.events({
    'click .group-add': function (event, template) {
        template.$('.group-add-modal').modal('show');
    },

    'click .group-add-close': function (event, template) {
        template.$('.group-add-modal').modal('hide');
    },
        
    'click .collection-add': function (event, template) {
        var lightid = $(event.target).data('id');
        Meteor.call('lightGroupAddLight', template.data._id, lightid);
    },
        
    'click .group-remove': function (event, template) {
        Meteor.call('lightGroupRemoveLight', template.data._id, this._id);
    },

    'click .group-settings': function (event, template) {
        template.$('.group-settings-modal').modal('show');
    },
    
    'click .group-settings-cancel': function (event, template) {
        template.$('.group-settings-modal').modal('hide');
    },
    
    'click .group-settings-delete': function (event, template) {
        template.$('.group-settings-modal').modal('hide');
        template.$('.delete-confirm-modal').modal('show');
    },
    
    'click .delete-cancel': function (event, template) {
        template.$('.delete-confirm-modal').modal('hide');
    },
    
    'click .delete-confirm': function (event, template) {
        template.$('.delete-confirm-modal').modal('hide');
        Meteor.call('lightGroupDel', this._id);
        Router.go('lightGroups');
    },
    
    'click .group-settings-save': function (event, template) {
        template.$('.group-settings-modal').modal('hide');
        var title = template.$('.group-title').val();
        if (title) Meteor.call('lightGroupTitle', this._id, title);
        
        var stage = template.$('.group-stage').val();
        if (stage) Meteor.call('lightGroupStage', this._id, stage);
    }
});
