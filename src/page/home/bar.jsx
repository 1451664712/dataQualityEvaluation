import React, {Component} from 'react'
import {
    // G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    // Coord,
    // Label,
    // Legend,
    // View,
    // Guide,
    // Shape,
    // Facet,
    // Util
} from "bizcharts";

export default class Bar extends Component {
    render() {
        const cols = {
            sales: {
                tickInterval: 10
            }
        };
        const label = {
            formatter(text, item, index) {
                let arr = text.split(' ');
                return `${arr[0]}\n${arr[1]}`;
            },
            textStyle: {
                textAlign: 'center', // 文本对齐方向，可取值为： start center end
                fill: '#404040', // 文本的颜色
                fontSize: '12', // 文本大小
                //fontWeight: 'bold', // 文本粗细
                textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
            }
        }
        const {data} = this.props
        return (
            <Chart height={600} data={data} cols={cols} forceFit>
                <Axis name="source_name" label={label}/>
                <Tooltip
                    // 用于设置 tooltip 的辅助线或者辅助框。
                    crosshairs={{
                        //rect: 矩形框,x: 水平辅助线,y: 垂直辅助线,cross: 十字辅助线。
                        type: 'rect' //'rect' || 'x' || 'y' || 'cross',
                    }}
                />
                <Geom type="interval" size={data.length <= 10 ? 60 : 40} position="source_name*score_database"/>
            </Chart>
        )
    }
}