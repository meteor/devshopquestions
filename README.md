About this app
--------------

This is the questions app used on monthly Meteor Devshops at San Francisco.

From 2pm to 6pm there is a co-working session during the devshop, people work on
their projects, learn Meteor or just held interesting conversations on related
topics.

Sometimes people have technical questions or questions about certain application
design decisions. They are looking for help from people around them and then
they would use this app to post a question.

Core developers, volunteers or anyone else can look at the question they are
interested in and help the asker in person. It is very important to preserve the
idea of live personal help as opposed to a text-based answer or a link to
Google. We want people to communicate in person as they are already on devshop
onsite, otherwise we would just use StackOverflow.


Questions
---------

Each question has a one-line description of their problem and the question. We
encourage users to put their real names and their location within the devshop so
someone can find them to answer the question.

App allows users to login with their GitHub account to have a control over their
question if they want to delete it or to mark as "answered". Also the app would
auto-fill their name from GitHub as well as their user picture.

Question can be marked as answered, deleted or edited by the creator or an admin.

App allows anonymous questions and questions by guests just in case the asker
doesn't have a GitHub account or doesn't want to share it.

Banner notification
-------------------

There is a small one-line banner notification from devshop organizers on the top
of app interface. Usually it is about something happening on the event right now.

Examples:

    There is a skeeball competition upstairs! Be sure to post your highest score!

or

    Free flushots are on the second floor!


Displays view
-------------

On http://devshopquestions.meteor.com/displays we have a special view to project
on the wall. In this view we emphasize the banner notification, questions and
the Twitter feed on #Devshop.

Admins
------

Admins can modify/delete/mark as answered any question. In addition admins can
flag the question as "difficult" to ask for more help from core developers.

Admins are configured in http://devshopquestions.meteor.com/admin panel and
added by their GitHub names.

Deployment
----------

For some reason jquery.more plugin works incorrectly when all js code is
minified and concatenated. Right now, I deploy with `--debug` option.

Update: the real story is about CSS minifier. We were hitting some random bug
with minification of bootstrap theme and jquery plugin. The minifier update
landed on devel which will fix it. Whenever there is a new
template-engine-preview release with the merge of 0.6.4 or 0.7 - it will be
fixed.

