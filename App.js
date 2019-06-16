/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native'


export type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super()
    this.state = {
      // 計算式
      calculationText: '',
      // 計算結果
      resultText: '',
    }
    // 四則演算
    this.operations = ['+', '-', '*', '/']
  }

  isValid() {
    const lastCharacter = this.state.calculationText.split('').pop()
    return !(this.operations.includes(lastCharacter) || this.state.calculationText.length === 0)
  }

  // 数字押下
  onPressDigit(text) {
    if (text === '=') {
      // 計算実行
      if (this.isValid()) {
        this.setState({
          // eslint-disable-next-line no-eval
          resultText: Number(eval(this.state.calculationText)).toLocaleString(),
        })
      }
    } else {
      // 数字を計算式に追加
      this.setState({
        calculationText: this.state.calculationText + text,
      })
    }
  }

  // 四則演算ボタン押下
  operate(operation) {
    if (this.isValid()) {
      this.setState({
        calculationText: this.state.calculationText + operation,
      })
    }
  }

  // DELボタン押下
  backSpace() {
    const text = this.state.calculationText.split('')
    text.pop()
    this.setState({
      calculationText: text.join(''),
      resultText: '',
    })
  }

  render() {
    // 数字ボタン
    const digit = []
    const nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0, '.', '=']]
    for (let i = 0; i < 4; i += 1) {
      const row = []
      for (let j = 0; j < 3; j += 1) {
        row.push(
          <TouchableOpacity key={nums[i][j]} onPress={() => this.onPressDigit(nums[i][j])} style={styles.button}>
            <Text style={styles.buttonText}>{nums[i][j]}</Text>
          </TouchableOpacity>,
        )
      }
      digit.push(<View key={i} style={styles.row}>{row}</View>)
    }

    // 四則演算ボタン
    const operation = this.operations
      .map((o) => {
        return (
          <TouchableOpacity key={o} onPress={() => this.operate(o)} style={[styles.button, styles.operationButton]}>
            <Text style={styles.buttonText}>{o}</Text>
          </TouchableOpacity>)
      })

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <View style={styles.calculationView}>
            <Text style={styles.calculationText}>{this.state.calculationText}</Text>
          </View>
          <TouchableOpacity onPress={() => this.backSpace()} style={[styles.backSpaceView]}>
            <Text style={styles.backSpaceText}>DEL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {digit}
          </View>
          <View style={styles.operations}>
            {operation}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 2,
    backgroundColor: '#060606',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  calculation: {
    flex: 1,
    backgroundColor: '#D2691E',
    flexDirection: 'row',
  },
  calculationView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  calculationText: {
    fontSize: 24,
    color: 'white',
  },
  backSpaceView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  backSpaceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#434343',
  },
  buttonText: {
    fontSize: 36,
    color: 'white',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#939393',
  },
  operations: {
    flex: 1,
    backgroundColor: '#939393',
    justifyContent: 'space-around',
  },
  operationButton: {
    backgroundColor: '#636363',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 50,
    color: 'white',
  },
})
