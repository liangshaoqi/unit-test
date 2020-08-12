import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Test1 from '@/components/Test1.vue'

describe('Test1', () => {
  // 现在挂载组件,得到这个包裹器
  const wrapper = mount(Test1)
  it('渲染标记判断', () => {
    expect(wrapper.html()).to.include('<div class="one"><button>按钮</button></div>')
  })
  it ('按钮点击数字增加', () => {
    const button = wrapper.find('button')
    button.trigger('click').then(() => {
      expect(wrapper.vm.count).to.equal(1)
    })
  })
  it ('异步按钮点击数字增加', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.vm.count).to.equal(2) // 这里是2的原因是上面的测试已经增加1了,再加1就等于
  })
})