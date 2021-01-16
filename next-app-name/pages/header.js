import Head from 'next/head'

function Header() {
  return (
    <div>
      <Head>
      <title>这里是head页面</title>
      <meta charSet='utf-8'/>
      </Head>
      这是改变title的head页面
    </div>
  )
}

export default Header