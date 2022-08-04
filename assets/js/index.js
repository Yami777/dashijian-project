const getUserInfo = () => {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    data: null,
    success: (res) => {
      // console.log(res)
      const { status, message } = res
      // 如果退出程序 ，请求数据失败，name弹出提示，调用complete函数
      if (status != 0) return layer.msg(message)
      renderAvatar(res.data)
    },
  })
}
const renderAvatar = (data) => {
  let name = data.nickname || data.username
  // 设置欢迎文本
  $('#welcome').html('欢迎' + name)
  if (data.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide()
    let firstName = name[0].toUpperCase()
    $('.text-avatar').html(firstName)
  }
}
getUserInfo()
$('#exitBtn').on('click', function () {
  layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
    //do something
    location.href = '/login.html'
    localStorage.removeItem('token')
    layer.close(index)
  })
})
