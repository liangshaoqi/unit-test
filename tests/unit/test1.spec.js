import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Test1 from '@/components/Test1.vue'

describe('Test1', () => {
  // 现在挂载组件,你便得到了这个包裹器
  const wrapper = mount(Test1)
  // it('渲染标记判断', () => {
  //   expect(wrapper.html()).toContain('<div class="one"></div>')
  // })

  // it('has button', () => {
  //   expect(wrapper.contains('button')).to.eventually.equal(true)
  // })
  it ('按钮点击数字增加', () => {
    expect(wrapper.vm.count).to.equal(0)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.count).to.equal(1)
  })
})