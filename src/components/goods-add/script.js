import {getToken} from '@/assets/js/auth'
// 加载公共组件
import CategoryCascader from '@/common/category-cascader'
export default {
  created () {},
  data () {
    return {
      active: 0,
      prodForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        is_promote: false,
        goods_introduce: '',
        pics: []
      },
      stepActive: 0,
      manyParams: [],
      onlyParams: [],
      uploadImgHeader: {
        Authorization: getToken()
      },
      editorOption: {

      } // 富文本编辑器的配置选项
    }
  },
  methods: {
    // 级联选择器改变事件
    handleCascadeChange (val) {
      // console.log(val)
      this.prodForm.goods_cat = val.join(',')
    },
    // 添加商品基本信息事件
    async handleAddProd () {
      // console.log(this.prodForm)
      this.prodForm.attrs = [...this.manyParams, ...this.onlyParams]
      this.prodForm.pics = this.pics
      const res = await this.$http.post(`/goods`, this.prodForm)
      const {data, meta} = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加商品成功'
        })
      }
    },
    handleNext () {
      console.log(1)
    },
    // 点击标签处理事件函数
    handleTabClick (tab, event) {
      // console.log(tab, event)
      this.stepActive = Number(tab.index)
      if (tab.label === "商品参数") {
        this.loadManyParma()
      } else if (tab.label === "商品属性") {
        this.loadOnlyParams()
      }
    },
    // 处理动态参数
    async loadManyParma () {
      // console.log(this.prodForm.goods_cat)
      const cateId = this.prodForm.goods_cat.split(',')[2]
      const res = await this.$http.get(`/categories/${cateId}/attributes`,{
        params: {
          sel: 'many'
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        // console.log(data)
        this.manyParams = data
        data.forEach(item => {
          // 将attr_vals 字符串转为以逗号分隔的数组
          item.attr_vals = item.attr_vals.split(',')
        })
      }
    },
    // 处理静态属性
    async loadOnlyParams () {
      const cateId = this.prodForm.goods_cat.split(',')[2]
      const res = await this.$http.get(`/categories/${cateId}/attributes`,{
        params: {
          sel: 'only'
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        // console.log(data)
        this.onlyParams = data
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (res, file, fileList) {
      // console.log(response, file, fileList)
      this.prodForm.pics.push({
        pic: res.data.tmp_path
      })
    },
    onEditorBlur(val) {
      // console.log(val)
      this.prodForm.goods_introduce = val.container.innerText
    }
  },
  components: {
    CategoryCascader
  }
}
