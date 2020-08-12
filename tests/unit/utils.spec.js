import { expect } from 'chai'
import { objectHasValueIsEmpty, deepClone } from '@/utils/index.js'

describe ('测试工具类方法', () => {
  it ('测试对象中的value值是否有空值', () => {
    const obj = {
      a: 'aaaa',
      b: undefined,
      c: ''
    }
    // expect(objectHasValueIsEmpty(obj)).to.be.false
    // expect(objectHasValueIsEmpty(obj)).to.be.ok
    expect(objectHasValueIsEmpty(obj)).to.be.true
  })
  it ('深度克隆验证', () => {
    let obj = {
      a: 'sidughspo',
      b: 'gkusd'
    }
    let newObj = deepClone(obj)
    let equal = newObj === obj ? true : false
    expect(equal).to.be.false
  })
})