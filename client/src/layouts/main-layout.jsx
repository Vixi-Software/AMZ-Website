import React from 'react'
import Header from '../components/features/Header'

function MainLayout( {children} ) {
  return (
    <div>
        <Header />
        <main>
            {children}
        </main>
        <footer>
            <p>Main Layout Footer</p>
        </footer>
    </div>
  )
}

export default MainLayout