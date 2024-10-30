const Menu = () => {
    return (
		<header id="fh5co-header-section" className="sticky-banner">
			<div className="container">
				<div className="nav-header">
					<a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle dark"><i></i></a>
					<h1 id="fh5co-logo">Charity</h1>
					<nav id="fh5co-menu-wrap" role="navigation">
						<ul className="sf-menu" id="fh5co-primary-menu">
							<li className="active">
								<a href="index.html">Home</a>
							</li>
							<li>
								<a href="#" className="fh5co-sub-ddown">Get Involved</a>
								<ul className="fh5co-sub-menu">
									<li><a href="#">Donate</a></li>
									<li><a href="#">Volunteer</a></li>
								</ul>
							</li>
							<li>
								<a href="#" className="fh5co-sub-ddown">Projects</a>
								 <ul className="fh5co-sub-menu">
								 	<li><a href="#">Project 1</a></li>
								 	<li><a href="#">Project 2</a></li>
								 	<li><a href="#">Project 3</a></li>
								</ul>
							</li>
							<li><a href="about.html">About</a></li>
							<li><a href="blog.html">Blog</a></li>
							<li><a href="contact.html">Contact</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
    );
  };
  
  export default Menu;