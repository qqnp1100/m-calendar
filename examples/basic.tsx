/* tslint:disable:no-console */

import "rmc-picker/assets/index.css";
import "rmc-date-picker/assets/index.css";
import "rmc-calendar-bxb/assets/index.less";

import React from "react";
import ReactDOM from "react-dom";
import { Calendar, CalendarBxb, ExtraData, CalendarPropsType } from "../src";

import zhCN from "../src/locale/zh_CN";
import enUS from "../src/locale/en_US";
const en = location.search.indexOf("en") !== -1;

const extra: { [key: string]: ExtraData } = {
  1501516800000: { info: "建军节" },
  "2017/06/14": { info: "禁止选择", disable: true },
  "2017/06/15": { info: "Disable", disable: true }
};

const now = new Date();
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = {
  info: "禁止选择",
  disable: true
};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = {
  info: "Disable",
  disable: true
};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = {
  info: "Disable",
  disable: true
};
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = {
  info: "Disable",
  disable: true
};

for (let key in extra) {
  if (extra.hasOwnProperty(key)) {
    let info = extra[key];
    const date = new Date(key);
    if (!Number.isNaN(+date) && !extra[+date]) {
      extra[+date] = info;
    }
  }
}

class BasicDemo extends React.Component<
  {},
  {
    show: boolean;
    showbxb: boolean;
    config?: CalendarPropsType;
    startTime?: Date;
    endTime?: Date;
  }
> {
  originbodyScrollY = document.getElementsByTagName("body")[0].style.overflowY;

  constructor(props: any) {
    super(props);
    this.rem(document, window);
    this.state = {
      show: false,
      showbxb: false,
      config: {}
    };
  }
  rem(doc: any, win: any) {
    var docEl = doc.documentElement,
      isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
      dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
      dpr = 1,
      scale = 1 / dpr,
      resizeEvt =
        "orientationchange" in window ? "orientationchange" : "resize";
    docEl.dataset.dpr = dpr;
    var metaEl = doc.createElement("meta");
    metaEl.name = "viewport";
    metaEl.content =
      "initial-scale=" +
      scale +
      ",maximum-scale=" +
      scale +
      ", minimum-scale=" +
      scale;
    docEl.firstElementChild.appendChild(metaEl);
    var recalc = function() {
      var width = docEl.clientWidth;
      if (width / dpr > 750) {
        width = 750 * dpr;
      }
      // 乘以100，px : rem = 100 : 1
      docEl.style.fontSize = 100 * (width / 750) + "px";
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
  }
  renderBtn(text: string, text2: string, config: CalendarPropsType = {}) {
    return (
      <div
        style={{
          background: "#1A7BE6",
          padding: 5,
          margin: 10,
          textAlign: "center"
        }}
        onClick={() => {
          document.getElementsByTagName("body")[0].style.overflowY = "hidden";
          this.setState({
            show: true,
            config
          });
        }}
      >
        <p style={{ color: "#fff", margin: 0, padding: 0 }}>{text}</p>
        <p style={{ color: "#fff", margin: 0, padding: 0 }}>{text2}</p>
      </div>
    );
  }
  renderBtnBxb(text: string, text2: string, config: CalendarPropsType = {}) {
    return (
      <div
        style={{
          background: "#1A7BE6",
          padding: 5,
          margin: 10,
          textAlign: "center"
        }}
        onClick={() => {
          document.getElementsByTagName("body")[0].style.overflowY = "hidden";
          this.setState({
            showbxb: true,
            config
          });
        }}
      >
        <p style={{ color: "#fff", margin: 0, padding: 0 }}>{text}</p>
        <p style={{ color: "#fff", margin: 0, padding: 0 }}>{text2}</p>
      </div>
    );
  }

  render() {
    return (
      <div style={{ marginTop: 10, marginBottom: 10, fontSize: 14 }}>
        {this.renderBtn("选择日期区间", "Select Date Range")}
        {this.renderBtnBxb("选择日期区间bxb", "Select Date Range")}
        {this.renderBtn("选择日期时间区间", "Select DateTime Range", {
          pickTime: true
        })}
        {this.renderBtn("选择日期", "Select Date", { type: "one" })}
        {this.renderBtn("选择日期时间", "Select DateTime", {
          type: "one",
          pickTime: true
        })}
        {this.renderBtn("选择日期区间(快捷)", "Select Date Range (Shortcut)", {
          showShortcut: true
        })}
        {this.renderBtn(
          "选择日期时间区间(快捷)",
          "Select DateTime Range (Shortcut)",
          { pickTime: true, showShortcut: true }
        )}
        {this.renderBtn("水平进入", "Horizontal Enter Aniamtion", {
          enterDirection: "horizontal"
        })}
        {this.renderBtn("默认选择范围", "Selected Date Range", {
          defaultValue: [
            new Date(+new Date() - 1 * 24 * 3600 * 1000),
            new Date(+new Date() - 4 * 24 * 3600 * 1000)
          ]
        })}
        {this.renderBtn("onSelectAPI", "onSelectAPI", {
          onSelect: date => {
            console.log("onSelect", date);
            return [date, new Date(+new Date() - 7 * 24 * 3600 * 1000)];
          }
        })}
        <div style={{ marginLeft: 10, fontSize: 14 }}>
          {this.state.startTime && (
            <p>开始时间：{this.state.startTime.toLocaleString()}</p>
          )}
          {this.state.endTime && (
            <p>结束时间：{this.state.endTime.toLocaleString()}</p>
          )}
        </div>
        <Calendar
          locale={en ? enUS : zhCN}
          {...this.state.config}
          visible={this.state.show}
          onCancel={() => {
            document.getElementsByTagName(
              "body"
            )[0].style.overflowY = this.originbodyScrollY;
            this.setState({
              show: false,
              startTime: undefined,
              endTime: undefined
            });
          }}
          onConfirm={(startTime, endTime) => {
            console.log("onConfirm", startTime, endTime);
            document.getElementsByTagName(
              "body"
            )[0].style.overflowY = this.originbodyScrollY;
            this.setState({
              show: false,
              startTime,
              endTime
            });
          }}
          onSelectHasDisableDate={(dates: Date[]) => {
            console.warn("onSelectHasDisableDate", dates);
          }}
          getDateExtra={date => {
            return extra[+date];
          }}
          minDate={new Date(+new Date() - 62 * 24 * 3600 * 1000)}
          maxDate={new Date(+new Date() + 365 * 24 * 3600 * 1000)}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: 667
          }}
        >
          <CalendarBxb
            locale={en ? enUS : zhCN}
            {...this.state.config}
            visible={this.state.showbxb}
            onCancel={() => {
              document.getElementsByTagName(
                "body"
              )[0].style.overflowY = this.originbodyScrollY;
              this.setState({
                showbxb: false,
                startTime: undefined,
                endTime: undefined
              });
            }}
            onConfirm={(startTime, endTime) => {
              console.log("onConfirm", startTime, endTime);
              document.getElementsByTagName(
                "body"
              )[0].style.overflowY = this.originbodyScrollY;
              this.setState({
                showbxb: false,
                startTime,
                endTime
              });
            }}
            onSelectHasDisableDate={(dates: Date[]) => {
              console.warn("onSelectHasDisableDate", dates);
            }}
            minDate={new Date(+new Date() - 62 * 24 * 3600 * 1000)}
            maxDate={new Date(+new Date() + 365 * 24 * 3600 * 1000)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<BasicDemo />, document.getElementById("__react-content"));
