import React from 'react'
import App from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import "../app/globals.css"

class MyApp extends App {
  
  render() {
    const { Component, pageProps } = this.props
    return <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  }
}

export default MyApp
