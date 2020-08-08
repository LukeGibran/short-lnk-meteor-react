import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your Link',
        regEx: SimpleSchema.RegEx.Url,
      },
    }).validate({ url });

    Links.insert({
      id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
    });
  },

  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      visible: {
        type: Boolean,
      },
    }).validate({ _id, visible });

    const link = Links.update(
      { _id, userId: this.userId },
      { $set: { visible } }
    );

    if (!link) {
      throw new Meteor.Error('not-authorized');
    }
  },

  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({ _id });

    Links.update(
      { _id },
      {
        $set: {
          lastVisitedAt: new Date().getTime(),
        },
        $inc: {
          visitedCount: 1,
        },
      }
    );
  },
});
