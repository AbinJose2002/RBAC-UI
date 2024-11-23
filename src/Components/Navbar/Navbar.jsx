import './Navbar.css'

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Admin Dashboard</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Project
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Project 1</a></li>
                                <li><a class="dropdown-item" href="#">Project 2</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li>
                                    <a className="dropdown-item">View All Project</a>
                                    <a className="dropdown-item">New Project</a>
                                    {/* <a class="dropdown-item" href="#"> New project +</a> */}
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <button class="btn btn-outline-success" type="submit" onClick={()=>{alert('Logged Out. Token Cleared')}}>Log Out</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
