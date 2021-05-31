export function TopHeader() {
    return <div className="top" >
      <h1>
        ExploreUW
      </h1>
      <h2>UW College of Environment</h2>
      </div>
  }

  export function PurpleBlock(props) {
    return <div className="purple-block" aria-label="a purple rectangular block">
      <h3>{props.name}</h3>
    </div>;
  }

  export function MainNav() {
    return <div className="main-nav" role="navigation"><a href="resources.html">Additional resources</a></div>;
  }

  export function SideNav() {
    return <nav>
          <div className="sidenav" role="navigation">
              <a href="#Overview">Overview</a>
              <Link to="/">Return to Home Page</Link>
            </div>
      </nav>;
  }

  export function Overview(props) {
    let content;
    props.content.forEach((major) => {
      if (major.majorName === props.name) {
        content = major;
      }
    })
    return <section>
      <h4 id="Overview">Overview</h4>
      <p>{content.overview}</p>
    </section>
  }