# starter-vue-iview

This project is build for Vue.js 2 + vue-router + webpack2 + iView 3, just install and run.

## Install
```bush
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```

### issue
1. html loader error
```
ERROR in   Error: Child compilation failed:
  Module build failed: SyntaxError: Unexpected token (1:0)
  > 1 | <!DOCTYPE html>
      | ^
    2 | <html lang="zh-CN">
    3 | 
    4 | <head>

```
- solution (https://github.com/iview/iview-admin/issues/82):
```
npm install ejs-loader --save-dev

edit webpack.dev.config.js (31 line):  template: '!!ejs-loader!./src/template/index.ejs',
edit webpack.prod.config.js (40 line):  template: '!!ejs-loader!./src/template/index.ejs',

edit webpack.base.config.js (42 line):  test: /view/.*?js$/ 

npm run init

原因在于：如果不设定任何模板loader，HtmlWebpackPlugin会默认加载lodash loader，但我们需要ejs-loader。
``` 

