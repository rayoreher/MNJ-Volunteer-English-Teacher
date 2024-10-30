const Hero = () => {
    return (
		<div className="fh5co-hero">
			<div className="fh5co-overlay"></div>
			<div className="fh5co-cover text-center" data-stellar-background-ratio="0.5" 
			style={{ 
				backgroundImage: 'url(/MNJ-Volunteer-English-Teacher/images/cover_bg_1.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center' }}>
				<div className="desc animate-box">
					<h2><strong>MNJ Volunteer English Teacher</strong></h2>
					<span><a className="btn btn-primary btn-lg" href="#">Volunteer Now</a></span>
				</div>
			</div>

		</div>
    );
  };
  
  export default Hero;