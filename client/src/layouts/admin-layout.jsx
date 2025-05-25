import React from 'react'

function AdminLayout( {children} ) {
  return (
    <div>
        <header>
            <h1>Admin Layout Header</h1>
        </header>
        <main>
            {children}
        </main>
        <footer>
            <p>Admin Layout Footer</p>
        </footer>
    </div>
  )
}

export default AdminLayout