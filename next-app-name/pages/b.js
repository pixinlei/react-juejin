import Link from 'next/link'

function text() {
  return (
    <div>
      我是b页面
      <button><Link href="/">返回首页</Link></button>
    </div>
  )
}

export default text