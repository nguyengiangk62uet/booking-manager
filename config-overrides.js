const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      // '@primary-color': '#eb1f3a',
      // '@link-color': '#047fff',
      // '@success-color': '#53c305',
      // '@warning-color': '#f78212',
      // '@error-color': '#ed1b23',
      // '@font-family': "'Roboto', sans-serif",
      // '@layout-body-background': '#ffffff',
      // '@text-color': '#333333',
      // '@border-color-base': '#e0e0e0',
      // '@input-placeholder-color': '#b4b4b4',
    },
  }),
);
