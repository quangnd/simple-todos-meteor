# Todo App with React
Integrate Meteor and React

# Problems
1. At step 1, if you get error `Target Container is not a DOM element`, you have two solutions:
- s1: Add `import './main.html';` to `main.js`
- s2: Run two commands below (see more at: https://guide.meteor.com/react.html#using-with-meteor)
```
meteor remove blaze-html-templates
meteor add static-html
```
