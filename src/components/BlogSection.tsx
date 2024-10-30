import Image from "next/image";

const BlogSection = () => {
    return (
		<div id="fh5co-blog-section" className="fh5co-section-gray">
			<div className="container">
				<div className="row">
					<div className="col-md-8 col-md-offset-2 text-center heading-section animate-box">
						<h3>Recent From Blog</h3>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row row-bottom-padded-md">
					<div className="col-lg-4 col-md-4 col-sm-6">
						<div className="fh5co-blog animate-box">
							<a href="#"><Image className="img-responsive" src="/MNJ-Volunteer-English-Teacher/images/cover_bg_1.jpg" alt="" layout="fill" objectFit="cover"/></a>
							<div className="blog-text">
								<div className="prod-title">
									<h3><a href="">Medical Mission in Southern Kenya</a></h3>
									<span className="posted_by">Sep. 15th</span>
									<span className="comment"><a href="">21<i className="icon-bubble2"></i></a></span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<p><a href="#">Learn More...</a></p>
								</div>
							</div> 
						</div>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-6">
						<div className="fh5co-blog animate-box">
							<a href="#"><Image className="img-responsive" src="/MNJ-Volunteer-English-Teacher/images/cover_bg_2.jpg" alt="" layout="fill" objectFit="cover"/></a>
							<div className="blog-text">
								<div className="prod-title">
									<h3><a href="">Medical Mission in Southern Kenya</a></h3>
									<span className="posted_by">Sep. 15th</span>
									<span className="comment"><a href="">21<i className="icon-bubble2"></i></a></span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<p><a href="#">Learn More...</a></p>
								</div>
							</div> 
						</div>
					</div>
					<div className="clearfix visible-sm-block"></div>
					<div className="col-lg-4 col-md-4 col-sm-6">
						<div className="fh5co-blog animate-box">
							<a href="#"><Image className="img-responsive" src="/MNJ-Volunteer-English-Teacher/images/cover_bg_3.0.jpg" alt="" layout="fill" objectFit="cover"/></a>
							<div className="blog-text">
								<div className="prod-title">
									<h3><a href="">Medical Mission in Southern Kenya</a></h3>
									<span className="posted_by">Sep. 15th</span>
									<span className="comment"><a href="">21<i className="icon-bubble2"></i></a></span>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
									<p><a href="#">Learn More...</a></p>
								</div>
							</div> 
						</div>
					</div>
					<div className="clearfix visible-md-block"></div>
				</div>

				<div className="row">
					<div className="col-md-4 col-md-offset-4 text-center animate-box">
						<a href="#" className="btn btn-primary btn-lg">Our Blog</a>
					</div>
				</div>

			</div>
		</div>
    );
  };
  
  export default BlogSection;