const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Generate Wrapper context for react components',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'dirPath',
      message: 'What should it be path?',
      default: 'Button',
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }
        return 'The name is required';
      },
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../src/components/{{camelCase name}}/{{camelCase name}}.tsx',
        templateFile: './wrapperContext/main.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../src/components/{{camelCase name}}/{{camelCase name}}Context.tsx',
        templateFile: './wrapperContext/context.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../src/components/{{camelCase name}}/{{camelCase name}}Wrapper.tsx',
        templateFile: './wrapperContext/wrapper.js.hbs',
        abortOnFail: true,
      },
    ];

    actions.push({
      type: 'prettify',
      path: '/components/',
    });
    return actions;
  },
};
