import React from 'react'
import Link from 'next/link'
import { Router } from 'next/router'

function Index() {
  Router.events.on('routeChangeStart', (...args)  => {
    console.log('1.routeChangeStart--路由开始变化了', 'query传递的参数：', ...args);
  })
  Router.events.on('routeChangeComplete', (...args)  => {
    console.log('2.routeChangeComplete--路由变化结束', 'query传递的参数：', ...args);
  })
  Router.events.on('beforeHistoryChange', (...args)  => {
    console.log('3.beforeHistoryChange--路由变化结束', 'query传递的参数：', ...args);
  })
  Router.events.on('routeChangeError', (...args)  => {
    console.log('4.routeChangeError--路由发生错误', 'query传递的参数：', ...args);
  })
  Router.events.on('hashChangeStart', (...args)  => {
    console.log('5.hashChangeStart--路由发生错误', 'query传递的参数：', ...args);
  })
  Router.events.on('hashChangeComplete', (...args)  => {
    console.log('6.hashChangeComplete--路由发生错误', 'query传递的参数：', ...args);
  })
  return (
    <div>
      我是首页
      <button><Link href="/a">去a页面</Link></button>
      <button><Link href="/b">去b页面</Link></button>
    </div>
  )
}

export default Index