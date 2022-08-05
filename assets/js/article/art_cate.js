// 获取 表格数据
const initArtCateList = () => {
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: (res) => {
      // console.log(res)
      const { status, message, data } = res
      if (status !== 0) return layer.msg(message)
      // 调用 template
      const htmlStr = template('tpl-table', data)
      $('#tb').empty().html(htmlStr)
    },
  })
}

initArtCateList()
$('#addCateBtn').click(function () {
  // console.log(1)
  layerAdd = layer.open({
    type: 1,
    area: ['500px', '250px'],
    title: '添加文章分类',
    content: $('#dialog-add').html(),
  })
})
const form = layui.form
let layerAdd = null
$('body').on('submit', '#form-add', function (e) {
  e.preventDefault()
  // console.log(1)
  $.ajax({
    type: 'POST',
    url: '/my/article/addcates',
    data: form.val('formAdd'),
    success: (res) => {
      // console.log(res)
      const { status, message } = res
      layer.msg(message)
      if (status !== 0) return
      initArtCateList()
      layer.close(layerAdd)
    },
  })
})

let layerEdit = null
// 编辑按钮动态添加 利用事件委托
$('#tb').on('click', '.btn-edit', function () {
  // console.log(1)
  layerEdit = layer.open({
    type: 1,
    area: ['500px', '250px'],
    title: '添加文章分类',
    content: $('#dialog-edit').html(),
  })
  let id = $(this).attr('data-id')
  // console.log(id)
  $.ajax({
    type: 'GET',
    url: '/my/article/cates/' + id,
    success: (res) => {
      // console.log(res)
      const { status, message, data } = res
      if (status !== 0) return layer.msg(message)
      form.val('formEdit', data)
    },
  })
})

$('body').on('submit', '#form-edit', function (e) {
  e.preventDefault()
  // console.log(1)
  $.ajax({
    type: 'POST',
    url: '/my/article/updatecate',
    data: form.val('formEdit'),
    success: (res) => {
      // console.log(res)
      const { status, message } = res
      layer.msg(message)
      if (status !== 0) return
      initArtCateList()
      layer.close(layerEdit)
    },
  })
})

$('#tb').on('click', '.btn-delete', function () {
  // console.log(1)
  let id = $(this).attr('data-id')
  layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
    $.ajax({
      type: 'GET',
      url: '/my/article/deletecate/' + id,
      success: (res) => {
        // console.log(res)
        const { status, message } = res
        layer.msg(message)
        if (status !== 0) return
        initArtCateList()
      },
    })
    layer.close(index)
  })
  // console.log(id)
})
