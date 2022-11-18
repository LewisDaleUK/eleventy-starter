const fs = require('fs');
const prettier = require('prettier');
const config = require('./tailwind.config.js');


const groupToPrefix = (group, prefix) => {
  return Object.entries(group).map(([key, value]) => {
    if (value instanceof Object && !(value instanceof Array)) {
      return groupToPrefix(value, `${prefix}-${key}`);
    } else {
      return `--${prefix}-${key}: ${value};`
    }
  }).join('');
};
/*
  Converts the tailwind config elements into custom props.
*/
const generateCSSProps = () => {
  let result = '';

  const groups = [
    {key: 'colors', prefix: 'color'},
    {key: 'spacing', prefix: 'space'},
    {key: 'fontSize', prefix: 'text'},
    {key: 'fontFamily', prefix: 'font-family'},
    {key: 'screens', prefix: 'screen'},
    {key: 'gap', prefix: 'gap'},
  ];

  // Add a note that this is auto generated
  result += `
    /* VARIABLES GENERATED WITH TAILWIND CONFIG ON ${new Date().toLocaleDateString()}.
    Tokens location: ./tailwind.config.js */

    :root {
  `;

  // Loop each group's keys, use that and the associated
  // property to define a :root custom prop
  groups.forEach(({key, prefix}) => {
    const group = config.theme[key];

    if (!group) {
      return;
    }


    // Object.keys(group).forEach(key => {
    //   result += `--${prefix}-${key}: ${group[key]};`;
    // });

    result += groupToPrefix(group, prefix);
  });

  // Close the :root block
  result += `
    }
  `;

  // Make the CSS readable to help people with auto-complete in their editors
  result = prettier.format(result, {parser: 'scss'});

  // Push this file into the CSS dir, ready to go
  fs.writeFileSync('./css/custom-props.css', result);
};

generateCSSProps();
module.exports = generateCSSProps;
