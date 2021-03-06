import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import Index from "./pages/index";

import configStore from "./store";

import "./app.less";

const store = configStore();

class App extends Component {
  config: Config = {
    pages: ["pages/index/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
