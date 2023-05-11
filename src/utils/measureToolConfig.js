function measureToolsConfig(measureType) {
  /**
   * @param measureType 测量类型,包括length,area,azimuth
   *
   */
  let options;
  if (measureType === 'length') {
    options = {
      font: '13pt 微软雅黑',
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      showBackground: false,
      // backgroundColor: new Cesium.Color(0, 0.6, 0.1, 0.4),
      pixelOffset: new Cesium.Cartesian2(0, -4),
      //地形贴地长度测量
      isTerrain: true,
      paneNum: 32,
      showMoreInfo: true,
      // 量测结果单位，可选"meters" | "kilometers"
      unit: 'meters',
      pointStyle: {
        color: Cesium.Color.RED,
      },
      lineStyle: {
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.15,
          color: Cesium.Color.fromCssColorString('#568aea'),
        }),
        depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.1,
          color: Cesium.Color.fromCssColorString('#00c2ff'),
        }),
      },
      //测量完毕后提示框的回调函数，可以覆盖提示内容
      labelCallBack: function (currentLength, totalLength, label) {
        label.text =
          '前段长度：' +
          currentLength.toFixed(2).toString() +
          '米' +
          '\n' +
          '总长度' +
          totalLength.toFixed(2).toString() +
          '米';
        label.fillColor = Cesium.Color.BLUE;
      },
    };
  } else if (measureType === 'area') {
    options = {
      font: '13pt 楷体',
      fillColor: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
      outlineColor: new Cesium.Color(1.0, 1.0, 0.0, 0.5),
      outlineWidth: 4.0,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      showBackground: true,
      backgroundColor: new Cesium.Color(0, 0.6, 0.1, 0.4),
      pixelOffset: new Cesium.Cartesian2(0, -4),
      isTerrain: true,
      classificationType: 2,
      lineStyle: {
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.15,
          color: Cesium.Color.RED,
        }),
        depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.15,
          color: Cesium.Color.RED,
        }),
      },
      //是否连续绘制，true：是，false：否
      isContinueDraw: false,
      // 回调函数，返回量测结果
      callBack: function (result, positions) {
        console.log('计算结果：', result);
        console.log('位置点：', positions);
      },
      //测量完毕后提示框的回调函数，可以覆盖提示内容
      labelCallBack: function (result, label) {
        label.text = '当前面积：' + result.toFixed(2).toString() + '平方米';
        label.fillColor = Cesium.Color.BLUE;
      },
    };
  } else if (measureType === 'azimuth') {
    options = {
      //是指南针模式还是测量夹角模式，true：指南针，false：夹角
      isFixAxis: true,
      //提示框样式
      labelStyle: {
        font: '13pt 微软雅黑',
        // fillColor: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
        // outlineColor: new Cesium.Color(1.0, 1.0, 0.0, 0.5),
        // outlineWidth: 4.0,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        showBackground: false,

        pixelOffset: new Cesium.Cartesian2(0, -4),
      },
      //测量线式
      lineStyle: {
        width: 3,
      },
      //删除测量结果图标样式
      closePointStyle: {
        scale: 1.4,
      },
      //罗盘样式
      compassStyle: {
        material: new Cesium.ImageMaterialProperty({
          image:
            'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjYyNTQxNTk4MDk1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY2ODYiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTkxMi43MjE5MiA1MDEuOTEzNmwtNTguMjI0NjQtNy43ODI0Yy00LjMzMTUyLTgzLjQ5Njk2LTM4LjgxOTg0LTE1OS4wOTg4OC05Mi42ODIyNC0yMTYuMjU4NTZsNDEuMDExMi00MS4wMTEyYTEwLjIyOTc2IDEwLjIyOTc2IDAgMSAwLTE0LjQ3OTM2LTE0LjQ3OTM2bC00MS4wMTEyIDQxLjAxMTJjLTU3LjM4NDk2LTU0LjA2NzItMTMzLjM0NTI4LTg4LjU5NjQ4LTIxNy4yMjExMi05Mi43MTI5NmwtNy45NTY0OC01OS40MDIyNGExMC4yNTAyNCAxMC4yNTAyNCAwIDAgMC0yMC4zMDU5MiAwbC03Ljk2NjcyIDU5LjU0NTZjLTgyLjkyMzUyIDQuNjM4NzItMTU3Ljk5Mjk2IDM5LjAxNDQtMjE0LjgyNDk2IDkyLjU1OTM2bC00MS4wMTEyLTQxLjAxMTJhMTAuMjI5NzYgMTAuMjI5NzYgMCAxIDAtMTQuNDc5MzYgMTQuNDc5MzZsNDEuMDExMiA0MS4wMTEyYy01My43OTA3MiA1Ny4wNzc3Ni04OC4yNDgzMiAxMzIuNTU2OC05Mi42NjE3NiAyMTUuOTEwNGwtNjAuNjQxMjggOC4xNDA4YTEwLjI0IDEwLjI0IDAgMCAwIDAgMjAuMjk1NjhsNjAuNjQxMjggOC4xMjAzMmM0LjQyMzY4IDgzLjMyMjg4IDM4Ljg3MTA0IDE1OC43NjA5NiA5Mi42NDEyOCAyMTUuODE4MjRsLTQxLjAwMDk2IDQxLjAwMDk2YTEwLjIyOTc2IDEwLjIyOTc2IDAgMSAwIDE0LjQ3OTM2IDE0LjQ3OTM2bDQxLjAwMDk2LTQxLjAwMDk2YzU2LjgzMiA1My41NTUyIDEzMS45MDE0NCA4Ny45MzA4OCAyMTQuODI0OTYgOTIuNTc5ODRsNy45ODcyIDU5LjUwNDY0YTEwLjI0IDEwLjI0IDAgMCAwIDIwLjI5NTY4IDAuMDEwMjRsNy45NTY0OC01OS4zNTEwNGM4My44ODYwOC00LjEwNjI0IDE1OS44NTY2NC0zOC42NDU3NiAyMTcuMjQxNi05Mi43MjMybDQxLjAwMDk2IDQxLjAwMDk2YTEwLjIwOTI4IDEwLjIwOTI4IDAgMCAwIDE0LjQ3OTM2IDAgMTAuMjI5NzYgMTAuMjI5NzYgMCAwIDAgMC0xNC40NzkzNmwtNDEuMDAwOTYtNDEuMDAwOTZjNTMuODMxNjgtNTcuMTM5MiA4OC4zMDk3Ni0xMzIuNzAwMTYgOTIuNjYxNzYtMjE2LjE0NTkybDU4LjIyNDY0LTcuODAyODhhMTAuMjUwMjQgMTAuMjUwMjQgMCAwIDAgMC4wMTAyNC0yMC4zMDU5MnogbS03OC45NzA4OC0xMC41NTc0NGwtMzUuMjc2OC00LjcyMDY0Yy0xMi4xMjQxNi0xMzcuNTIzMi0xMjMuMjM4NC0yNDguMzQwNDgtMjYwLjg2NC0yNTkuOTkzNmwtNC43MjA2NC0zNS4yNDYwOGMxNjEuMTY3MzYgOS43ODk0NCAyOTAuNTgwNDggMTM4LjkxNTg0IDMwMC44NjE0NCAyOTkuOTYwMzJ6IG0tMzg5Ljc3NTM2LTM0LjA4ODk2TDI0OC45ODU2IDQ4My40MzA0YzYuMjQ2NC01Ny45OTkzNiAzMS41Njk5Mi0xMTAuNjUzNDQgNjkuNTM5ODQtMTUxLjYxMzQ0bDEyNS40NTAyNCAxMjUuNDUwMjR6TTMzMy4wMTUwNCAzMTcuMzQ3ODRjNDAuNzA0LTM3Ljc0NDY0IDkyLjk2ODk2LTYyLjk3NiAxNTAuNTU4NzItNjkuNDE2OTZMNDU3LjYxNTM2IDQ0MS45NTg0IDMzMy4wMTUwNCAzMTcuMzQ3ODR6IG0xMjQuNDc3NDQgMjY0LjgzNzEybDI2LjAxOTg0IDE5My45MjUxMmMtNTguMzg4NDgtNi40NjE0NC0xMTAuNjYzNjgtMzEuMjkzNDQtMTUxLjE2Mjg4LTY4Ljc3MTg0bDEyNS4xNDMwNC0xMjUuMTUzMjh6TTMxNy44NzAwOCA2OTIuODU4ODhjLTM3LjcwMzY4LTQwLjc0NDk2LTYyLjYxNzYtOTMuMzk5MDQtNjguODk0NzItMTUyLjE4Njg4bDE5NC45NTkzNiAyNi4xMjIyNC0xMjYuMDY0NjQgMTI2LjA2NDY0eiBtMTMzLjc5NTg0LTE4MC44NDg2NGMwLTMzLjkyNTEyIDI3LjU5NjgtNjEuNTMyMTYgNjEuNTMyMTYtNjEuNTMyMTZzNjEuNTMyMTYgMjcuNjA3MDQgNjEuNTMyMTYgNjEuNTMyMTYtMjcuNTk2OCA2MS41MzIxNi02MS41MzIxNiA2MS41MzIxNi02MS41MzIxNi0yNy42MDcwNC02MS41MzIxNi02MS41MzIxNnogbTg4Ljc2MDMyLTI2NC4zNDU2YzU4LjY0NDQ4IDYuMDEwODggMTExLjgwMDMyIDMxLjM2NTEyIDE1My4wMzY4IDY5LjU5MTA0TDU2Ni43MzI4IDQ0My45OTYxNmwtMjYuMzA2NTYtMTk2LjMzMTUyeiBtMjYuMjk2MzIgMzMyLjM1OTY4TDY5My40NzMyOCA3MDYuNzY0OGMtNDEuMjQ2NzIgMzguMjI1OTItOTQuMzkyMzIgNjMuNTgwMTYtMTUzLjA0NzA0IDY5LjU5MTA0bDI2LjI5NjMyLTE5Ni4zMzE1MnogbTE1LjQ0MTkyLTEzLjUyNzA0bDE5NS4yNDYwOC0yNi4xNTI5NmMtNi4yMDU0NCA1OC4yMjQ2NC0zMS40Nzc3NiAxMTAuOTYwNjQtNjkuNDY4MTYgMTUxLjk0MTEyTDU4Mi4xNjQ0OCA1NjYuNDk3Mjh6IG0tMC4xNjM4NC0xMDguODIwNDhsMTI1Ljk0MTc2LTEyNS45NDE3NmMzOC4wMjExMiA0MS4wMjE0NCA2My4zMDM2OCA5My44MDg2NCA2OS40ODg2NCAxNTIuMDg0NDhsLTE5NS40MzA0LTI2LjE0MjcyeiBtLTcwLjEyMzUyLTI2Ni45MTU4NGwwLjI1Ni0wLjAxMDI0IDMyLjkxMTM2IDI0NS42NzgwOGE4MS41NDExMiA4MS41NDExMiAwIDAgMC02Ni4xOTEzNiAxLjE5ODA4bDMzLjAyNC0yNDYuODY1OTJ6IG0tMjAuNzY2NzIgMC44MDg5NmwtNC43MjA2NCAzNS4yODcwNGMtMTM2LjE0MDggMTIuNjk3Ni0yNDYuMjUxNTIgMTIzLjE1NjQ4LTI1OC40NDczNiAyNTkuMzk5NjhsLTM1LjI3NjggNC43MzA4OGMxMC40MDM4NC0xNjAuMDcxNjggMTM4LjUwNjI0LTI4OC40OTE1MiAyOTguNDQ0OC0yOTkuNDE3NnpNMTkxLjg5NzYgNTEyLjAyMDQ4bDAuMDEwMjQtMC4yNjYyNCAyNDYuNDI1Ni0zMy4wNjQ5NmE4MS40MDggODEuNDA4IDAgMCAwLTcuMTQ3NTIgMzMuMzIwOTYgODEuNDA4IDgxLjQwOCAwIDAgMCA3LjE2OCAzMy4zNjE5MmwtMjQ2LjQ0NjA4LTMzLjAyNC0wLjAxMDI0LTAuMzI3Njh6IG0wLjc2OCAyMS4wOTQ0bDM1LjMzODI0IDQuNzMwODhDMjQwLjM1MzI4IDY3Ni4wMzQ1NiAzNDguMjYyNCA3ODQuMjYxMTIgNDg2LjMyODMyIDc5Ny4wODE2bDQuNzUxMzYgMzUuMzg5NDRjLTE1OS44OTc2LTEwLjkzNjMyLTI4Ny45Nzk1Mi0xMzkuMzE1Mi0yOTguNDE0MDgtMjk5LjM1NjE2eiBtMzE5LjQ1NzI4IDMwMC4xNzUzNmwtMC4yNzY0OC0wLjAxMDI0LTMzLjEzNjY0LTI0Ni45NjgzMmE4MS4zNDY1NiA4MS4zNDY1NiAwIDAgMCA2Ni4zMzQ3MiAxLjI1OTUybC0zMi45MjE2IDI0NS43MTkwNHogbTIwLjc1NjQ4LTAuNjM0ODhsNC43MzA4OC0zNS4yNzY4YzEzNy41OTQ4OC0xMS42NTMxMiAyNDguNjU3OTItMTIyLjM2OCAyNjAuODUzNzYtMjU5Ljg1MDI0bDM1LjI4NzA0LTQuNzMwODhjLTEwLjM0MjQgMTYwLjk5MzI4LTEzOS43MzUwNCAyOTAuMDU4MjQtMzAwLjg3MTY4IDI5OS44NTc5MnogbTU1LjMyNjcyLTI4Ny42MzEzNmE4MS41NDExMiA4MS41NDExMiAwIDAgMCAwLjA5MjE2LTY1Ljg0MzJsMjQ1Ljg4Mjg4IDMyLjg5MDg4LTI0NS45NzUwNCAzMi45NTIzMnoiIHAtaWQ9IjY2ODciPjwvcGF0aD48L3N2Zz4=',
        }),
      },
      //是否显示罗盘
      showCompass: true,
      //测量点样式
      pointStyle: {
        pixelSize: 10,
      },

      //测量完毕后提示框的回调函数，可以覆盖提示内容
      labelCallBack: function (angle, label) {
        label.text = '方位角为：' + angle.toFixed(2).toString();
      },
    };
  } else {
    options = {};
  }
  return options;
}

export { measureToolsConfig };
