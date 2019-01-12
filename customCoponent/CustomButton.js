import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    

} from 'react-native';
import PropTypes from 'prop-types';
 
//模块声名并导出
export default class CustomButton extends Component {
    //属性声名
    static propTypes = {
        
        underlayColor:PropTypes.string, // 点击的时候按钮背景颜色
        underlayTxtColor:PropTypes.string, // 点击的时候文字颜色
        onPress: PropTypes.func, // 点击事件
        onPressOut: PropTypes.func, // 结束点击的时候触发事件
        onLongPress: PropTypes.func, // 长按事件
        imageView: PropTypes.element, // 图片
        txtStyle:PropTypes.any, // 文字颜色

    };

    //默认属性
    static defaultProps = {
        underlayColor: '#00000000',
        underlayTxtColor: '#00000088',
        txtStyle: { color: '#000000' },
        imageView: null,
        disabled: false
    }
    //构造函数
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = { //状态机变量声明
            showButtonTxt: true,
            onShowUnderlay: false
        }
    }

    onShowUnderlay = () => {
        // alert('_onShowUnderlay');
        this.setState({ onShowUnderlay: true });
    }

    onHideUnderlay = () => {
        // alert('_onHideUnderlay');
        this.setState({ onShowUnderlay: false });
    }

    //渲染
    render() {
        return (
            <TouchableHighlight
                onShowUnderlay={this.onShowUnderlay}
                onHideUnderlay={this.onHideUnderlay}
                underlayColor={this.props.underlayColor}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                onPressOut={this.props.onPressOut}
                style={[styles.button, this.props.style]}
                disabled={this.props.disabled}
            >
                {this.state.showButtonTxt
                    //样式继承,带条件样式
                    ? <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center',paddingLeft:5,paddingRight:5 }}>
                        {this.props.imageView ? <View style={{ marginRight: 5 }}>{this.props.imageView}</View> : null}
                        <Text
                            style={[styles.txt, this.props.txtStyle, this.state.onShowUnderlay && {color: this.props.underlayTxtColor}]}>
                            {//显示成员变量
                                this.props.children}
                        </Text>
                    </View>
                    : null}

            </TouchableHighlight>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    txt: {
        textAlign: 'center',
    }
})
 