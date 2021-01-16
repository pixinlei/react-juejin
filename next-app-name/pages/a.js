import Link from 'next/link'
import Router from 'next/router'

function text() {
  return (
    <div>
      我是a页面
      <button><Link href="/">返回首页</Link></button>
      <div>
        <button onClick={() => {Router.push('/b')}}>跳转到b页面</button>
      </div>
    </div>
  )
}

export default text